import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button, Container, Form} from "react-bootstrap";

export default function Register() {
    const serverUrl = 'http://localhost:8000/'

    const [isCsrf, setIsCsrf] = useState(null)
    const [isLogin, setIsLogin] = useState('')
    const [isPassword, setIsPassword] = useState('')
    const [isEmail, setisEmail] = useState('')
    const [isError, setIsError] = useState(null)
    const [isAuth, setIsAuth] = useState(false)

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
            if (csrftoken) {setIsAuth(true)}

        } catch (e) {
            setIsAuth(false)
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


    const registration = () => {
        const data = {username: isLogin, password: isPassword, email: isEmail}
        axios.post(serverUrl + 'api/register/', data)
            .then((res) => {
                isResponseOk(res);
                getCSRF()
                setIsAuth(true);
                setIsError(null);
                document.cookie = 'loginInfo=' + res.data.data.user_id;
                window.location.href('/')


            })
            .catch((err) => {
                console.error(err);
                setIsError("Неверные данные")
            });
    }

    function changePassword(e) {
        setIsPassword(e.target.value)
    }

    function changeLogin(e) {
        setIsLogin(e.target.value)
    }
    function changeEmail(e) {
        setisEmail(e.target.value)
    }

    function submitForm(e) {
        e.preventDefault()
        registration()
    }

    return (
        <Container className={'form-auth'}>{
            !isAuth ?
                <Form className={'card-registration'}>
                    <Form.Label className={'label-auth'}>Email</Form.Label>
                    <Form.Control
                        type='email'
                        className='input-auth'
                        onChange={changeEmail}
                        value={isEmail}
                    />
                    <Form.Label  className={'label-auth'}>Логин</Form.Label>
                    <Form.Control
                        type="tel"
                        name="phone"
                        id="phone"
                        className='input-auth'
                        onChange={changeLogin}
                        value={isLogin}
                    />

                    <Form.Label  className={'label-auth'}>Пароль</Form.Label>
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

                    <Button type="link" onClick={submitForm} className='auth-btn'>Зарегистрироваться</Button>
                </Form>
                :
                <div className='{style.btnContainer}'>
                    Вы Зарегистрированы
                </div>

        }
        </Container>
    )
}