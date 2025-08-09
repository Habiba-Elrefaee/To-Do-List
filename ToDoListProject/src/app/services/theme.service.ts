import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkMode = signal<boolean>(false);
  private mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  constructor() {
    // Initialize theme from localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    this.isDarkMode.set(savedTheme ? savedTheme === 'dark' : this.mediaQuery.matches);
    
    // Set up effect for theme changes
    effect(() => {
      const isDark = this.isDarkMode();
      document.documentElement.classList.toggle('dark-theme', isDark);
    });

    // Listen for system theme changes
    this.mediaQuery.addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        this.isDarkMode.set(e.matches);
      }
    });
  }

  toggleTheme(): void {
    this.isDarkMode.update(dark => !dark);
    localStorage.setItem('theme', this.isDarkMode() ? 'dark' : 'light');
  }

  getDarkMode() {
    return this.isDarkMode;
  }
}