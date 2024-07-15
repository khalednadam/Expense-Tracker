export type User = {
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
