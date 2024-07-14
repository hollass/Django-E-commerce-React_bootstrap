import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button, Container, Form} from "react-bootstrap";
import {redirect} from "react-router-dom";

export default function Login() {
    const serverUrl = 'http://localhost:8000/'

    const [isCsrf, setIsCsrf] = useState(null)
    const [isLogin, setIsLogin] = useState('')
    const [isPassword, setIsPassword] = useState('')
    const [isError, setIsError] = useState(null)
    const [isAuth, setIsAuth] = useState(false)
    const [name, setname] = useState('')

    useEffect(() => {
        getCsrfs()
        // getSession()
    }, [])

    const isResponseOk = (res) => {
        if (!(res.status >= 200 && res.status <= 299)) {
            throw Error(res.statusText);
        }
    }

    const getCsrfs = () => {
        try {
            const csrftoken = document.cookie.split('; ')
                .find(row => row.startsWith('csrftoken=')).split('=')[1];
            setIsCsrf(csrftoken);
            setIsAuth(true)

        } catch (e) {
            console.error(e)
        }

    }
    // Если необходимо авторизоваться, запрашиваем CSRF-токен у сервера
    const getCSRF = () => {
        axios.get(serverUrl + 'api/csrf/', {withCredentials: true})
            .then((res) => {
                isResponseOk(res);

                const csrfToken = res.headers.get('X-CSRFToken');
                setIsCsrf(csrfToken);
                return csrfToken;
            })
            .catch((err) => console.error(err))
    }


    // Полученный CSRF-токен пихаем в заголовок и отправляем серверу
    const login = () => {
        const data = {username: isLogin, password: isPassword}
        axios.post(serverUrl + 'api/login/', data)
            .then((res) => {
                isResponseOk(res);
                getCSRF()
                setIsAuth(true);
                setname(data.username);
                setIsError(null);
                document.cookie = 'loginInfo=' + isLogin;
                window.location.href('/')


            })
            .catch((err) => {
                console.error(err);
                setIsError("Неверные данные")
            });
    }
    const logout = () => {
        fetch('http://localhost:8000/api/logout/', {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-CSRFToken': isCsrf,
            },
        })
            .then((response) => {
                setIsAuth(false);
                setIsCsrf(null);
                document.cookie = "csrftoken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
                document.cookie = "loginInfo=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";


            })
            .catch((error) => {
                setIsError('Ошибка при выходе');
            })


    }

    const userInfo = () => {
        try {
            const nameInfo = document.cookie.split(';')
                .find(row => row.startsWith('loginInfo=')).split('=')[1];
            return nameInfo;
        } catch {
            document.cookie = "csrftoken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
        }

    }


    function changePassword(e) {
        setIsPassword(e.target.value)
    }

    function changeLogin(e) {
        setIsLogin(e.target.value)
    }

    function submitForm(e) {
        e.preventDefault()
        login()
    }

    return (
        <Container className={'form-auth'}>{
            isAuth === false ?
                <Form>
                    <Form.Label className={'label-auth'}>Логин</Form.Label>
                    <Form.Control
                        type="text"
                        name="login"
                        id="login"
                        className='input-auth'
                        onChange={changeLogin}
                        value={isLogin}
                    />

                    <Form.Label className={'label-auth'}>Пароль</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        id="password"
                        className='input-auth'
                        onChange={changePassword}
                        value={isPassword}
                    />

                    {
                        isError ? <div className='{style.error}'>{isError}</div> : null
                    }

                    <Button type="link" href={'/logins'} onClick={submitForm}
                            className='auth-btn'> Войти</Button>
                </Form>
                :
                <div>
                    <Form>
                        Вы -
                        <Form.Label className='input-auth'>
                            {
                                isCsrf ? ' ' + userInfo() : ' неавторизованы'
                            }
                        </Form.Label>

                    </Form>
                    <Button type="link" href={'/login'} onClick={logout} className='auth-btn'>Выйти
                    </Button>
                </div>
        }
        </Container>
    )
}
