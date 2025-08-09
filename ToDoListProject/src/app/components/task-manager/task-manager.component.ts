import { Component, OnInit, signal, Signal, computed, effect } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { Task, ActivityType } from '../../models/task';
import { FormsModule } from '@angular/forms';

/**
 * Main component that manages the todo list application.
 * Handles task operations, theme switching, and data persistence.
 */
@Component({
  selector: 'app-task-manager',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe, FormsModule],
  templateUrl: './task-manager.component.html',
  styleUrl: './task-manager.component.css'
})
export class TaskManagerComponent implements OnInit {
  // Signal to track tasks with reactive updates
  tasks = signal<Task[]>([]);
  today = new Date();
  isDarkMode: Signal<boolean>;
  editingTask: Task | null = null;
  private saveTimeout: any;
  
  // Computed property that returns appropriate greeting based on time of day
  greeting = computed(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  });

  constructor(private themeService: ThemeService) {
    this.isDarkMode = this.themeService.getDarkMode();
    
    // Set up effect to automatically save tasks when they change
    effect(() => {
      const currentTasks = this.tasks();
      this.debouncedSaveTasks(currentTasks);
    });
  }

  // Load saved tasks and handle new task creation on component initialization
  ngOnInit() {
    this.loadTasks();
    const newTaskJson = sessionStorage.getItem('newTask');
    if (newTaskJson) {
      const taskData = JSON.parse(newTaskJson);
      this.addTask(taskData);
      sessionStorage.removeItem('newTask');
    }
  }

  // Load tasks from localStorage with error handling
  private loadTasks(): void {
    try {
      const savedTasks = localStorage.getItem('tasks');
      if (savedTasks) {
        this.tasks.set(JSON.parse(savedTasks));
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  }

  // Debounced save operation to prevent excessive storage writes
  private debouncedSaveTasks(tasks: Task[]): void {
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
    }
    this.saveTimeout = setTimeout(() => {
      try {
        localStorage.setItem('tasks', JSON.stringify(tasks));
      } catch (error) {
        console.error('Error saving tasks:', error);
      }
    }, 300);
  }

  // Returns appropriate icon based on activity type
  getActivityIcon(activity: ActivityType): string {
    switch (activity) {
      case 'Idea': return 'lightbulb';
      case 'Food': return 'restaurant';
      case 'Work': return 'work';
      case 'Sport': return 'sports_basketball';
      case 'Music': return 'music_note';
      default: return 'task';
    }
  }

  // Toggle between light and dark theme
  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  // Add a new task with the given data
  addTask(taskData: { title: string; activity: ActivityType; description?: string }): void {
    if (taskData.title.trim()) {
      const newTask: Task = {
        id: Date.now(),
        title: taskData.title.trim(),
        completed: false,
        createdAt: new Date(),
        activity: taskData.activity,
        description: taskData.description
      };
      this.tasks.update(tasks => [...tasks, newTask]);
    }
  }

  // Toggle task completion status
  toggleTask(taskId: number): void {
    this.tasks.update(tasks => 
      tasks.map(task => 
        task.id === taskId 
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  // Delete a task by its ID
  deleteTask(taskId: number): void {
    this.tasks.update(tasks => tasks.filter(task => task.id !== taskId));
  }

  // Start editing a task
  startEdit(task: Task): void {
    this.editingTask = { ...task };
  }

  // Save edited task changes
  saveEdit(): void {
    if (this.editingTask) {
      this.tasks.update(tasks =>
        tasks.map(task =>
          task.id === this.editingTask?.id
            ? { ...this.editingTask }
            : task
        )
      );
      this.editingTask = null;
    }
  }

  // Cancel task editing
  cancelEdit(): void {
    this.editingTask = null;
  }
}