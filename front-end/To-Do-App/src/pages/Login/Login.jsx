import Nav_bar from "../../components/navbar/Navbar";
import LoginForm from "../../components/loginForm/LoginForm";
export default function Login() {
  return (
    <>
      <Nav_bar isLogin={false} />
      <div className="vh-100">
        <LoginForm />
      </div>
    </>
  )
}
