export const ACCESS_STORAGE_KEY = "loqi_access_granted";
export const ACCESS_CODE_STORAGE_KEY = "loqi_access_code";

export function getTelegramBotUsername(): string {
  const rawUsername =
    process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME ?? "LoqiChatBot";

  return rawUsername.replace(/^@+/, "").trim() || "LoqiChatBot";
}

export function buildTelegramUrl(startParam = "approved-access"): string {
  const botUsername = getTelegramBotUsername();

  return `https://t.me/${botUsername}?start=${encodeURIComponent(startParam)}`;
}
