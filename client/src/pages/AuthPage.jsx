import React, {useContext, useState} from 'react'
import { Container, Card, Form, Button, Stack } from 'react-bootstrap'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { REGISTRATION_ROUTE, LOGIN_ROUTE, MAIN_ROUTE } from '../utils/consts'
import { registration, login } from '../http/userAPI'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'
import { fetchBasket, fectBasketCountComics } from '../http/basketAPI'


const AuthPage = observer(()=>{
    const {user, basket} = useContext(Context)
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const history = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const clickAuth = async ()=>{
        try{
            if(isLogin){
                login(email, password).then(data=>{
                    user.setUser(data)
                    user.setIsAuth(true)
                    fetchBasket().then(data=>{
                        basket.setBasket(data)
                        fectBasketCountComics().then(data=>{
                            basket.setCountBasketComics(data)
                          })
                    })
                }).finally(()=>history(MAIN_ROUTE))
            }
            else{
                registration(email, password).then(data=>{
                    user.setUser(data)
                    user.setIsAuth(true)
                    fetchBasket().then(data=>{
                        basket.setBasket(data)
                        fectBasketCountComics().then(data=>{
                            basket.setCountBasketComics(data)
                          })
                    })
                }).finally(()=>history(MAIN_ROUTE))
            }
        }
        catch(e){
            alert(e.response.data.message)
        }
    }
    return(
        <Container className="d-flex justify-content-center align-items-center" style={{
            height : window.innerHeight - 54}}>
                <Card style={{ width: '600px' }} className="p-5">
                    <h2>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                    <Form className="d-flex flex-column">
                        <Form.Control className="mt-3"
                        placeholder="Введите email.."
                        value={email}
                        onChange={e=>setEmail(e.target.value)}/>
                        <Form.Control className="mt-3 mb-3"
                        placeholder="Введите пароль.."
                        value={password}
                        onChange={e=>setPassword(e.target.value)}
                        type="password"/>
                        <Stack direction="horizontal" gap={2}>
                            {isLogin
                            ?
                            <div>Нет акаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся</NavLink></div>
                            :
                            <div>Есть акаунта? <NavLink to={LOGIN_ROUTE}>Войдите</NavLink></div>
                            }
                        </Stack>
                        <Button variant="outline-primary" className="mt-3 ms-auto" onClick={clickAuth}>{isLogin ? 'Войти' : 'Регистрация'}</Button>
                    </Form>
                </Card>

        </Container>
    )
})

export default AuthPage