import Navbar from '../../components/navbar/Navbar';
import SignUpForm from '../../components/signUpForm/SignUpForm';
export default function SignUp() {
  return (
    <>
      <Navbar isLogin={false} />
      <div className="vh-100">
        <SignUpForm />
      </div>
    </>
  )
}
