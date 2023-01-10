import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import { authRouters, publicRouters } from '../routes'
import MainPage from '../pages/MainPage'
import { Context } from "../index";
import { observer } from 'mobx-react-lite'

const AppRouter = observer(()=>{
    const {user} = useContext(Context)
    return(
        <Routes>
            {user.isAuth && authRouters.map(({path, Component})=>{
                return(
                    <Route key={path} path={path} element={<Component/>} exact/>
                )
            })}
            {publicRouters.map(({path, Component})=>{
                return(
                    <Route key={path} path={path} element={<Component/>} exact/>
                )
            })}
            <Route path="*" element={<MainPage/>} exact/>
        </Routes>
    )
})

export default AppRouter