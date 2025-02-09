import { useState } from "react"
import { login, signup } from "../store/actions/user.action.js"



function getEmptyCredentials() {
    return {
        fullname: '',
        username: '',
        password: '',
    }
}
export function Login() {



    const [credentials, setCredentials] = useState(getEmptyCredentials())
    const [isSignupState, setIsSignupState] = useState(false)

    function handleCredentialsChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials((prevCreds) => ({ ...prevCreds, [field]: value }))
    }

    async function onSubmit(ev) {
        ev.preventDefault()
        const method = isSignupState ? signup : login
        try {
            const user = awaitmethod(credentials)
            console.log(`Welcome ${user.fullname}`)
        }
        catch (err) {
            console.error('OOps try again')
        }

    }
    return (
        <>
            <form action="" onSubmit={onSubmit}>
                <label htmlFor="">userName</label>
                <input onChange={handleCredentialsChange} type="text" name="username" />

                <label htmlFor="">password</label>
                <input onChange={handleCredentialsChange} type="password" name="password" />

                {isSignupState && (<><label htmlFor="fullname">full name</label ><input onChange={handleCredentialsChange} type='text' name="fullname" /></>)}
                <button type="submit">submit</button>
            </form>
            <button onClick={() => setIsSignupState(!isSignupState)}>{isSignupState ? 'login' : 'singUp'}</button>
        </>
    )
}