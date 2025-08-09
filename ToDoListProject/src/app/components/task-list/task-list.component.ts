import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models/task';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  @Output() deleteTask = new EventEmitter<number>();
  @Output() toggleTask = new EventEmitter<number>();
  @Output() editTask = new EventEmitter<{ id: number; title: string }>();

  editingTask: { id: number; title: string } | null = null;
  today: Date = new Date();

  startEditing(task: Task): void {
    this.editingTask = { id: task.id, title: task.title };
  }

  saveEdit(): void {
    if (this.editingTask && this.editingTask.title.trim()) {
      this.editTask.emit(this.editingTask);
      this.editingTask = null;
    }
  }

  cancelEdit(): void {
    this.editingTask = null;
  }
}