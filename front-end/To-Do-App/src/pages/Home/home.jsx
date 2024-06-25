import Navbar from "../../components/navbar/Navbar"
import Dashbord from "../../components/dashbord/dashbord"
export default function home() {
  return (
    <div>
      <Navbar isLogin={true} />
      <Dashbord/>
    </div>
  )
}
