import { Injectable } from '@angular/core';
import { Transaction, Budget, AIInsight, DashboardStats } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  
  getTransactions(): Transaction[] {
    return [
      { id: '1', date: new Date('2025-01-15'), description: 'Salary Deposit', amount: 8500, category: 'Income', type: 'income', merchant: 'Acme Corp' },
      { id: '2', date: new Date('2025-01-14'), description: 'Grocery Shopping', amount: 156.32, category: 'Food', type: 'expense', merchant: 'Whole Foods' },
      { id: '3', date: new Date('2025-01-13'), description: 'Netflix Subscription', amount: 15.99, category: 'Entertainment', type: 'expense', merchant: 'Netflix' },
      { id: '4', date: new Date('2025-01-12'), description: 'Gas Station', amount: 58.5, category: 'Transportation', type: 'expense', merchant: 'Shell' },
      { id: '5', date: new Date('2025-01-11'), description: 'Restaurant Dinner', amount: 89, category: 'Food', type: 'expense', merchant: 'Olive Garden' },
      { id: '6', date: new Date('2025-01-10'), description: 'Electric Bill', amount: 145, category: 'Housing', type: 'expense', merchant: 'City Power' },
      { id: '7', date: new Date('2025-01-09'), description: 'Spotify Premium', amount: 9.99, category: 'Entertainment', type: 'expense', merchant: 'Spotify' },
      { id: '8', date: new Date('2025-01-08'), description: 'Freelance Project', amount: 1200, category: 'Income', type: 'income', merchant: 'Client ABC' },
      { id: '9', date: new Date('2025-01-07'), description: 'Amazon Purchase', amount: 234.5, category: 'Shopping', type: 'expense', merchant: 'Amazon' },
      { id: '10', date: new Date('2025-01-06'), description: 'Gym Membership', amount: 49.99, category: 'Health', type: 'expense', merchant: 'FitLife Gym' },
      { id: '11', date: new Date('2025-01-05'), description: 'Uber Ride', amount: 24.5, category: 'Transportation', type: 'expense', merchant: 'Uber' },
      { id: '12', date: new Date('2025-01-04'), description: 'Starbucks', amount: 12.45, category: 'Food', type: 'expense', merchant: 'Starbucks' },
      { id: '13', date: new Date('2025-01-03'), description: 'Home Internet', amount: 79.99, category: 'Housing', type: 'expense', merchant: 'Comcast' },
      { id: '14', date: new Date('2025-01-02'), description: 'Apple Subscription', amount: 14.99, category: 'Entertainment', type: 'expense', merchant: 'Apple' },
      { id: '15', date: new Date('2025-01-01'), description: 'Rent Payment', amount: 2200, category: 'Housing', type: 'expense', merchant: 'Oakwood Apartments' },
    ];
  }

  getBudgets(): Budget[] {
    return [
      { category: 'Housing', limit: 2500, spent: 2424.99, color: '#3b82f6' },
      { category: 'Food', limit: 800, spent: 645.32, color: '#10b981' },
      { category: 'Transportation', limit: 400, spent: 283, color: '#f59e0b' },
      { category: 'Entertainment', limit: 300, spent: 190.97, color: '#8b5cf6' },
      { category: 'Shopping', limit: 500, spent: 234.5, color: '#ec4899' },
      { category: 'Health', limit: 200, spent: 149.99, color: '#06b6d4' },
    ];
  }

  getAIInsights(): AIInsight[] {
    return [
      {
        id: '1',
        type: 'warning',
        title: 'Subscription Spending Alert',
        message: 'Your subscription spending is up 12% this month. You have 5 active subscriptions totaling $50.96/month.',
        icon: 'credit-card',
        actionLabel: 'View Subscriptions'
      },
      {
        id: '2',
        type: 'positive',
        title: 'Great Savings Rate!',
        message: 'You\'ve saved 18.2% of your income this month - that\'s above the recommended 15%! Keep it up!',
        icon: 'trending-up',
        actionLabel: 'View Details'
      },
      {
        id: '3',
        type: 'info',
        title: 'Food Budget Opportunity',
        message: 'You have $154.68 remaining in your food budget. Consider meal prepping to save more!',
        icon: 'utensils',
        actionLabel: 'Get Tips'
      },
      {
        id: '4',
        type: 'warning',
        title: 'Unusual Entertainment Spend',
        message: 'Entertainment expenses are 35% higher than your 3-month average. Want me to identify the culprits?',
        icon: 'alert-triangle',
        actionLabel: 'Analyze'
      },
      {
        id: '5',
        type: 'positive',
        title: 'Bill Negotiation Opportunity',
        message: 'I found 3 bills that could be renegotiated. Estimated savings: $45/month.',
        icon: 'dollar-sign',
        actionLabel: 'Start Saving'
      },
    ];
  }

  getDashboardStats(): DashboardStats {
    return {
      totalBalance: 24567.89,
      monthlySpending: 4287.26,
      savingsRate: 18.2,
      income: 9700
    };
  }

  getSpendingTrend(): { labels: string[]; data: number[] } {
    return {
      labels: ['Oct', 'Nov', 'Dec', 'Jan'],
      data: [3200, 3800, 4100, 4287]
    };
  }

  getCategoryBreakdown(): { labels: string[]; data: number[] } {
    return {
      labels: ['Housing', 'Food', 'Transportation', 'Entertainment', 'Shopping', 'Health'],
      data: [2424.99, 645.32, 283, 190.97, 234.5, 149.99]
    };
  }
}

