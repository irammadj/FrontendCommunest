import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import EstateDetailPage from './pages/EstateDetailPage';
import HouseDetailPage from './pages/HouseDetailPage';
import EstatePage from './pages/EstatePage';
import AboutPage from './pages/AboutPage';
import ListEstatePage from './pages/ListEstatePage';
import ProfilePage from './pages/ProfilePage';
import SignInPage from './pages/SignInPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: 'explore', Component: ExplorePage },
      { path: 'explore/:estateId', Component: EstateDetailPage },
      { path: 'explore/:estateId/house/:houseId', Component: HouseDetailPage },
      { path: 'estate', Component: EstatePage },
      { path: 'about', Component: AboutPage },
      { path: 'list-estate', Component: ListEstatePage },
      { path: 'profile', Component: ProfilePage },
      { path: 'signin', Component: SignInPage },
    ],
  },
], {
  basename: '/FrontendCommunest/',
});
