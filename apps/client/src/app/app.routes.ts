import { Home } from '@/pages/home/home';
import { NotFound } from '@/pages/not_found/not-found';
import { Notice } from '@/pages/notice/notice';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'notice',
    component: Notice,
  },
  {
    path: '**',
    component: NotFound,
  },
];
