import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MockDataService } from '../../services/mock-data.service';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 class="text-2xl font-bold text-white">Transactions</h1>
          <p class="text-gray-400">Manage and track all your financial transactions</p>
        </div>
        <button class="btn-primary flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Scan Receipt
        </button>
      </div>

      <!-- Filters -->
      <div class="glass-card rounded-xl p-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <!-- Search -->
          <div class="relative">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input type="text" 
                   [(ngModel)]="searchTerm" 
                   (ngModelChange)="filterTransactions()"
                   placeholder="Search transactions..." 
                   class="input-field pl-10">
          </div>

          <!-- Category Filter -->
          <select [(ngModel)]="selectedCategory" (ngModelChange)="filterTransactions()" class="input-field">
            <option value="">All Categories</option>
            <option value="Housing">Housing</option>
            <option value="Food">Food</option>
            <option value="Transportation">Transportation</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Shopping">Shopping</option>
            <option value="Health">Health</option>
            <option value="Income">Income</option>
          </select>

          <!-- Date Filter -->
          <select [(ngModel)]="selectedDateRange" (ngModelChange)="filterTransactions()" class="input-field">
            <option value="">All Time</option>
            <option value="7">Last 7 Days</option>
            <option value="30">Last 30 Days</option>
            <option value="90">Last 90 Days</option>
          </select>

          <!-- Type Filter -->
          <select [(ngModel)]="selectedType" (ngModelChange)="filterTransactions()" class="input-field">
            <option value="">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
      </div>

      <!-- Transactions Table -->
      <div class="glass-card rounded-xl overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="text-left text-gray-400 text-sm bg-dark-card">
                <th class="px-6 py-4 font-medium cursor-pointer hover:text-white" (click)="sortBy('description')">
                  Description
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 inline ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                </th>
                <th class="px-6 py-4 font-medium">Category</th>
                <th class="px-6 py-4 font-medium cursor-pointer hover:text-white" (click)="sortBy('date')">
                  Date
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 inline ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                </th>
                <th class="px-6 py-4 font-medium cursor-pointer hover:text-white" (click)="sortBy('amount')">
                  Amount
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 inline ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                </th>
              </tr>
            </thead>
            <tbody>
              @for (transaction of filteredTransactions; track transaction.id) {
                <tr class="table-row">
                  <td class="px-6 py-4">
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
                  <td class="px-6 py-4">
                    <span class="px-3 py-1 rounded-full text-xs font-medium" 
                          [class]="getCategoryClass(transaction.category)">
                      {{ transaction.category }}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-gray-400">{{ transaction.date | date:'MMM d, yyyy' }}</td>
                  <td class="px-6 py-4" 
                      [class]="transaction.type === 'income' ? 'text-success-green' : 'text-white'">
                    <span class="font-semibold">
                      {{ transaction.type === 'income' ? '+' : '-' }}\${{ transaction.amount | number:'1.2-2' }}
                    </span>
                  </td>
                </tr>
              } @empty {
                <tr>
                  <td colspan="4" class="px-6 py-8 text-center text-gray-400">
                    No transactions found matching your filters.
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
        
        <!-- Pagination -->
        <div class="px-6 py-4 border-t border-dark-border flex justify-between items-center">
          <p class="text-gray-400 text-sm">
            Showing {{ filteredTransactions.length }} of {{ allTransactions.length }} transactions
          </p>
          <div class="flex items-center gap-2">
            <button class="px-3 py-1 rounded-lg bg-dark-card text-gray-400 hover:text-white disabled:opacity-50" 
                    [disabled]="currentPage === 1"
                    (click)="previousPage()">
              Previous
            </button>
            <span class="text-white px-3">Page {{ currentPage }}</span>
            <button class="px-3 py-1 rounded-lg bg-dark-card text-gray-400 hover:text-white disabled:opacity-50"
                    [disabled]="currentPage * pageSize >= allTransactions.length"
                    (click)="nextPage()">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class TransactionsComponent implements OnInit {
  allTransactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  
  searchTerm = '';
  selectedCategory = '';
  selectedDateRange = '';
  selectedType = '';
  
  currentPage = 1;
  pageSize = 10;
  sortColumn = 'date';
  sortDirection: 'asc' | 'desc' = 'desc';

  constructor(private readonly mockDataService: MockDataService) {}

  ngOnInit() {
    this.allTransactions = this.mockDataService.getTransactions();
    this.filterTransactions();
  }

  filterTransactions() {
    let result = [...this.allTransactions];
    
    // Search filter
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(t => 
        t.description.toLowerCase().includes(term) ||
        t.merchant?.toLowerCase().includes(term)
      );
    }
    
    // Category filter
    if (this.selectedCategory) {
      result = result.filter(t => t.category === this.selectedCategory);
    }
    
    // Type filter
    if (this.selectedType) {
      result = result.filter(t => t.type === this.selectedType);
    }
    
    // Date filter
    if (this.selectedDateRange) {
      const days = Number.parseInt(this.selectedDateRange);
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - days);
      result = result.filter(t => new Date(t.date) >= cutoff);
    }
    
    // Sort
    result.sort((a, b) => {
      let comparison = 0;
      switch (this.sortColumn) {
        case 'description':
          comparison = a.description.localeCompare(b.description);
          break;
        case 'date':
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case 'amount':
          comparison = a.amount - b.amount;
          break;
      }
      return this.sortDirection === 'asc' ? comparison : -comparison;
    });
    
    this.filteredTransactions = result;
    this.currentPage = 1;
  }

  sortBy(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'desc';
    }
    this.filterTransactions();
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    this.currentPage++;
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

