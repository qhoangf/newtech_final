import { lazy } from 'react';
import Loadable from 'app/components/common/others/Loadable';

const Topic = Loadable(lazy(() => import('./Topic')));
const Teacher = Loadable(lazy(() => import('./Teacher')));
const Student = Loadable(lazy(() => import('./Student')));

const adminRoutes = [
  { path: '/admin/topic', element: <Topic /> },
  { path: '/admin/teacher', element: <Teacher /> },
  { path: '/admin/student', element: <Student /> },
];

export default adminRoutes;
