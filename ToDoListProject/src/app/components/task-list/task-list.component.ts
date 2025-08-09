import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models/task';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

/**
 * Component responsible for displaying the list of tasks.
 * Handles task display, editing, and emits events for task operations.
 */
@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  // Input property to receive tasks from parent component
  @Input() tasks: Task[] = [];
  // Event emitters to notify parent component of task operations
  @Output() deleteTask = new EventEmitter<number>();
  @Output() toggleTask = new EventEmitter<number>();
  @Output() editTask = new EventEmitter<{ id: number; title: string }>();

  // Track the currently being edited task
  editingTask: { id: number; title: string } | null = null;
  today: Date = new Date();

  // Start editing a specific task
  startEditing(task: Task): void {
    this.editingTask = { id: task.id, title: task.title };
  }

  // Save the edited task and emit the change
  saveEdit(): void {
    if (this.editingTask && this.editingTask.title.trim()) {
      this.editTask.emit(this.editingTask);
      this.editingTask = null;
    }
  }

  // Cancel the current task edit
  cancelEdit(): void {
    this.editingTask = null;
  }
}