import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import * as m from '@/pages';
import * as ld from '@/pages/loaders';
import { store } from './store';

const router = createBrowserRouter([
  {
    path: '/',
    element: <m.WbLayout />,
    children: [
      { index: true, element: <m.WbHome /> },
      { path: 'products', element: <m.WbProductList /> },
    ],
  },
  { path: '/admin/sign-in', element: <m.AppSignin /> },
  {
    path: '/admin',
    element: <m.AppLayout />,
    loader: ld.appLayoutLoader(store),
    children: [
      { path: 'dashboard', element: <m.AppDashboard /> },
      {
        path: 'settings',
        children: [
          { path: 'categories', element: <m.AppListCategories /> },
          {
            path: 'sub-categories',
            element: <m.AppAddListSubcategories />,
            loader: ld.appSubcategoryLoader(store),
          },
          { path: 'products', element: <m.AppListProducts /> },
          {
            path: 'product/:slug?',
            element: <m.AppAddEditProduct />,
            loader: ld.appProductLoader,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
