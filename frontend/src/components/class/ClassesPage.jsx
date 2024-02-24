import { useState, useEffect } from "react";
import CustomDialog from "../CustomDialog.jsx";
import { classList } from "../../constants.js";
import ClassCard from "./ClassCard.jsx";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import CustomSpinner from "../CustomSpinner.jsx";

export default function ClassesPage() {
  const [className, setClassName] = useState("");
  const [classCode, setClassCode] = useState("");
  const [classTeacher, setClassTeacher] = useState("");
  const [classData, setClassData] = useState([]);
  const [AddClassDialog, setAddClassDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [responseBox,setResponseBox] = useState("");
  const {user} = useParams()
  useEffect(() => {
    setAddClassDialog("-200%");
    (async (req, res) => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const jwtToken = localStorage.getItem("token");
        //console.log("token : ", token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
        const response = await axios.get("https://educative-backend.onrender.com/api/v1/class");
        //console.log(response.data.classes);
        setClassData(response.data.classes);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching class data:", error);
        // setLoading(false);
      }
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .post(
        `https://educative-backend.onrender.com/api/v1/class/add`,
        {
          className,
          classCode,
          classTeacher,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setAddClassDialog((curr)=>!curr)
        setLoading(false);
        //console.log(res.data.message)
        setResponseBox((curr)=>res.data.message);
        setTimeout(() => {
          setResponseBox((curr)=>"");
        }, 1500);
      })
      .catch((err) => {
        setAddClassDialog((curr)=>!curr)
        setLoading(false);
        setResponseBox((curr)=>err.response.data.message);
        setTimeout(() => {
          setResponseBox((curr)=>"");
        }, 1500);
      });
  };

  function HandleAddClass() {
    setAddClassDialog((curr)=>!curr);
  }

  return (
    <>
      {responseBox && <CustomDialog message={responseBox}/>}
      {loading ? (
        <CustomSpinner />
      ) : (
        <>
          {user === "teacher" && (
            <button
              className="bg-violet-400 py-4 rounded-md mx-4 px-4 mt-2 hidden max-md:block"
              onClick={HandleAddClass}
            >
              Add Class
            </button>
          )}
          <div className="flex">
            <div
              className={
                user === "teacher"
                  ? "w-2/3 p-4 grid grid-cols-4 gap-2 h-fit max-md:w-full max-sm:grid-cols-2"
                  : "w-full p-4 grid grid-cols-4 gap-2 h-fit max-md:w-full max-sm:grid-cols-2"
              }
            >
              {classData ? (
                classData.map((classItem, index) => (
                  <ClassCard
                    classItem={classItem}
                    key={index}
                    user={user}
                  />
                ))
              ) : (
                <div className="text-center text-3xl text-gray-300 w-full">
                  No Classes Available Yet!!
                </div>
              )}
            </div>

            {user == "teacher" && (
              <div
                className={`w-1/3 p-4 rounded-lg mx-auto max-md:absolute max-md:h-screen bg-white max-md:w-full max-md:z-50 max-sm:${AddClassDialog ? "hidden" : "block"}`}
              >
                <form
                  onSubmit={(e) => handleSubmit(e)}
                  className="flex flex-col max-md:w-2/3 max-md:m-auto max-md:p-4 max-md:rounded-lg max-md:m-50px max-sm:w-full"
                >
                  <div
                    className="text-end m-2 text-xl hidden max-md:block cursor-pointer"
                    onClick={() => setAddClassDialog("-200%")}
                  >
                    X
                  </div>
                  <button
                    className="py-4 w-full rounded-md text-black border-x border-y border-violet-300 cursor-text"
                    onClick={(e) => e.preventDefault()}
                  >
                    Add Class Here!
                  </button>
                  <div className="flex flex-row items-center mt-4">
                    <select
                      type="number"
                      placeholder="className"
                      autoFocus
                      value={className}
                      required
                      className="mt-1 block w-full px-3 py-4 bg-transparent border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
    focus:outline-none focus:border-blue-400  focus:ring-1 focus:blue-500"
                      onChange={(e) => setClassName(e.target.value)}
                    >
                      <option value="0">Select class</option>
                      {classList.classes.map((classItem, index) => (
                        <option value={classItem} key={index}>
                          class {classItem}
                        </option>
                      ))}
                    </select>
                    <select
                      type="number"
                      placeholder="className"
                      autoFocus
                      value={classCode}
                      required
                      className="mt-1 block w-full px-3 py-4 bg-transparent border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
    focus:outline-none focus:border-blue-400  focus:ring-1 focus:blue-500"
                      onChange={(e) => setClassCode(e.target.value)}
                    >
                      <option value="0">Select class</option>
                      {classList.classIds.map((classItem, index) => (
                        <option value={classItem} key={index}>
                          class {classItem}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="class teacher name"
                      value={classTeacher}
                      required
                      className="mt-1 block w-full px-3 py-4 bg-transparent border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
    focus:outline-none focus:border-blue-400  focus:ring-1 focus:blue-500"
                      onChange={(e) => setClassTeacher(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="mt-6 px-4 py-4 text-sm font-medium text-white rounded-lg bg-violet-600"
                  >
                    Submit
                  </button>
                </form>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
