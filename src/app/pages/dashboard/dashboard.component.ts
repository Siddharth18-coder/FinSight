import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MockDataService } from '../../services/mock-data.service';
import { Transaction, DashboardStats, Budget } from '../../models/transaction.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-white">Dashboard</h1>
          <p class="text-gray-400">Welcome back, John! Here's your financial overview.</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-sm text-gray-400">Last updated: Just now</span>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Total Balance -->
        <div class="stat-card">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 rounded-xl bg-success-green/20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-success-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span class="text-xs text-success-green bg-success-green/20 px-2 py-1 rounded-full">+12.5%</span>
          </div>
          <p class="text-gray-400 text-sm">Total Balance</p>
          <p class="text-2xl font-bold text-white mt-1">\${{ stats.totalBalance | number:'1.2-2' }}</p>
        </div>

        <!-- Monthly Spending -->
        <div class="stat-card">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 rounded-xl bg-trust-blue/20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-trust-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <span class="text-xs text-amber-500 bg-amber-500/20 px-2 py-1 rounded-full">+8.2%</span>
          </div>
          <p class="text-gray-400 text-sm">Monthly Spending</p>
          <p class="text-2xl font-bold text-white mt-1">\${{ stats.monthlySpending | number:'1.2-2' }}</p>
        </div>

        <!-- Income -->
        <div class="stat-card">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <span class="text-xs text-success-green bg-success-green/20 px-2 py-1 rounded-full">+5.0%</span>
          </div>
          <p class="text-gray-400 text-sm">Monthly Income</p>
          <p class="text-2xl font-bold text-white mt-1">\${{ stats.income | number:'1.2-2' }}</p>
        </div>

        <!-- Savings Rate -->
        <div class="stat-card">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <span class="text-xs text-success-green bg-success-green/20 px-2 py-1 rounded-full">+2.1%</span>
          </div>
          <p class="text-gray-400 text-sm">Savings Rate</p>
          <p class="text-2xl font-bold text-white mt-1">{{ stats.savingsRate }}%</p>
        </div>
      </div>

      <!-- Charts Row -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Spending Trend Chart -->
        <div class="lg:col-span-2 glass-card rounded-xl p-6">
          <h2 class="text-lg font-semibold text-white mb-4">Spending Trends</h2>
          <div class="h-64 flex items-end justify-between gap-2 px-4">
            @for (item of trendData; track item.label) {
              <div class="flex-1 flex flex-col items-center gap-2">
                <div class="w-full bg-dark-border rounded-t-lg relative" [style.height.px]="item.value / 20">
                  <div class="absolute bottom-0 w-full bg-gradient-to-t from-success-green/60 to-success-green rounded-t-lg transition-all duration-500 hover:from-success-green/80"
                       [style.height.%]="100">
                  </div>
                </div>
                <span class="text-gray-400 text-xs">{{ item.label }}</span>
              </div>
            }
          </div>
        </div>

        <!-- Category Breakdown -->
        <div class="glass-card rounded-xl p-6">
          <h2 class="text-lg font-semibold text-white mb-4">Spending by Category</h2>
          <div class="space-y-4">
            @for (category of categoryData; track category.name) {
              <div class="flex items-center gap-3">
                <div class="w-3 h-3 rounded-full" [style.background-color]="category.color"></div>
                <div class="flex-1">
                  <div class="flex justify-between mb-1">
                    <span class="text-white text-sm">{{ category.name }}</span>
                    <span class="text-gray-400 text-sm">\${{ category.value }}</span>
                  </div>
                  <div class="h-2 bg-dark-border rounded-full overflow-hidden">
                    <div class="h-full rounded-full transition-all duration-500" 
                         [style.width.%]="category.percentage"
                         [style.background-color]="category.color">
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>

      <!-- Recent Transactions -->
      <div class="glass-card rounded-xl p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold text-white">Recent Transactions</h2>
          <a routerLink="/transactions" class="text-trust-blue hover:text-trust-blue/80 text-sm font-medium">View All →</a>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="text-left text-gray-400 text-sm border-b border-dark-border">
                <th class="pb-3 font-medium">Description</th>
                <th class="pb-3 font-medium">Category</th>
                <th class="pb-3 font-medium">Date</th>
                <th class="pb-3 font-medium text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              @for (transaction of recentTransactions; track transaction.id) {
                <tr class="table-row">
                  <td class="py-4">
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 rounded-lg bg-dark-card flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                      </div>
                      <div>
                        <p class="text-white font-medium">{{ transaction.description }}</p>
                        <p class="text-gray-400 text-sm">{{ transaction.merchant }}</p>
                      </div>
                    </div>
                  </td>
                  <td class="py-4">
                    <span class="px-3 py-1 rounded-full text-xs font-medium" 
                          [class]="getCategoryClass(transaction.category)">
                      {{ transaction.category }}
                    </span>
                  </td>
                  <td class="py-4 text-gray-400">{{ transaction.date | date:'MMM d, yyyy' }}</td>
                  <td class="py-4 text-right" 
                      [class]="transaction.type === 'income' ? 'text-success-green' : 'text-white'">
                    {{ transaction.type === 'income' ? '+' : '-' }}\${{ transaction.amount | number:'1.2-2' }}
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  stats!: DashboardStats;
  recentTransactions: Transaction[] = [];
  budgets: Budget[] = [];
  
  trendData: { label: string; value: number }[] = [];
  categoryData: { name: string; value: number; color: string; percentage: number }[] = [];

  constructor(private readonly mockDataService: MockDataService) {}

  ngOnInit() {
    this.stats = this.mockDataService.getDashboardStats();
    this.recentTransactions = this.mockDataService.getTransactions().slice(0, 5);
    this.budgets = this.mockDataService.getBudgets();
    
    // Setup trend data
    const spendingTrend = this.mockDataService.getSpendingTrend();
    this.trendData = spendingTrend.labels.map((label, i) => ({
      label,
      value: spendingTrend.data[i]
    }));
    
    // Setup category data
    const categoryBreakdown = this.mockDataService.getCategoryBreakdown();
    const maxValue = Math.max(...categoryBreakdown.data);
    this.categoryData = categoryBreakdown.labels.map((name, i) => ({
      name,
      value: categoryBreakdown.data[i],
      color: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4'][i],
      percentage: (categoryBreakdown.data[i] / maxValue) * 100
    }));
  }

  getCategoryClass(category: string): string {
    const classes: { [key: string]: string } = {
      'Housing': 'bg-blue-500/20 text-blue-400',
      'Food': 'bg-green-500/20 text-green-400',
      'Transportation': 'bg-amber-500/20 text-amber-400',
      'Entertainment': 'bg-purple-500/20 text-purple-400',
      'Shopping': 'bg-pink-500/20 text-pink-400',
      'Health': 'bg-cyan-500/20 text-cyan-400',
      'Income': 'bg-success-green/20 text-success-green'
    };
    return classes[category] || 'bg-gray-500/20 text-gray-400';
  }
}

