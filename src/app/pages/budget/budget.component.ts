import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockDataService } from '../../services/mock-data.service';
import { Budget } from '../../models/transaction.model';

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 class="text-2xl font-bold text-white">Budget</h1>
          <p class="text-gray-400">Track your spending against monthly budgets</p>
        </div>
        <button class="btn-primary flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Budget
        </button>
      </div>

      <!-- Summary Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="stat-card">
          <p class="text-gray-400 text-sm">Total Budget</p>
          <p class="text-2xl font-bold text-white mt-1">\${{ totalBudget | number:'1.2-2' }}</p>
        </div>
        <div class="stat-card">
          <p class="text-gray-400 text-sm">Total Spent</p>
          <p class="text-2xl font-bold text-white mt-1">\${{ totalSpent | number:'1.2-2' }}</p>
        </div>
        <div class="stat-card">
          <p class="text-gray-400 text-sm">Remaining</p>
          <p class="text-2xl font-bold mt-1" [class]="remaining >= 0 ? 'text-success-green' : 'text-red-500'">
            \${{ remaining | number:'1.2-2' }}
          </p>
        </div>
      </div>

      <!-- Budget Progress Cards -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        @for (budget of budgets; track budget.category) {
          <div class="glass-card rounded-xl p-6">
            <div class="flex justify-between items-start mb-4">
              <div>
                <h3 class="text-lg font-semibold text-white">{{ budget.category }}</h3>
                <p class="text-gray-400 text-sm">
                  \${{ budget.spent | number:'1.2-2' }} of \${{ budget.limit | number:'1.2-2' }}
                </p>
              </div>
              <span class="px-3 py-1 rounded-full text-xs font-medium"
                    [class]="getStatusClass(budget)">
                {{ getPercentage(budget) }}%
              </span>
            </div>
            
            <!-- Progress Bar -->
            <div class="progress-bar mb-4">
              <div class="progress-fill" 
                   [style.width.%]="getPercentage(budget)"
                   [style.background-color]="budget.color">
              </div>
            </div>
            
            <div class="flex justify-between items-center text-sm">
              <span class="text-gray-400">
                {{ budget.limit - budget.spent >= 0 ? 'Remaining:' : 'Over budget:' }}
              </span>
              <span [class]="budget.limit - budget.spent >= 0 ? 'text-success-green' : 'text-red-500'">
                \${{ Math.abs(budget.limit - budget.spent) | number:'1.2-2' }}
              </span>
            </div>
          </div>
        }
      </div>

      <!-- Spending by Category Chart -->
      <div class="glass-card rounded-xl p-6">
        <h2 class="text-lg font-semibold text-white mb-4">Category Breakdown</h2>
        <div class="space-y-4">
          @for (budget of budgets; track budget.category) {
            <div class="flex items-center gap-4">
              <div class="w-3 h-3 rounded-full" [style.background-color]="budget.color"></div>
              <div class="flex-1">
                <div class="flex justify-between mb-1">
                  <span class="text-white text-sm font-medium">{{ budget.category }}</span>
                  <span class="text-gray-400 text-sm">\${{ budget.spent | number:'1.2-2' }}</span>
                </div>
                <div class="h-2 rounded-full overflow-hidden">
                  <div class="h-full bg-dark-border rounded-full transition-all duration-500" 
                       [style.width.%]="(budget.spent / totalSpent) * 100"
                       [style.background-color]="budget.color">
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `
})
export class BudgetComponent implements OnInit {
  budgets: Budget[] = [];
  totalBudget = 0;
  totalSpent = 0;
  remaining = 0;
  Math = Math;

  constructor(private readonly mockDataService: MockDataService) {}

  ngOnInit() {
    this.budgets = this.mockDataService.getBudgets();
    this.calculateTotals();
  }

  calculateTotals() {
    this.totalBudget = this.budgets.reduce((sum, b) => sum + b.limit, 0);
    this.totalSpent = this.budgets.reduce((sum, b) => sum + b.spent, 0);
    this.remaining = this.totalBudget - this.totalSpent;
  }

  getPercentage(budget: Budget): number {
    return Math.min(Math.round((budget.spent / budget.limit) * 100), 100);
  }

  getStatusClass(budget: Budget): string {
    const percentage = (budget.spent / budget.limit) * 100;
    if (percentage < 70) {
      return 'bg-success-green/20 text-success-green';
    } else if (percentage < 90) {
      return 'bg-amber-500/20 text-amber-500';
    } else {
      return 'bg-red-500/20 text-red-500';
    }
  }
}

