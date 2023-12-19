import { lazy } from 'react';
import Loadable from 'app/components/common/others/Loadable';

const MyTopic = Loadable(lazy(() => import('./MyTopic')));
const TopicList = Loadable(lazy(() => import('./TopicList')));

const teacherRoutes = [
  { path: '/teacher/topiclist', element: <TopicList /> },
  { path: '/teacher/mytopic', element: <MyTopic /> },
];

export default teacherRoutes;
