import config from '~/config';

// Layouts
import DefaultLayout from '~/layouts/DefaultLayout';

// Page Components
import Home from '~/pages/Home';
import CartPage from '~/pages/CartPage';
import TodayDeal from '~/pages/TodayDeal';
import UserInfo from '~/pages/UserInfo';
import Search from '~/pages/Search';
import ViewProduct from '~/pages/ViewProduct';
import CheckoutPage from '~/pages/CheckoutPage';
import OrderPage from '~/pages/OrderPage';

// Public Routes
const publicRoutes = [
    { path: config.routes.home, component: Home, layout: DefaultLayout },
    { path: config.routes.cartPage, component: CartPage, layout: DefaultLayout },
    { path: config.routes.todayDeal, component: TodayDeal, layout: DefaultLayout },
    { path: config.routes.userInfo, component: UserInfo, layout: DefaultLayout },
    { path: config.routes.search, component: Search, layout: DefaultLayout },
    { path: config.routes.viewProduct, component: ViewProduct, layout: DefaultLayout },
    { path: config.routes.checkout, component: CheckoutPage },
    { path: config.routes.order, component: OrderPage, layout: DefaultLayout },
];

// Private Routes
const privateRoutes = [];

export { publicRoutes, privateRoutes };
