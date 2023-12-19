import { lazy } from 'react';
import Loadable from 'app/components/common/others/Loadable';

const MyTopic = Loadable(lazy(() => import('./MyTopic')));
const TopicList = Loadable(lazy(() => import('./TopicList')));

const studentRoutes = [
  { path: '/student/topiclist', element: <TopicList /> },
  { path: '/student/mytopic', element: <MyTopic /> },
];

export default studentRoutes;
