export const lanes = [
  { who: "You", title: "Define the target", body: "Describe who you want to sell to, in your own words." },
  { who: "Loqi", title: "Researches and qualifies", body: "Finds companies, checks the fit and gathers signals." },
  { who: "You", title: "Review", body: "Look at the shortlist and the reasons behind it." },
  { who: "Loqi", title: "Prepares outreach", body: "Writes a first message for each prospect." },
  { who: "You", title: "Approve", body: "Approve, edit or reject every message before it goes anywhere." },
] as const;
export const principles = [
  ["Context before volume", "Understand the company, the person, and the reason to reach out. A longer list isn’t the goal."],
  ["A reason for every line", "Review the information behind a draft. Loqi works from the company, role, and context available to it."],
  ["Your approval, always", "Review, edit, or reject. You decide what gets sent. Nothing goes out on its own."],
] as const;
export const faq = [
  ["Does Loqi send emails on its own?", "No. In the beta, every message waits for your approval. You can approve, edit or reject each draft."],
  ["Is the data on this page real?", "No. The companies, people and numbers on this page are sample data that show how a Loqi workflow looks. They are not customer results."],
  ["What does Loqi cost?", "Founding customers receive preferential pricing. Public pricing will return when Loqi is ready for self-serve paid use."],
  ["Who is Loqi for?", "Teams that sell to other businesses and spend too much of the week finding, checking and writing to prospects."],
] as const;
export const oldStack = ["Apollo", "LinkedIn", "ChatGPT", "Google Sheets", "CRM", "Email tool", "Another spreadsheet"];
export const loqiStack = ["Define the target", "Discover & understand", "Find the right person", "Write & review"];
