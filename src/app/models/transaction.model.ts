export interface Transaction {
  id: string;
  date: Date;
  description: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
  merchant?: string;
}

export interface Budget {
  category: string;
  limit: number;
  spent: number;
  color: string;
}

export interface AIInsight {
  id: string;
  type: 'positive' | 'warning' | 'info';
  title: string;
  message: string;
  icon: string;
  actionLabel?: string;
}

export interface DashboardStats {
  totalBalance: number;
  monthlySpending: number;
  savingsRate: number;
  income: number;
}

