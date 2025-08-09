import { Injectable, signal, effect } from '@angular/core';

/**
 * Service responsible for managing the application's theme (dark/light mode).
 * Handles theme persistence, system preference detection, and theme toggling.
 */
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  // Signal to track dark mode state with reactive updates
  private isDarkMode = signal<boolean>(false);
  // System level dark mode preference detection
  private mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  constructor() {
    // Initialize theme from localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    this.isDarkMode.set(savedTheme ? savedTheme === 'dark' : this.mediaQuery.matches);
    
    // Set up effect to update DOM when theme changes
    effect(() => {
      const isDark = this.isDarkMode();
      document.documentElement.classList.toggle('dark-theme', isDark);
    });

    // Listen for system theme changes and update if no user preference is saved
    this.mediaQuery.addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        this.isDarkMode.set(e.matches);
      }
    });
  }

  // Toggle between dark and light theme, saving preference to localStorage
  toggleTheme(): void {
    this.isDarkMode.update(dark => !dark);
    localStorage.setItem('theme', this.isDarkMode() ? 'dark' : 'light');
  }

  // Get the current theme state as a signal
  getDarkMode() {
    return this.isDarkMode;
  }
}