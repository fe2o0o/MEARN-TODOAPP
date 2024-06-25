import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './loginForm.css';
import axios from 'axios'
import { validateEmail } from '../../utils/emailValidations';
export default function LoginForm() {

    const navigate = useNavigate()
    
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    })

    const [loginFormError, setLoginFormError] = useState({
        emailErr: null,
        passwordErr: null,
        globalError: null
    })

    const handleChanges = (e) => {
        const fieldName = e.target.name;
        switch (fieldName) {
            case 'email':
                setLoginForm({ ...loginForm, email: e.target.value })
                setLoginFormError({
                    ...loginFormError,
                    emailErr: e.target.value.trim().length == 0 ? "Email is Required" : !validateEmail(e.target.value) ? "Please Enter a Vaild Email" : null,
                    globalError:null
                })
                break;
            case 'password':
                setLoginForm({ ...loginForm, password: e.target.value })
                setLoginFormError({
                    ...loginFormError,
                    passwordErr: e.target.value.trim().length == 0 ? "Password is Required" : null,
                    globalError:null
                })
                break;
            default:
                break;
        }
    }


    const handleLogin = (e) => {
        e.preventDefault()
        if (loginForm.email.trim().length == 0 || loginForm.password.trim().length ==0) {
            return setLoginFormError({...loginFormError , globalError:"All Data Is Required"})
        } else if (!validateEmail(loginForm.email)) {
            return setLoginFormError({ ...loginForm, emailErr: "Enter Vaild Email" })
        }

        axios.post('http://localhost:3000/api/v1/auth/login', loginForm).then((res) => {
            localStorage.setItem('Token', `${res.data.token}`);
            navigate('/dashbord')
            
        }).catch((err) => {
            setLoginFormError({ ...loginForm, globalError: err.response.data.message })
        })
    }

    return (
        <>
            <div className="container h-100 d-flex justify-content-center align-items-center">
                <div className="form border p-3 rounded-3 shadow">
                    <h2 className="text-center">Login </h2>
                    <p className='text-center text-danger fw-bolder'>{ loginFormError.globalError }</p>
                    <form action="" method='post'>
                        <div className="form-group mb-4">
                            <label className="mb-2" htmlFor="email">Email <span className="text-danger">*</span></label>
                            <input name='email' onChange={handleChanges} className="form-control" type="email" id="email" />
                            <p className='text-danger fw-bold'>{loginFormError.emailErr }</p>
                        </div>
                        <div className="form-group mb-4">
                            <label className="mb-2" htmlFor="password">Password <span className="text-danger">*</span></label>
                            <input onChange={handleChanges} name='password' className="form-control" type="password" id="password" />
                            <p className='text-danger fw-bold'>{loginFormError.passwordErr}</p>
                        </div>
                        <button disabled={loginForm.email.trim().length == 0 || loginForm.password.trim().length == 0} onClick={handleLogin} className="btn btn-primary w-100">Login</button>
                    </form>
                </div>
            </div>
        </>
    );
}
