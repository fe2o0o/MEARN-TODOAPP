import { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/emailValidations";
export default function SignUpForm() {
    

    const navigate = useNavigate()

    const [registerForm, setRegisterForm] = useState({
        name: '',
        email: "",
        password:""
    })

    const [formError, setFormError] = useState({
        nameErr: null,
        emailErr: null,
        passwordErr: null,
        globalError : null
    })



    

    const handleRegisterChanges = (e) => {
        const fieldName = e.target.name
        switch (fieldName) {
            case 'name':
                setRegisterForm({ ...registerForm, name: e.target.value })
                setFormError({
                    ...formError,
                    nameErr: e.target.value.trim().length === 0 ? "Name Is Required" : null,
                    globalError:null
                })
                break;
            case 'email':
                setRegisterForm({ ...registerForm, email: e.target.value })
                setFormError({
                    ...formError,
                    emailErr: e.target.value.trim().length === 0 ? "Email Is Required" : !validateEmail(e.target.value) ? "Please Enter Vaild Email" : null,
                    globalError: null
                })
                break;
            case 'password':
                setRegisterForm({ ...registerForm, password: e.target.value })
                setFormError({
                    ...formError,
                    passwordErr: e.target.value.trim().length === 0 ? "password is required" : null,
                    globalError: null
                })
                break;
            default:
                break;
        }
    }


    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        if (registerForm.name.trim().length === 0 || registerForm.email.trim().length === 0 || registerForm.password.trim().length === 0 ) {
            return setFormError({...formError , globalError:"All Data Is Required"})
        } else if (!validateEmail(registerForm.email)) {
            return setFormError({...formError , emailErr:"Enter Vaild Email"})
        }

        axios.post('http://localhost:3000/api/v1/auth/signup', registerForm).then((res) => {
            if (res.status == 201) {
                
                navigate('/login')
            } else {
                setFormError({ ...formError, globalError:"Server Error"})
            }
        }).catch((err) => {
            setFormError({ ...formError, globalError: err.response.data.message })
        })

    }

    return (
        <>
            <div className="container h-100 d-flex justify-content-center align-items-center">
                <div className="form border p-3 rounded-3 shadow">
                    <h2 className="text-center">Register </h2>
                    <p className="text-center text-danger fw-bold">{ formError.globalError }</p>
                    <form method="post">
                        <div className="form-group mb-4">
                            <label className="mb-2" htmlFor="name">Name <span className="text-danger">*</span></label>
                            <input name="name" onChange={handleRegisterChanges} type="text" id="name"  className={ `form-control ${formError.nameErr && 'border-danger' }`} />
                            <small className="text-danger fw-bold">{ formError.nameErr }</small>
                        </div>
                        <div className="form-group mb-4">
                            <label className="mb-2" htmlFor="email">Email <span className="text-danger">*</span></label>
                            <input name="email" onChange={handleRegisterChanges} className={`form-control ${formError.emailErr && 'border-danger'}`} type="email" id="email" />
                            <small className="text-danger fw-bold">{formError.emailErr}</small>
                        </div>
                        <div className="form-group mb-4">
                            <label className="mb-2" htmlFor="password">Password <span className="text-danger">*</span></label>
                            <input name="password" onChange={handleRegisterChanges} className={`form-control ${formError.passwordErr && 'border-danger'}`} type="password" id="password" />
                            <small className="text-danger fw-bold">{formError.passwordErr}</small>
                        </div>
                        <button disabled={registerForm.name.trim().length == 0 || registerForm.email.trim().length ==0 || registerForm.password.trim().length ==0} onClick={handleRegisterSubmit} className="btn btn-primary w-100">Craete Account</button>
                    </form>
                </div>
            </div>
        </>
    )
}
