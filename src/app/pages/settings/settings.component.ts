import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-6">
      <!-- Header -->
      <div>
        <h1 class="text-2xl font-bold text-white">Settings</h1>
        <p class="text-gray-400">Manage your account and preferences</p>
      </div>

      <!-- Profile Section -->
      <div class="glass-card rounded-xl p-6">
        <h2 class="text-lg font-semibold text-white mb-4">Profile</h2>
        <div class="flex items-center gap-6 mb-6">
          <div class="w-20 h-20 rounded-full bg-gradient-to-br from-trust-blue to-success-green flex items-center justify-center text-white text-2xl font-bold">
            JD
          </div>
          <div>
            <button class="btn-primary mb-2">Change Photo</button>
            <p class="text-gray-400 text-sm">JPG, PNG or GIF. Max size 2MB.</p>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-gray-400 text-sm mb-2">First Name</label>
            <input type="text" value="John" class="input-field">
          </div>
          <div>
            <label class="block text-gray-400 text-sm mb-2">Last Name</label>
            <input type="text" value="Doe" class="input-field">
          </div>
          <div>
            <label class="block text-gray-400 text-sm mb-2">Email</label>
            <input type="email" value="john.doe@example.com" class="input-field">
          </div>
          <div>
            <label class="block text-gray-400 text-sm mb-2">Phone</label>
            <input type="tel" value="+1 (555) 123-4567" class="input-field">
          </div>
        </div>
      </div>

      <!-- Notifications -->
      <div class="glass-card rounded-xl p-6">
        <h2 class="text-lg font-semibold text-white mb-4">Notifications</h2>
        <div class="space-y-4">
          <div class="flex items-center justify-between p-4 bg-dark-card rounded-lg">
            <div>
              <p class="text-white font-medium">Email Notifications</p>
              <p class="text-gray-400 text-sm">Receive email updates about your account</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked class="sr-only peer">
              <div class="w-11 h-6 bg-dark-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-success-green"></div>
            </label>
          </div>
          <div class="flex items-center justify-between p-4 bg-dark-card rounded-lg">
            <div>
              <p class="text-white font-medium">Push Notifications</p>
              <p class="text-gray-400 text-sm">Receive push notifications on your device</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked class="sr-only peer">
              <div class="w-11 h-6 bg-dark-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-success-green"></div>
            </label>
          </div>
          <div class="flex items-center justify-between p-4 bg-dark-card rounded-lg">
            <div>
              <p class="text-white font-medium">Budget Alerts</p>
              <p class="text-gray-400 text-sm">Get notified when you're close to budget limits</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked class="sr-only peer">
              <div class="w-11 h-6 bg-dark-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-success-green"></div>
            </label>
          </div>
        </div>
      </div>

      <!-- Security -->
      <div class="glass-card rounded-xl p-6">
        <h2 class="text-lg font-semibold text-white mb-4">Security</h2>
        <div class="space-y-4">
          <button class="w-full flex items-center justify-between p-4 bg-dark-card rounded-lg hover:bg-white/5 transition-all">
            <div class="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
              <p class="text-white font-medium">Change Password</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <button class="w-full flex items-center justify-between p-4 bg-dark-card rounded-lg hover:bg-white/5 transition-all">
            <div class="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <p class="text-white font-medium">Two-Factor Authentication</p>
            </div>
            <span class="text-success-green text-sm">Enabled</span>
          </button>
        </div>
      </div>

      <!-- Save Button -->
      <div class="flex justify-end gap-4">
        <button class="px-6 py-3 bg-dark-card border border-dark-border text-white rounded-lg font-medium hover:bg-white/5 transition-all">
          Cancel
        </button>
        <button class="btn-primary px-6 py-3">
          Save Changes
        </button>
      </div>
    </div>
  `
})
export class SettingsComponent {}

