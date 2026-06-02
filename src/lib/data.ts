export type Expense = {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: string; // ISO
};

export const CATEGORIES = [
  "Food",
  "Transport",
  "Shopping",
  "Bills",
  "Health",
  "Other",
];

export const SEED: Expense[] = [
  { id: 1, description: "Groceries for the week", amount: 1840, category: "Food", date: "2026-05-29T09:20:00.000Z" },
  { id: 2, description: "Auto to office", amount: 60, category: "Transport", date: "2026-05-30T02:40:00.000Z" },
  { id: 3, description: "Electricity bill", amount: 2230, category: "Bills", date: "2026-05-30T14:05:00.000Z" },
  { id: 4, description: "Running shoes", amount: 4499, category: "Shopping", date: "2026-05-31T11:30:00.000Z" },
  { id: 5, description: "Pharmacy", amount: 320, category: "Health", date: "2026-06-01T07:15:00.000Z" },
  { id: 6, description: "Lunch with team", amount: 880, category: "Food", date: "2026-06-01T08:45:00.000Z" },
];
