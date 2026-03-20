"use client";

import { useState, useEffect } from "react";
import ConsentModal from "../ui/ConsentModal";

const BOT_USERNAME = "LoqiChatBot";

export default function OnboardingForm() {
  const [sell, setSell] = useState("");
  const [reach, setReach] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState<{ sell?: string; reach?: string }>({});

  // Restore from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("loqi_onboarding");
      if (saved) {
        const data = JSON.parse(saved);
        if (data.sell) setSell(data.sell);
        if (data.reach) setReach(data.reach);
      }
    } catch {
      // ignore
    }
  }, []);

  const validate = (): boolean => {
    const newErrors: { sell?: string; reach?: string } = {};

    if (!sell.trim()) {
      newErrors.sell = "Tell us a bit about what you offer";
    } else if (sell.trim().length < 3) {
      newErrors.sell = "Could you add a little more detail?";
    }

    if (!reach.trim()) {
      newErrors.reach = "Let us know who you'd like to reach";
    } else if (reach.trim().length < 3) {
      newErrors.reach = "Could you add a little more detail?";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isReady = sell.trim().length >= 3 && reach.trim().length >= 3;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    // Check consent state
    const consentGiven = localStorage.getItem("loqi_consent_given");
    if (consentGiven === "true") {
      executeRedirect();
    } else {
      setIsModalOpen(true);
    }
  };

  const executeRedirect = async () => {
    setLoading(true);

    // Store in localStorage
    try {
      localStorage.setItem(
        "loqi_onboarding",
        JSON.stringify({ sell: sell.trim(), reach: reach.trim(), ts: Date.now() })
      );
      localStorage.setItem("loqi_consent_given", "true");
    } catch {
      // ignore
    }

    // Brief pause so the loading state feels intentional
    await new Promise((res) => setTimeout(res, 800));

    // Build the Telegram deep-link
    const message = `Hi, I sell ${sell.trim()}. I want to target ${reach.trim()}.`;
    const encoded = encodeURIComponent(message);
    const url = `https://t.me/${BOT_USERNAME}?start=${encoded}`;

    window.open(url, "_blank", "noopener");
    setLoading(false);
  };

  // Clear field-level error on typing
  const handleSellChange = (val: string) => {
    setSell(val);
    if (errors.sell) setErrors((prev) => ({ ...prev, sell: undefined }));
  };

  const handleReachChange = (val: string) => {
    setReach(val);
    if (errors.reach) setErrors((prev) => ({ ...prev, reach: undefined }));
  };

  return (
    <section id="start" className="relative py-32 px-6">
      <div className="max-w-xl mx-auto">
        {/* Header — conversational, not form-like */}
        <div className="text-center mb-14 animate-on-scroll">
          <h2 className="text-display-sm font-semibold text-white">
            Let&apos;s get you your first leads
          </h2>
          <p className="text-body-lg text-slate-400 mt-5 leading-relaxed">
            Takes less than 30 seconds. Just tell us a little about what you do.
          </p>
        </div>

        <div className="animate-on-scroll">
          <form onSubmit={handleSubmit} className="space-y-7">
            {/* Field 1 */}
            <div>
              <label
                htmlFor="sell"
                className="block text-[15px] text-slate-300 mb-3 font-medium"
              >
                What do you sell?
              </label>
              <input
                id="sell"
                type="text"
                value={sell}
                onChange={(e) => handleSellChange(e.target.value)}
                placeholder="e.g. A design tool for product teams"
                className={`w-full bg-[#1e2028] border rounded-2xl px-6 py-[18px] text-[16px] text-white placeholder:text-slate-600 outline-none transition-all duration-300 ${
                  errors.sell
                    ? "border-red-500/40 focus:border-red-500/60"
                    : "border-slate-800/30 focus:border-slate-600/60 focus:bg-[#222430]"
                }`}
              />
              {errors.sell && (
                <p className="text-sm text-red-400/80 mt-2 pl-1">{errors.sell}</p>
              )}
            </div>

            {/* Field 2 */}
            <div>
              <label
                htmlFor="reach"
                className="block text-[15px] text-slate-300 mb-3 font-medium"
              >
                Who do you want to reach?
              </label>
              <input
                id="reach"
                type="text"
                value={reach}
                onChange={(e) => handleReachChange(e.target.value)}
                placeholder="e.g. Startup founders in the US, Series A–B"
                className={`w-full bg-[#1e2028] border rounded-2xl px-6 py-[18px] text-[16px] text-white placeholder:text-slate-600 outline-none transition-all duration-300 ${
                  errors.reach
                    ? "border-red-500/40 focus:border-red-500/60"
                    : "border-slate-800/30 focus:border-slate-600/60 focus:bg-[#222430]"
                }`}
              />
              {errors.reach && (
                <p className="text-sm text-red-400/80 mt-2 pl-1">{errors.reach}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-2xl font-medium text-[15px] transition-all duration-300 mt-3 flex items-center justify-center gap-2.5 disabled:opacity-60 disabled:cursor-not-allowed ${
                isReady 
                  ? "bg-accent text-white shadow-lg shadow-accent/20 hover:bg-accent-dark hover:-translate-y-0.5" 
                  : "bg-[#2a2d38] text-white/80 hover:bg-[#32353f] hover:text-white"
              }`}
            >
              {loading ? (
                <>
                  <svg
                    className="w-4 h-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="3"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Opening Telegram…
                </>
              ) : (
                <>
                  Continue in Telegram
                  <svg
                    className="w-4 h-4 opacity-50"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </>
              )}
            </button>

            {/* Microcopy */}
            <p className="text-[13px] text-slate-600 text-center leading-relaxed">
              You stay in control — nothing sends without your approval.
            </p>
          </form>
        </div>
      </div>

      <ConsentModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAccept={() => {
          setIsModalOpen(false);
          executeRedirect();
        }}
      />
    </section>
  );
}
