import React, { useContext, useState } from 'react'
import { MyContext } from '../App'
import { Button, Container, Form, Input } from 'semantic-ui-react'

export default function MyAccount() {
    const { token, setToken } = useContext(MyContext)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    async function doLogin() {
        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Content-Type": "application/json"
        }

        let bodyContent = JSON.stringify({
            "username": username,
            "password": password
        });

        let response = await fetch("http://localhost:4000/aut/login", {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });

        let data = await response.text();
        console.log(data);
        localStorage.setItem('token', JSON.stringify(data))
        setToken(data)
    }
    function doLogout() {
        setToken(null)
        localStorage.setItem('token', '')

    }
    return (
        <Container>
            {token ? <>
                user logged in
                <Button color='blue' onClick={doLogout}> Log Out</Button>
            </>
                :
                <>
                    user not logged in
                    <h2>Login FROM</h2>
                    <Form>
                        <Form.Input label="usernamme" value={username} onChange={e => setUsername(e.target.value)} />
                        <Form.Input label="password" value={password} onChange={e => setPassword(e.target.value)} />
                        <Button color='blue' onClick={doLogin}>Log In</Button>
                    </Form>
                </>}

        </Container>
    )
}
