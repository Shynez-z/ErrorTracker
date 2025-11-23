import { Routes } from '@angular/router';
import { TestListComponent } from './features/test-list/test-list.component';

export const routes: Routes = [
    { path: '', component: TestListComponent },
    { path: '**', redirectTo: '' }
];
