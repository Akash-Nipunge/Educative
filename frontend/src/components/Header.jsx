import { useEffect, useState } from "react";
import { VscTriangleDown } from "react-icons/vsc";
import { Link, useLocation, useNavigation, useParams } from "react-router-dom";
export default function Header() {
  const {user} = useParams()
  const location = useLocation()
  const [name,setName] = useState("")
  const [menu,setMenu] = useState(false)
  useEffect(()=>{
    const localName = localStorage.getItem("name");
    setName(localName)
  },[]) 
  function HandleLogOut(){
      localStorage.removeItem("token")
      window.location.reload()
  }
  //console.log(location)
  return (
    <>
      <nav className="max-sm:px-4 lg:px-8 w-full px-18 py-1 sticky top-0 z-50 shadow-md bg-white">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            {/* <img src={img} className="" alt="Logo" width="150px"/> */}
            <h1 className="text-2xl font-mono max-sm:text-xl">Educative</h1>
          </div>
          {(location.pathname.includes("login") || location.pathname.includes("register") || location.pathname === '/') ? <div className="flex gap-8 max-sm:gap-3">
            <button className="px-3 py-2 rounded-lg border-transparent text-white text-base bg-violet-900 hover:bg-violet-900 max-sm:py-2 max-sm:px-2 max-sm:text-sm">
              <Link to="/user/login">Login</Link>
            </button> 
          </div> : <> <div className="flex gap-1 items-center cursor-pointer" onClick={(e)=>setMenu((curr)=>!curr)}>{name.toUpperCase()} <VscTriangleDown/></div>
          {menu && <div className="flex gap-2 max-sm:gap-3 absolute right-0 bg-gray-600 p-4 top-full px-8 rounded-md z-50" >
            <button className="px-3 py-2 rounded-lg border-transparent text-white text-base bg-violet-900 hover:bg-violet-950 max-sm:py-2 max-sm:px-2 max-sm:text-sm">
              <Link to={`/${user}/class/student/search`+location.search}>result</Link>
            </button> 
            <button className="px-3 py-2 rounded-lg border-transparent text-whitetext-base text-white bg-violet-900 hover:bg-violet-950 max-sm:py-2 max-sm:px-2 max-sm:text-sm"
            onClick={(e)=>HandleLogOut(e)}
            >
              Logout
            </button>
            </div>
          }
            </>
          }
        </div>
      </nav>
    </>
  );
}
