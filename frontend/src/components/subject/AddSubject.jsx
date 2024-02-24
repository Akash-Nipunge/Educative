import { useEffect, useState } from "react";
import axios from 'axios'
import { useParams } from "react-router-dom";
import CustomSpinner from "../CustomSpinner.jsx";
import CustomDialog from "../CustomDialog.jsx";

export default function AddSubject({topPosition,setTopPosition,setRefresh}) {
   const [subject, setSubject] = useState("");
   const [loading,setLoading] = useState(false);
   const {classid} = useParams()
   const [responseBox,setResponseBox] = useState("");
   useEffect(()=>{

   },[topPosition,subject])
  function handleAddSubjectSubmit(e){
    e.preventDefault();
    setLoading(true);
    if(!subject)
    {
      alert("Enter subject name!")
      return;
    }
    ;(async()=>{
      await axios.post(`https://educative-backend.onrender.com/api/v1/class/subject/add/${classid}`,{subject}).then((res)=>{
        setLoading(false)
        setResponseBox(res.data.message);
        setTimeout(() => {
          setResponseBox("")
        }, 1500);
      }).catch((err)=>{
        setLoading(false)
        setResponseBox(err.response.data.message);
        setTimeout(() => {
          setResponseBox("");
        }, 1500);
      })
    })();
    setTopPosition((curr)=>!curr)
  }
  return (
    <>
      {responseBox && <CustomDialog message={responseBox}/>}
      {loading ? <CustomSpinner/> :  <div className={`absolute w-full z-50 bg-white text-gray-500 h-screen ${topPosition ? "" : "hidden"}`}>
      <div className="m-auto w-1/3 mt-12 bg-white p-2 rounded-lg max-sm:w-full max-sm:absolute">
        <div className="text-black text-2xl text-end mb-4 cursor-pointer" onClick={()=>setTopPosition((curr)=>!curr)}>X</div>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col max-md:w-2/3 max-md:m-auto max-md:p-4 max-md:rounded-lg max-md:m-50px max-sm:w-10/12"
        >
          <input
            type="text"
            placeholder="Subject Name"
            required
            value={subject}
            className="mt-1 block w-full px-3 py-4 bg-transparent border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
    focus:outline-none focus:border-orange-400  focus:ring-1 focus:orange-500"
            onChange={(e) => setSubject(e.target.value)}
          />
          <button
            type="submit"
            onClick={(e)=>handleAddSubjectSubmit(e)}
            className="mt-6 px-4 py-4 text-sm font-medium text-white bg-violet-500 rounded-lg hover:bg-violet-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  }
  </>
  );
}
