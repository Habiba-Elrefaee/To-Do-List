import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivityType, ActivityInfo } from '../../models/task';

@Component({
  selector: 'app-task-input',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './task-input.component.html',
  styleUrl: './task-input.component.css'
})
export class TaskInputComponent {
  @Output() addTask = new EventEmitter<{title: string, activity: ActivityType}>();
  
  newTaskTitle = '';
  selectedActivity: ActivityType | null = null;

  activities: ActivityInfo[] = [
    { type: 'Idea', icon: 'lightbulb', taskCount: 12, color: '#B388FF' },
    { type: 'Food', icon: 'restaurant', taskCount: 9, color: '#FF80AB' },
    { type: 'Work', icon: 'work', taskCount: 14, color: '#82B1FF' },
    { type: 'Sport', icon: 'sports_basketball', taskCount: 5, color: '#B9F6CA' },
    { type: 'Music', icon: 'music_note', taskCount: 4, color: '#FFD180' }
  ];

  selectActivity(activity: ActivityType) {
    this.selectedActivity = activity;
  }

  onSubmit(): void {
    if (this.newTaskTitle.trim() && this.selectedActivity) {
      this.addTask.emit({
        title: this.newTaskTitle,
        activity: this.selectedActivity
      });
      this.newTaskTitle = '';
      this.selectedActivity = null;
    }
  }
}