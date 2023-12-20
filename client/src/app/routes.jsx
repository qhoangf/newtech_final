import { lazy } from 'react';
import Loadable from './components/common/others/Loadable';
import MatxLayout from './components/MatxLayout/MatxLayout';
import materialRoutes from 'app/views/material-kit/MaterialRoutes';
import adminRoutes from 'app/views/admin/AdminRoutes';
import studentRoutes from 'app/views/student/StudentRoutes';
import teacherRoutes from 'app/views/teacher/TeacherRoutes';
import App from 'app/AppIndex';

// session pages
const NotFound = Loadable(lazy(() => import('app/views/sessions/NotFound')));
const Signin = Loadable(lazy(() => import('app/views/sessions/Signin')));

// echart page
const AppEchart = Loadable(lazy(() => import('app/views/charts/echarts/AppEchart')));

// dashboard page
const Analytics = Loadable(lazy(() => import('app/views/system/Analytics')));

const routes = [
  {
    element: (
        <MatxLayout />
    ),
    children: [
      // EXPAND FLOW
      ...adminRoutes,
      ...studentRoutes,
      ...teacherRoutes,

      // BASIC FLOW
      ...materialRoutes,
      // dashboard route
      {
        path: '/system/default',
        element: <Analytics />,
      },

      // e-chart rooute
      {
        path: '/charts/echarts',
        element: <AppEchart />,
      }
    ]
  },

  // session pages route
  { path: '/session/404', element: <NotFound /> },
  { path: '/session/signin', element: <Signin /> },

  { path: '/', element: <App /> },
  { path: '*', element: <NotFound /> }
];

export default routes;
