import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from './error-page';
import Root, { loader as rootLoader, action as rootAction } from './routes/root';
import Contact, { loader as contactLoader, action as setFavorite} from './routes/contacts';
import EditContact, { action as editAction } from './routes/edit';
import { action as deleteContact } from './routes/destroy';
import Index from './routes';
const route = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [{
      path: '/contacts',
      element: <Navigate to='/' replace />,
    },
    {
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Index /> },
        {
          path: "contacts/:contactId",
          element: <Contact />,
          loader: contactLoader,
          action: setFavorite,
        },
        {
          path: '/contacts/:contactId/edit',
          element: <EditContact />,
          loader: contactLoader,
          action: editAction,
        },
        {
          path: '/contacts/:contactId/delete',
          errorElement: <p> Oops</p>,
          action: deleteContact,
        }]}
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={route} />
  </React.StrictMode>,
)
