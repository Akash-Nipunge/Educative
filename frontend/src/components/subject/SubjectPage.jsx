import { useEffect, useState } from "react";
import AddSubject from "./AddSubject";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AddUnit from "./AddUnit";
import CustomSpinner from "../CustomSpinner";

export default function SubjectPage(){
    const [topPosition,setTopPosition] = useState("-200%");
    const [subjectsData,setSubjectsData] = useState([]);
    const [unitData,setUnitData] = useState([]);
    const [positionUnitData,setPositionUnitData] = useState("-200%");
    const {classid} = useParams();
    const [loading,setLoading] = useState(false);
    const [selectedSubject,setSelectedSubject] = useState("");
    const [selectedSubjectDialog,setSelectedSubjectDialog] = useState(false);
    const [subjectId,setSubjectId] = useState("");
    const {user} = useParams()
    const navigate = useNavigate()
    const [responseBox,setResponseBox] = useState("");
    useEffect(()=>{
        setLoading(true)
        ;(async()=>{
            await axios.get(`http://localhost:4000/api/v1/class/subject/${classid}`).then((res)=>{
                setLoading(false)
                setSubjectsData(res.data.data)
                res.data.data.length && !subjectId && setSubjectId(()=>res.data.data[0]._id);
                res.data.data.length && !selectedSubject && setSelectedSubject(()=>res.data.data[0].subjectName)
            }).catch((err)=>{
                setLoading(false)
                console.log(err);
            })
        })();
        subjectId && (async ()=>{
            await axios.get(`http://localhost:4000/api/v1/class/subject/unit/${subjectId}`).then((res)=>{
                    setUnitData(res.data.data)
                }).catch((err)=>{
                    console.log(err)
                })
        })();
    },[subjectsData.length])

    // deletion of unit 
    async function HandleDeleteUnit(e){
        await axios.delete(`http://localhost:4000/api/v1/class/subject/unit/${subjectId}/delete/${e.target.id}`).then((res)=>{
            console.log("response : ",res)
            
        }).catch((err)=>{
            console.log("error occured : ",err)
        })
    }


    function handleSubjectClick(e){
        setSubjectId(e.target.id);
        setSelectedSubjectDialog((state)=>!state);
        setSelectedSubject(e.target.innerText);
    }

    function HandleEdit(e){
        console.log("upload")
        navigate(`/${user}/class/${e.target.id}/file/upload`);
    }

    return(
        <>
        <div className="text-center text-xl font-mono text-gray-500 hidden max-sm:block mt-2">{selectedSubject}</div>
        {loading ? <CustomSpinner/> : <>
        <div className="flex justify-between p-8 max-sm:p-4">
            <div className={`w-1/4 bg-violet-50 rounded-md overflow-hidden max-sm:w-full max-sm:absolute max-sm:h-screen max-sm:bg-opacity-70 max-sm:left-0 max-sm:pt-20 max-sm:px-4 max-sm:text-sm max-sm:rounded-none`} style={{display:`${(!selectedSubjectDialog && window.innerWidth<=700) ? "none" : "block"}`}}>
            <div className="text-end my-2 text-2xl hidden max-sm:block cursor-pointer" onClick={()=>setSelectedSubjectDialog((state)=>!state)}>X</div>
            {user =='teacher' && <div>
                    <button className={`bg-violet-700 text-center p-2 text-white w-full`} onClick={()=>setTopPosition("0%")}>Add subject</button>
                </div>}
                <div className="p-4 flex flex-col gap-2">
                <div className="flex flex-col gap-3">
                    {!subjectsData.length ? <div className="text-gray-500 font-mono text-xl m-auto">No Subjects Available</div> : <>
                    {subjectsData.map((subject,index)=><>
                        <button className={`${subjectId === subject._id ? "bg-violet-300" : ""} w-full p-2 rounded-md text-black border-violet-400 border-x border-y`} key={index} id={subject._id} onClick={(e)=>
                            handleSubjectClick(e)}>{subject.subjectName}</button></>
                    )}
                    </>}
                </div>
                </div>
            </div>
            <div className="w-3/4 px-4 max-sm:w-full max-sm:px-0 text-black">
                <div className="flex justify-between max-sm:grid max-sm:grid-cols-3 max-sm:gap-2">
                    <button className="bg-white rounded-lg py-2 px-4  max-sm:text-sm border-x border-y border-violet-500 hover:bg-violet-300">Back</button>
                    <button className={`bg-violet-900  rounded-lg hidden max-sm:block px-4 py-2 max-sm:text-sm ${user == 'student' ? "col-span-2" : ""}`} onClick={(e)=>setSelectedSubjectDialog("0")}>Subjects</button>
                    {user === 'teacher' && <button className="bg-white rounded-lg py-2 px-4 max-sm:text-sm border-x border-y border-violet-500 hover:bg-violet-300" onClick={(e)=>{
                        setPositionUnitData("0%");
                    }}>Add Unit</button>
                }
                </div>
                <div className="py-4 w-full flex flex-col gap-2">
                    {!unitData.length ? <div className="m-auto text-2xl text-gray-400">No Units Data Available</div> : <>
                {unitData.map((unit,index)=><>
                    <div className="bg-black p-2 w-full flex justify-between content-center rounded-md bg-opacity-5">
                    <div>
                        <div key={unit._id} className="max-sm:text-base text-black font-medium">{unit.title}</div>
                        <small key={index} className="text-gray-500">{unit.description}</small>
                    </div>
                    {
                    user == 'teacher' ? <div className="mt-auto flex gap-2">
                    <button className="rounded-md py-2 px-4 bg-violet-900 max-sm:text-sm" id = {unit._id} onClick={(e)=>{
                        HandleEdit(e);
                    }}>Edit</button>
                    <button className="rounded-lg py-2 px-4 bg-violet-900 max-sm:text-sm" id={unit._id} onClick={(e)=>{
                        HandleDeleteUnit(e);
                    }}>Delete</button>
                    </div> : <button className="rounded-md py-2 px-4 bg-violet-900 max-sm:text-sm">View</button>}
                </div>
                </>)}
                </>}
                </div>
            </div>
        </div>
         <AddSubject topPosition={topPosition} setTopPosition={setTopPosition}/>
         <AddUnit positionUnitData={positionUnitData} setPositionUnitData={setPositionUnitData} subjectId={subjectId}/>
         </>}
         </>
    )
}