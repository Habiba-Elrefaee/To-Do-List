import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ActivityType, ActivityInfo, Task } from '../../models/task';
import { ThemeService } from '../../services/theme.service';
import { trigger, transition, style, animate, stagger, query } from '@angular/animations';

@Component({
  selector: 'app-activity-selection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './activity-selection.component.html',
  styleUrl: './activity-selection.component.css',
  animations: [
    trigger('activityList', [
      transition(':enter', [
        query('.activity-card', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(50, [
            animate('300ms ease-out', 
              style({ opacity: 1, transform: 'translateY(0)' })
            )
          ])
        ], { optional: true })
      ])
    ]),
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('300ms ease-out', 
          style({ opacity: 1, transform: 'translateY(0)' })
        )
      ])
    ])
  ]
})
export class ActivitySelectionComponent {
  activities: ActivityInfo[] = [
    { type: 'Idea', icon: 'lightbulb', taskCount: 0, color: '#B388FF' },
    { type: 'Food', icon: 'restaurant', taskCount: 0, color: '#FF80AB' },
    { type: 'Work', icon: 'work', taskCount: 0, color: '#82B1FF' },
    { type: 'Sport', icon: 'sports_basketball', taskCount: 0, color: '#B9F6CA' },
    { type: 'Music', icon: 'music_note', taskCount: 0, color: '#FFD180' }
  ];

  isDarkMode: boolean;

  constructor(
    private router: Router,
    private themeService: ThemeService
  ) {
    this.isDarkMode = themeService.getDarkMode()();
    this.loadTaskCounts();
  }

  private loadTaskCounts(): void {
    const tasksJson = localStorage.getItem('tasks');
    if (tasksJson) {
      const tasks: Task[] = JSON.parse(tasksJson);
      this.activities = this.activities.map(activity => ({
        ...activity,
        taskCount: tasks.filter((t: Task) => t.activity === activity.type).length
      }));
    }
  }

  selectActivity(activity: ActivityType): void {
    sessionStorage.setItem('selectedActivity', activity);
    this.router.navigate(['/task-details']);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
