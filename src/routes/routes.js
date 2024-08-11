import config from '~/config';

// Layouts
import DefaultLayout from '~/layouts/DefaultLayout';

// Page Components
import Home from '~/pages/Home';
import CartPage from '~/pages/CartPage';
import TodayDeal from '~/pages/TodayDeal';
import UserInfo from '~/pages/UserInfo';
import Search from '~/pages/Search';

// Public Routes
const publicRoutes = [
    { path: config.routes.home, component: Home, layout: DefaultLayout },
    { path: config.routes.cartPage, component: CartPage, layout: DefaultLayout },
    { path: config.routes.todayDeal, component: TodayDeal, layout: DefaultLayout },
    { path: config.routes.userInfo, component: UserInfo, layout: DefaultLayout },
    { path: config.routes.search, component: Search, layout: DefaultLayout },
];

// Private Routes
const privateRoutes = [];

export { publicRoutes, privateRoutes };
