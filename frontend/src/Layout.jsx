import { Outlet, useLocation } from "react-router-dom"
import Header from "./components/Header.jsx"
import Footer from "./components/Footer.jsx"
export default function Layout(){
    const location = useLocation()
    return(
        <div className="flex flex-col relative bg-white">
        {location.pathname!='/' && <Header/>}
        <Outlet/>
        {/* <Footer/> */}
        </div>
    )
}