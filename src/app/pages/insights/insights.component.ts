import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockDataService } from '../../services/mock-data.service';
import { AIInsight } from '../../models/transaction.model';

@Component({
  selector: 'app-insights',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 class="text-2xl font-bold text-white">AI Insights</h1>
          <p class="text-gray-400">Personalized financial advice powered by AI</p>
        </div>
        <div class="flex items-center gap-2 px-4 py-2 bg-trust-blue/20 rounded-lg border border-trust-blue/30">
          <div class="w-2 h-2 bg-trust-blue rounded-full animate-pulse"></div>
          <span class="text-trust-blue text-sm font-medium">AI Coach Active</span>
        </div>
      </div>

      <!-- AI Coach Welcome -->
      <div class="glass-card rounded-xl p-6 bg-gradient-to-r from-trust-blue/10 to-success-green/10">
        <div class="flex items-start gap-4">
          <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-trust-blue to-success-green flex items-center justify-center flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <h2 class="text-xl font-semibold text-white">Hello, I'm your AI Financial Coach!</h2>
            <p class="text-gray-300 mt-2">
              I'm analyzing your spending patterns, subscriptions, and financial goals to provide personalized insights. 
              Check out my recommendations below or ask me anything about your finances.
            </p>
            <div class="mt-4 flex gap-3">
              <button class="btn-primary">
                <span class="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  Ask AI Coach
                </span>
              </button>
              <button class="px-4 py-2 bg-dark-card border border-dark-border text-white rounded-lg font-medium hover:bg-white/5 transition-all">
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Insights Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        @for (insight of insights; track insight.id) {
          <div class="insight-card" [ngClass]="insight.type">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                   [ngClass]="getIconClass(insight.type)">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  @switch (insight.icon) {
                    @case ('credit-card') {
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    }
                    @case ('trending-up') {
                      <path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    }
                    @case ('utensils') {
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    }
                    @case ('alert-triangle') {
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    }
                    @case ('dollar-sign') {
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    }
                    @default {
                      <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    }
                  }
                </svg>
              </div>
              <div class="flex-1">
                <div class="flex justify-between items-start">
                  <h3 class="text-lg font-semibold text-white">{{ insight.title }}</h3>
                  <span class="px-2 py-1 rounded text-xs font-medium"
                        [ngClass]="getBadgeClass(insight.type)">
                    {{ insight.type | titlecase }}
                  </span>
                </div>
                <p class="text-gray-300 mt-2">{{ insight.message }}</p>
                @if (insight.actionLabel) {
                  <button class="mt-4 text-sm font-medium hover:underline"
                          [ngClass]="getActionClass(insight.type)">
                    {{ insight.actionLabel }} →
                  </button>
                }
              </div>
            </div>
          </div>
        }
      </div>

      <!-- Quick Actions -->
      <div class="glass-card rounded-xl p-6">
        <h2 class="text-lg font-semibold text-white mb-4">Quick Actions</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button class="p-4 bg-dark-card rounded-xl hover:bg-white/5 transition-all text-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 mx-auto text-success-green mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p class="text-white text-sm font-medium">Track Bills</p>
          </button>
          <button class="p-4 bg-dark-card rounded-xl hover:bg-white/5 transition-all text-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 mx-auto text-trust-blue mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            <p class="text-white text-sm font-medium">Link Accounts</p>
          </button>
          <button class="p-4 bg-dark-card rounded-xl hover:bg-white/5 transition-all text-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 mx-auto text-purple-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <p class="text-white text-sm font-medium">View Reports</p>
          </button>
          <button class="p-4 bg-dark-card rounded-xl hover:bg-white/5 transition-all text-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 mx-auto text-amber-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <p class="text-white text-sm font-medium">Set Alerts</p>
          </button>
        </div>
      </div>
    </div>
  `
})
export class InsightsComponent implements OnInit {
  insights: AIInsight[] = [];

  constructor(private readonly mockDataService: MockDataService) {}

  ngOnInit() {
    this.insights = this.mockDataService.getAIInsights();
  }

  getIconClass(type: string): string {
    return this.getTypeClass(type);
  }

  getBadgeClass(type: string): string {
    return this.getTypeClass(type);
  }

  private getTypeClass(type: string): string {
    switch (type) {
      case 'positive':
        return 'bg-success-green/20 text-success-green';
      case 'warning':
        return 'bg-amber-500/20 text-amber-500';
      case 'info':
        return 'bg-trust-blue/20 text-trust-blue';
      default:
        return 'bg-gray-500/20 text-gray-500';
    }
  }

  getActionClass(type: string): string {
    switch (type) {
      case 'positive':
        return 'text-success-green hover:text-success-green/80';
      case 'warning':
        return 'text-amber-500 hover:text-amber-500/80';
      case 'info':
        return 'text-trust-blue hover:text-trust-blue/80';
      default:
        return 'text-gray-400 hover:text-gray-300';
    }
  }
}

