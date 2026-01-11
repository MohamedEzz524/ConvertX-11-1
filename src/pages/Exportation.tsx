import Book from './Book';
import GetHired from './GetHired';
import Warn from './Warn';
import Hire from './Hire';
import Home from './home';
import type { RouteObject } from 'react-router-dom';

type ExtendedRoute = RouteObject & {
  title: string;
};

const routes: ExtendedRoute[] = [
  {
    path: '/',
    title: 'Home',
    element: <Home />,
  },
  {
    path: '/getting-started',
    title: 'Start Process',
    element: <Hire />,
  },
  {
    path: '/discovery-call',
    title: 'Discovery Call',
    element: <GetHired />,
  },
  {
    path: '/disqualified',
    title: 'Not Qualified Yet',
    element: <Warn />,
  },
  {
    path: '/book-consultation',
    title: 'Consultation Booking',
    element: <Book />,
  },
];

export default routes;
