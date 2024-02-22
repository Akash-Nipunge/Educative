import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

export default function ViewResult(){
    const {studentId} = useParams()
    const [resultData,setResultData] = useState([])
    const [student,setStudent] = useState({})
    console.log("studentid ; ",studentId)
    useEffect(()=>{
        ;(async ()=>{
            await axios.get(`http://localhost:4000/api/v1/class/result/view?query=${studentId}`).then((data)=>{
                setResultData(data.data.student.subjects)
            }).catch((err)=>{
                console.log("err")
            })
        })();
        // (async ()=>{
        //     await axios.get(`http://localhost:4000/api/v1/class/result/get?query=${studentId}`).then((data)=>{
        //         setStudent(data.data.student)
        //     }).catch((err)=>{
        //         console.log("err")
        //     })
        // })();
    },[]);
    return (
        <>
        {student.firstName && (<div>
            <div>{student.firstName.toUpperCase()} &nbsp;{student.middleName.toUpperCase()} &nbsp;{student.lastName.toUpperCase()}</div>
            <div>
                {resultData.map((item)=>{
                    <div>{item.subjectName}</div>
                })}
            </div>
        </div>)}
        </>
    )
}