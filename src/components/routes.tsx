import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '@components/Layout';
import UserList from '@pages/UserList';
import UserDetails from '@pages/UserDetails';
import UserCreate from '@pages/UserCreate';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Navigate to='/users' /> },
      { path: '/users', element: <UserList /> },
      { path: `/users/:id`, element: <UserDetails /> },
      { path: `/users/create`, element: <UserCreate /> },
    ],
  },
]);
