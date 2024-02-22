import React from 'react'
import AdminNavigation from './AdminNavigation'
import student from './adminPng/student.png'
import teacher from './adminPng/teacher.png'
import { useNavigate } from 'react-router-dom'

const AdminPage = () => {
   
     const navigate = useNavigate();

    const handlerStudent =()=>{

        navigate('/admin/student')

    }
    const handlerTeacher =()=>{
        
        navigate('/admin/teacher')

    }
  return (
    <div>
        <AdminNavigation/>


        < div  className=''>
        <div className="select-account flex  shadow-md w-fit rounded m-auto self-center  mt-36 justify-center h-52 items-center p-2 pb-6">
            <div className="student  max-w-36 h-36 mx-4 rounded-lg flex flex-col gap-1  shadow-sm bg-white dark:bg-gray-800">
                <img src={student} alt="Student Png" onClick={handlerStudent} />
                <p className='text-center text- font-semibold'>Students</p>
            </div>

            <div className="student  max-w-36 h-36 mx-4 rounded-lg flex flex-col gap-1  shadow-sm bg-white dark:bg-gray-800">
                <img src={teacher} alt="Student Png " onClick={handlerTeacher}/>
                <p className='text-center text- font-semibold'>Teacher</p>
            </div>
        </div>
        </div>
    </div>
  )
}

export default AdminPage