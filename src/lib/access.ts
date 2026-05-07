export const ACCESS_STORAGE_KEY = "loqi_access_granted";
export const ACCESS_CODE_STORAGE_KEY = "loqi_access_code";

export function buildTelegramUrl(startParam = "approved-access"): string {
  const botUsername =
    process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME ?? "YOUR_BOT_USERNAME";

  return `https://t.me/${botUsername}?start=${encodeURIComponent(startParam)}`;
}
