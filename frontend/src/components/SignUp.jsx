import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import studetnLoginImage from "/images/studentLogin.png";
import CustomSpinner from "./CustomSpinner.jsx";
import emailIcon from "/images/emailIcon.png";
import CustomDialog from "./CustomDialog.jsx";

export default function SignUp() {
  const [firstName, setFirstname] = useState("");
  const [middleName, setMidlename] = useState("");
  const [lastName, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (user === "student") {
      await registerStudent();
      setLoading(false);
    } else if (user === "teacher") {
      await registerTeacher();
      setLoading(false);
    }
  };

  const registerStudent = async () => {
    try {
      const { response } = await axios.post(
        "http://localhost:4000/api/v1/user/student/signup",
        {
          firstName,
          middleName,
          lastName,
          email,
          password,
        }
      );
      setLoading(false);
      setMessage("User Registered Successfully!");
      setTimeout(() => {
        setMessage("");
      }, 1500);
      //console.log(response.data);
    } catch (error) {
      setLoading(false);
      if (error) {
        console.error(
          "Error occurred during registration:",
          error.response.data
        );
        setMessage("User registration failed. Please try again.");
        setTimeout(() => {
          setMessage("");
        }, 1500);
      } else {
        setMessage("User registration failed. Please try again.");
        setTimeout(() => {
          setMessage("");
        }, 1500);
      }
    }
  };

  const registerTeacher = async () => {
    await axios
      .post("http://localhost:4000/api/v1/user/teacher/signup", {
        firstName,
        middleName,
        lastName,
        email,
        password,
        degree: "phd",
      })
      .then(() => {
        setLoading(false);
        setMessage("User Registered Successfully!");
      setTimeout(() => {
        setMessage("");
      }, 1500);
        //console.log("User registered successfully");
      })
      .catch((err) => {
        setLoading(false);
        setMessage("User registration failed. Please try again.");
      setTimeout(() => {
        setMessage("");
      }, 1500);
      });
  };
  return (
    <>
      {message != "" ? <CustomDialog message={message} /> : <></>}
      {loading ? (
        <CustomSpinner />
      ) : (
        <>
          <div className="flex w-screen gap-18 justify-center max-sm:flex-col relative">
            <div className="flex gap-1 w-fit align-middle flex-col items-center bold my-8 text-3xl font-medium max-sm:text-2xl max-sm:m-auto">
              <img src={studetnLoginImage} alt="" width="100%" />
            </div>
            <div className="max-lg:w-1/2 max-sm:w-4/5 h-fit my-auto w-1/3 max-sm:m-auto">
              <form onSubmit={(e) => handleSubmit(e)}>
                <input
                  type="text"
                  placeholder="firstname"
                  value={firstName}
                  autoFocus
                  className="mt-1 block w-full px-3 py-2 bg-transparent border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
    focus:outline-none focus:border-slate-500  focus:ring-1 focus:slate-500"
                  onChange={(e) => setFirstname(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="midlename"
                  value={middleName}
                  className="mt-1 block w-full px-3 py-2 bg-transparent border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
    focus:outline-none focus:border-slate-500  focus:ring-1 focus:slate-500"
                  onChange={(e) => setMidlename(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="lastname"
                  value={lastName}
                  className="mt-1 block w-full px-3 py-2 bg-transparent border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
    focus:outline-none focus:border-slate-500  focus:ring-1 focus:slate-500"
                  onChange={(e) => setLastname(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  className="mt-1 block w-full px-3 py-2 bg-transparent border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
    focus:outline-none focus:border-slate-500  focus:ring-1 focus:slate-500"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  value={password}
                  placeholder="password"
                  className="mt-1 block w-full px-3 py-2 bg-transparent border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
    focus:outline-none focus:border-slate-500  focus:ring-1 focus:slate-500"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="submit"
                  className="mt-1 block w-full p-3 border border-slate-300 rounded-md text-sm shadow-sm bg-violet-500 text-white"
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}
