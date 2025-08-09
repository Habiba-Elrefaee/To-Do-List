export type ActivityType = 'Idea' | 'Food' | 'Work' | 'Sport' | 'Music';

export interface ActivityInfo {
  type: ActivityType;
  icon: string;
  taskCount: number;
  color: string;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  activity: ActivityType;
}