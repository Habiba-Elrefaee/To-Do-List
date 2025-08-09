import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivityType } from '../../models/task';
import { ThemeService } from '../../services/theme.service';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.css',
  animations: [
    trigger('formAnimation', [
      transition(':enter', [
        query('.form-group', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(100, [
            animate('300ms ease-out', 
              style({ opacity: 1, transform: 'translateY(0)' })
            )
          ])
        ], { optional: true })
      ])
    ]),
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-out', 
          style({ opacity: 1, transform: 'translateY(0)' })
        )
      ])
    ])
  ]
})
export class TaskDetailsComponent implements OnInit {
  selectedActivity: ActivityType | null = null;
  taskTitle: string = '';
  taskDescription: string = '';
  isDarkMode: () => boolean;

  constructor(
    private router: Router,
    private themeService: ThemeService
  ) {
    this.isDarkMode = this.themeService.getDarkMode();
  }

  ngOnInit() {
    const activity = sessionStorage.getItem('selectedActivity') as ActivityType;
    if (!activity) {
      this.goBack();
      return;
    }
    this.selectedActivity = activity;
  }

  createTask() {
    if (this.taskTitle.trim() && this.selectedActivity) {
      const task = {
        title: this.taskTitle,
        description: this.taskDescription,
        activity: this.selectedActivity
      };
      
      // Store the task temporarily
      sessionStorage.setItem('newTask', JSON.stringify(task));
      this.router.navigate(['/']);
    }
  }

  goBack() {
    this.router.navigate(['/select-activity']);
  }

  getActivityIcon(activity: ActivityType | null): string {
    if (!activity) return '';
    const icons: Record<ActivityType, string> = {
      'Idea': 'lightbulb',
      'Food': 'restaurant',
      'Work': 'work',
      'Sport': 'sports_basketball',
      'Music': 'music_note'
    };
    return icons[activity] || '';
  }
}
