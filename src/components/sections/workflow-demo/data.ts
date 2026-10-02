// Fictional demonstration records transcribed from the V3 reference.
export const sampleStats = { found: 184, qualified: 47, contacts: 91 } as const;
export const demo = {
  "stages": [
    "Brief",
    "Find",
    "Qualify",
    "Research",
    "Contact",
    "Draft",
    "Approve"
  ],
  "accounts": [
    {
      "name": "Northstar AI",
      "city": "San Francisco, CA",
      "region": "US",
      "stage": "Series A",
      "emp": 86,
      "hiring": true,
      "raised": 3,
      "match": 94
    },
    {
      "name": "Kestrel Data",
      "city": "Austin, TX",
      "region": "US",
      "stage": "Series A",
      "emp": 112,
      "hiring": true,
      "raised": 3,
      "match": 91
    },
    {
      "name": "Halden Labs",
      "city": "Boston, MA",
      "region": "US",
      "stage": "Series A",
      "emp": 61,
      "hiring": true,
      "raised": 5,
      "match": 89
    },
    {
      "name": "Fieldwork",
      "city": "Denver, CO",
      "region": "US",
      "stage": "Series B",
      "emp": 168,
      "hiring": true,
      "raised": 4,
      "match": 87
    },
    {
      "name": "Brightwave",
      "city": "New York, NY",
      "region": "US",
      "stage": "Series A",
      "emp": 73,
      "hiring": true,
      "raised": 3,
      "match": 84
    },
    {
      "name": "Ostrava Systems",
      "city": "Prague, CZ",
      "region": "Europe",
      "stage": "Series A",
      "emp": 95,
      "hiring": true,
      "raised": 6,
      "match": 82
    },
    {
      "name": "Pinecrest",
      "city": "Portland, OR",
      "region": "US",
      "stage": "Series A",
      "emp": 22,
      "hiring": true,
      "raised": 4,
      "match": 76
    },
    {
      "name": "Lattice Freight",
      "city": "Chicago, IL",
      "region": "US",
      "stage": "Series B",
      "emp": 410,
      "hiring": true,
      "raised": 9,
      "match": 79
    },
    {
      "name": "Mosaic Health",
      "city": "Boston, MA",
      "region": "US",
      "stage": "Seed",
      "emp": 95,
      "hiring": true,
      "raised": 5,
      "match": 74
    },
    {
      "name": "Quill Analytics",
      "city": "Seattle, WA",
      "region": "US",
      "stage": "Series A",
      "emp": 140,
      "hiring": false,
      "raised": 6,
      "match": 78
    },
    {
      "name": "Tidewater",
      "city": "Miami, FL",
      "region": "US",
      "stage": "Series A",
      "emp": 88,
      "hiring": true,
      "raised": 26,
      "match": 81
    },
    {
      "name": "Ironleaf",
      "city": "Toronto, ON",
      "region": "Canada",
      "stage": "Series A",
      "emp": 120,
      "hiring": true,
      "raised": 7,
      "match": 80
    },
    {
      "name": "Sable Robotics",
      "city": "Pittsburgh, PA",
      "region": "US",
      "stage": "Series A",
      "emp": 64,
      "hiring": true,
      "raised": 5,
      "match": 83,
      "thin": true
    },
    {
      "name": "Copperline",
      "city": "Denver, CO",
      "region": "US",
      "stage": "Series A",
      "emp": 190,
      "hiring": true,
      "raised": 7,
      "match": 61
    }
  ],
  "details": [
    {
      "signals": [
        [
          "Raised $12M three months ago",
          "Funding announcement"
        ],
        [
          "Hiring 8 sales roles",
          "Careers page"
        ],
        [
          "Expanding into Europe",
          "Company blog"
        ]
      ],
      "people": [
        [
          "Sarah Chen",
          "VP Growth",
          "Owns pipeline and the European launch. Posted about outbound last week."
        ],
        [
          "Daniel Okafor",
          "Chief Revenue Officer",
          "Signs off on the eight sales hires."
        ],
        [
          "Mei Lin",
          "Head of Sales Operations",
          "Runs tooling for the sales team."
        ]
      ],
      "subject": "Northstar’s European launch",
      "body": "Hi {first},\n\nCongrats on [[1|the $12M]]. I saw Northstar is [[2|hiring eight sales roles]] and [[3|opening in Europe]]. Standing up UK hiring is usually where payroll and compliance surprises show up, right when the first reps start.\n\nWe handle that for teams at your stage so it stays off your plate. Worth a 15-minute look?"
    },
    {
      "signals": [
        [
          "Closed a $9M round in July",
          "Funding announcement"
        ],
        [
          "Hiring in Dublin and Toronto",
          "Careers page"
        ],
        [
          "New VP of Sales joined in August",
          "Press release"
        ]
      ],
      "people": [
        [
          "Marcus Bell",
          "VP Sales",
          "Joined in August and is building the team for both new offices."
        ],
        [
          "Elena Park",
          "CEO",
          "Led the July round."
        ],
        [
          "Jonah Reyes",
          "Head of RevOps",
          "Owns the sales stack."
        ]
      ],
      "subject": "Dublin and Toronto in one quarter",
      "body": "Hi {first},\n\nOpening [[2|Dublin and Toronto]] in one quarter means a lot of local rules to get right at once, especially with [[3|a new VP of Sales]] building the team and [[1|the July round]] behind it.\n\nWe take on payroll and contracts for new-country hires, so your reps start on day one without delays. Open to a quick call this week?"
    },
    {
      "signals": [
        [
          "Closed a Series A in April",
          "Funding announcement"
        ],
        [
          "Announced a London office",
          "Press release"
        ],
        [
          "Hiring a head of UK sales",
          "Careers page"
        ]
      ],
      "people": [
        [
          "Priya Nair",
          "COO",
          "Runs operations and is leading the London office setup."
        ],
        [
          "Owen Hart",
          "CEO",
          "Announced the Series A."
        ],
        [
          "Lucy Brandt",
          "Head of Growth",
          "Hiring for the UK sales team."
        ]
      ],
      "subject": "Before the first UK offer letter",
      "body": "Hi {first},\n\nHalden’s [[2|London office]] looks like it is moving fast, with [[3|a head of UK sales search]] already open. First UK hires usually raise questions about entity setup, payroll and benefits, and [[1|the April round]] leaves little time to sort them out.\n\nWe help teams settle that before the offer letter goes out. Worth comparing notes?"
    },
    {
      "signals": [
        [
          "Raised $28M in May",
          "Funding announcement"
        ],
        [
          "Three open roles in Berlin",
          "Careers page"
        ],
        [
          "Published a post on remote-first hiring",
          "Company blog"
        ]
      ],
      "people": [
        [
          "Tomás Ortega",
          "Head of People",
          "Owns hiring and wrote the remote-first post."
        ],
        [
          "Grace Whitaker",
          "CFO",
          "Manages spend after the $28M round."
        ],
        [
          "Ravi Menon",
          "VP Engineering",
          "Leads the Berlin roles."
        ]
      ],
      "subject": "Your remote-first post, and Berlin",
      "body": "Hi {first},\n\nYour [[3|post on remote-first hiring]] matched what we hear from people leaders at your size. With [[2|three roles open in Berlin]] after [[1|the $28M round]], local contracts and payroll are next on the list.\n\nWe handle both so your team does not have to build that in-house. Happy to share how it works."
    },
    {
      "signals": [
        [
          "Raised $15M in June",
          "Funding announcement"
        ],
        [
          "Hiring five account executives",
          "Careers page"
        ],
        [
          "Growing customer base in Canada",
          "Company blog"
        ]
      ],
      "people": [
        [
          "Dana Whitfield",
          "CEO",
          "At 73 people, still signs off on new-country hiring."
        ],
        [
          "Chris Alvarez",
          "VP Sales",
          "Hiring the five account executives."
        ],
        [
          "Nora Fitch",
          "Head of Operations",
          "Coordinates the Canada expansion."
        ]
      ],
      "subject": "Hiring in Canada",
      "body": "Hi {first},\n\nBrightwave’s [[3|growth in Canada]] looks strong, and [[2|five open AE roles]] suggest hiring there is next, now that [[1|the June round]] has closed. Canadian payroll and compliance are easy to get wrong the first time.\n\nWe make it routine for teams like yours. Worth a short call?"
    }
  ],
  "beats": [
    {
      "title": "Tell Loqi who you want.",
      "body": "Describe the customer in a sentence. Loqi turns it into criteria you can edit."
    },
    {
      "title": "Find the people worth reaching.",
      "body": "Loqi searches the market and lists every company that could fit."
    },
    {
      "title": "Skip the rest, and say why.",
      "body": "Each account is checked against your criteria. The ones that miss are skipped, with the reason.",
      "hint": "Try turning a criterion off."
    },
    {
      "title": "Research the account.",
      "body": "Signals from public sources, each tagged with where it came from."
    },
    {
      "title": "Find the right person.",
      "body": "Loqi recommends who to contact and why. You can pick someone else.",
      "hint": "Pick another person. The draft follows."
    },
    {
      "title": "Write the first message.",
      "body": "Every personalized phrase points back to a source.",
      "hint": "Hover an underlined phrase."
    },
    {
      "title": "Approve before anything goes out.",
      "body": "Review each draft. Approve, edit or reject. Nothing is sent without you.",
      "hint": "Click the queue, then press J, K, A, E or R."
    }
  ]
} as const;


export const goal = "Find SaaS companies in the US with 50 to 200 employees that recently raised funding.";
export const steps = [["Searching the market", "184 companies found"], ["Applying your criteria", "47 qualified"], ["Researching accounts", "47 researched"], ["Finding the right people", "91 contacts found"], ["Writing first messages", "47 drafts ready"]];
export const sampleGoals = [
  { label: "SaaS in the US", text: goal, results: steps.map(step => step[1]), total: 47 },
  { label: "Fintech in Europe", text: "Find Series A fintech companies in Europe with 20 to 200 employees.", results: ["936 companies found", "128 match", "61 signals found", "94 contacts found", "31 drafts ready"], total: 31 },
  { label: "Manufacturers in the Midwest", text: "Find mid-size manufacturers in the Midwest that are hiring operations leaders.", results: ["2,210 companies found", "305 match", "97 signals found", "142 contacts found", "52 drafts ready"], total: 52 },
] as const;
export const initialDecisions: Record<number, "approved" | "rejected"> = { 4: "rejected" };
export type Account = { region: string; emp: number; stage: string; hiring: boolean; raised: number; match: number; thin?: boolean };
export const criteria = [
  { label: "United States", test: (a: Account) => a.region === "US", why: (a: Account) => `Based in ${a.region}` },
  { label: "50 to 200 employees", test: (a: Account) => a.emp >= 50 && a.emp <= 200, why: (a: Account) => `${a.emp} employees, ${a.emp < 50 ? "below" : "above"} range` },
  { label: "Series A or later", test: (a: Account) => a.stage !== "Seed", why: () => "Seed stage" },
  { label: "Hiring in sales", test: (a: Account) => a.hiring, why: () => "No sales hiring" },
  { label: "Raised in the last 12 months", test: (a: Account) => a.raised <= 12, why: (a: Account) => `Last raised ${a.raised} months ago` },
];
