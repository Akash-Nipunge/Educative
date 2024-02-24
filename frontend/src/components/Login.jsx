import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import studetnLoginImage from "/images/studentLogin.png";
import CustomSpinner from "./CustomSpinner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  async function HandleSubmit(e) {
    e.preventDefault();
    setLoading(true);
      await axios
        .post("https://educative-backend.onrender.com/api/v1/user/student/signin", {
          email,
          password,
        })
        .then((res) => {
          //console.log("got the response!!",res)
          setLoading(false);
          res.data ? localStorage.setItem("token", res.data.token) : null;
          navigate(`/student/class`);
          return;
        })
        .catch((err) => {
          (async ()=>{
            await axios
            .post("https://educative-backend.onrender.com/api/v1/user/teacher/signin", {
              email,
              password,
            })
            .then((res) => {
              setLoading(false);
              res.data ? localStorage.setItem("token", res.data.token) : null;
              if(res.data.role == 'admin')
              navigate('/main/admin')
              else
              navigate(`/teacher/class`);
            })
            .catch((err) => {
              setLoading(false);
              //console.log(err)
              setError(err.response ? err.response.data.message : "something went wrong!");
            });
          })();
        });
  }

  return (
    <>
    {loading ? <CustomSpinner/> : <>
    <div className="flex gap-18 justify-center max-sm:flex-col">
      <div className="flex gap-1 w-fit align-middle flex-col items-center bold my-8 text-3xl font-medium max-sm:text-2xl max-sm:m-auto">
        <img src={studetnLoginImage} alt="" width="90%" />
      </div>
      <div className="max-lg:w-1/2 max-sm:w-4/5 h-fit my-auto w-1/3 max-sm:m-auto">
        <form onSubmit={(e) => HandleSubmit(e)} className="flex flex-col">
          <input
            type="email"
            placeholder="Email"
            autoFocus
            value={email}
            required
            className="mt-1 block w-full px-3 py-4 bg-transparent border border-violet-400 rounded-md text-sm shadow-sm placeholder-slate-400
    focus:outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            value={password}
            placeholder="Password"
            required
            className="mt-1 block w-full px-3 py-4 bg-transparent border border-violet-400 rounded-md text-sm shadow-sm placeholder-slate-400
    focus:outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="mt-1 w-1/3 px-3 py-4 border border-violet-900 rounded-md text-sm shadow-sm  text-white bg-violet-900 hover:bg-violet-950 self-end"
          >
            Login
          </button>
        </form>
      </div>
      <div className="w-full bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-200 absolute z-50 h-full bg-opacity-70" style={{top:error?'0%':'-200%'}}>
        <div className="w-fit p-4 text-gray-500 m-auto mt-14 rounded-lg flex flex-col">
           <h3 className="text-center text-xl">{error}</h3>
           <button className="bg-violet-900 px-4 py-2 rounded-lg w-fit m-auto mt-3 text-white" onClick={()=>{
            setError("");
            }}>Close</button>
        </div>
      </div>
    </div>
    </>
  }
  </>
  );
}
