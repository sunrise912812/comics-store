import AdminPage from "./pages/AdminPage";
import BasketPage from "./pages/BasketPage";
import AuthPage from "./pages/AuthPage";
import ComicOnePage from './pages/ComicOnePage'
import MainPage from './pages/MainPage'
import OrderOnePage from './pages/OrderOnePage'
import OrderPage from './pages/OrderPage'
import ShopPage from './pages/ShopPage'
import OrderingPage from "./pages/OrderingPage"
import ContactsPage from "./pages/ContactsPage"
import HeplPage from "./pages/HelpPage"
import { ADMIN_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE, BASKET_ROUTE, COMIC_ROUTE, ORDER_ROUTE, MAIN_ROUTE, ORDERING_ROUTE, CONTACT_ROUTE, HELP_ROUTE } from "./utils/consts";


export const authRouters = [
    { 
        path : ADMIN_ROUTE,
        Component : AdminPage
    },
    {
        path : BASKET_ROUTE,
        Component : BasketPage
    },
    {
        path : ORDER_ROUTE,
        Component : OrderPage
    },
    {
        path : ORDER_ROUTE + '/:id',
        Component : OrderOnePage
    },
    {
        path : ORDERING_ROUTE,
        Component : OrderingPage
    }
]

export const publicRouters = [
    {
        path : MAIN_ROUTE,
        Component : MainPage
    },
    {
        path : SHOP_ROUTE,
        Component : ShopPage
    },
    {
        path : REGISTRATION_ROUTE,
        Component : AuthPage
    },
    {
        path : LOGIN_ROUTE,
        Component : AuthPage
    },
    {
        path : COMIC_ROUTE + '/:id',
        Component : ComicOnePage
    },
    {
        path : CONTACT_ROUTE,
        Component : ContactsPage
    },
    {
        path : HELP_ROUTE,
        Component : HeplPage
    }
]