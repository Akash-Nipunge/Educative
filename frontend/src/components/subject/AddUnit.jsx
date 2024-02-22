import { useEffect, useState } from "react";
import axios from 'axios'
import { useParams } from "react-router-dom";
import CustomDialog from "../CustomDialog.jsx";
import CustomSpinner from "../CustomSpinner.jsx";

export default function AddUnit({positionUnitData,setPositionUnitData,subjectId}) {
   const [title, settitle] = useState("");
   const [description,setdescription] = useState("");
   const {classid} = useParams()
   const [responseBox,setResponseBox] = useState('');
   const [loader,setLoader] = useState(false)
   useEffect(()=>{

   },[positionUnitData])
  function handleAddUnitSubmit(e){
    e.preventDefault();
    setLoader(true)
    ;(async()=>{
      await axios.post(`http://localhost:4000/api/v1/class/subject/unit/${subjectId}/add`,{title,description}).then((res)=>{
        setLoader((curr)=>!curr)
        setResponseBox((curr)=>res.data.message)
        setTimeout(() => {
          setResponseBox((curr)=>"")
        }, 1500);
      }).catch((err)=>{
        setLoader((curr)=>!curr)
        setResponseBox((curr)=>err.response.data.message);
        setTimeout(() => {
          setResponseBox((curr)=>"")
        }, 1500);
      })
    })();
    setPositionUnitData("-200%")
  }
  return (
    <>   
    {responseBox && <CustomDialog message={responseBox}/>} 
    {loader && <CustomSpinner/>}
    <div className={`absolute w-full z-50 bg-black text-gray-500 h-screen bg-opacity-70 ${positionUnitData ? "" : "hidden"}`}>
      <div className="m-auto w-1/3 mt-12 bg-white p-2 rounded-lg max-sm:w-full ">
        <div className="text-black text-2xl text-end mb-4 cursor-pointer" onClick={()=>setPositionUnitData((curr)=>!curr)}>X</div>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col max-md:w-2/3 max-md:m-auto max-md:p-4 max-md:rounded-lg max-md:m-50px max-sm:w-10/12"
        >
          <input
            type="text"
            placeholder="Unit Name"
            required
            value={title}
            className="mt-1 block w-full px-3 py-4 bg-transparent border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
    focus:outline-none focus:border-orange-400  focus:ring-1 focus:orange-500"
            onChange={(e) => settitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Unit Description"
            required
            value={description}
            className="mt-1 block w-full px-3 py-4 bg-transparent border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
    focus:outline-none focus:border-orange-400  focus:ring-1 focus:orange-500"
            onChange={(e) => setdescription(e.target.value)}
          />
          <button
            type="submit"
            onClick={(e)=>handleAddUnitSubmit(e)}
            className="mt-6 px-4 py-4 text-sm font-medium text-white bg-violet-500 rounded-lg hover:bg-violet-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
    </>
  );
}
