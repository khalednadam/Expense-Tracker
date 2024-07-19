export type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  profilePicUrl?: string;
  totalBalance: number;
  currency: "$" | "€" | "₺" | "﷼" | "¥";
  slug?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
export type Expense = {
  _id: string;
  amount: number;
  category: string;
  description?: string;
  type: "withdrawal" | "deposit";
  serviceName: string;
  user: string;
  createdAt?: Date;
  updatedAt?: Date;
};
export type Trend = {
  _id: string;
  totalSpent: number;
};
