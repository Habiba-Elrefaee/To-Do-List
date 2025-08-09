import { Routes } from '@angular/router';
import { TaskManagerComponent } from './components/task-manager/task-manager.component';
import { ActivitySelectionComponent } from './components/activity-selection/activity-selection.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';

export const routes: Routes = [
    { 
        path: '', 
        component: TaskManagerComponent 
    },
    { 
        path: 'select-activity', 
        component: ActivitySelectionComponent 
    },
    { 
        path: 'task-details', 
        component: TaskDetailsComponent 
    },
    { 
        path: '**', 
        redirectTo: '' 
    }
];
