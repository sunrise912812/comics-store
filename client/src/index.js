import React, {createContext} from "react";
import ReactDOM from 'react-dom/client';
import App from "./App";
import ComicStore from './store/ComicStore'
import BanerStore from './store/BanerStore'
import UserStore from "./store/UserStore";
import BasketStore from './store/BasketStore'
import OrderStore from './store/OrderStore'

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Context.Provider value={{ user : new UserStore(), basket : new BasketStore(), baner : new BanerStore(), comic : new ComicStore(), order : new OrderStore() }}>
        <App/>
    </Context.Provider>
);