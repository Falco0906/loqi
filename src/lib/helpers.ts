/**
 * Format the onboarding message for the Telegram bot.
 */
export function formatOnboardingMessage(sell: string, reach: string): string {
  return `Hi, I sell ${sell.trim()}. I want to target ${reach.trim()}.`;
}

/**
 * Build the Telegram deep-link URL with an encoded start parameter.
 */
export function buildTelegramUrl(message: string): string {
  const botUsername =
    process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME ?? "YOUR_BOT_USERNAME";
  const encoded = encodeURIComponent(message);
  return `https://t.me/${botUsername}?start=${encoded}`;
}
