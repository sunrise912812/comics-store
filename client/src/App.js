import React, {useContext, useEffect, useState} from 'react'
import { BrowserRouter } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import AppRouter from './components/AppRouter'
import MyNavbar from './components/UI/MyNavbar/MyNavbar'
import FooterBar from './components/UI/FooterBar/FooterBar'
import { Context } from "./index";
import { check } from "./http/userAPI";
import { Spinner } from 'react-bootstrap'
import { fetchBasket, fectBasketCountComics } from './http/basketAPI'

const App = observer(()=>{
    const {user, basket} = useContext(Context)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
    if (localStorage.getItem('token')){
        check().then(data=>{
            user.setUser(data)
            user.setIsAuth(true)
            fetchBasket().then(data=>{
                basket.setBasket(data)
                fectBasketCountComics().then(data=>{
                    basket.setCountBasketComics(data)
                  })
            })
        }).finally(()=>setIsLoading(false))
    }
    else{
        setIsLoading(false) 
    }
    },[])

    if (isLoading){
        return (
            <div style={{ display: 'flex', alignItems : 'center', justifyContent : 'center', margin : '50px' }}>
                        <Spinner animation="border" variant="primary" />
            </div>)
      }

    return(
        <BrowserRouter>
            <MyNavbar/>
            <AppRouter/>
            <FooterBar/>
        </BrowserRouter>
    )
})

export default App