import React from 'react'
import AdminNavigation from './AdminNavigation'
import student from './adminPng/student.png'
import teacher from './adminPng/teacher.png'
import { useNavigate } from 'react-router-dom'

const AdminPage = () => {
   
     const navigate = useNavigate();

    const handlerStudent =()=>{
        navigate('/student/register')
    }
    const handlerTeacher =()=>{
        navigate('/teacher/register')

    }
  return (
    <div>
        <AdminNavigation/>
        < div  className=''>
        <div className="select-account flex  shadow-md w-fit rounded m-auto self-center  mt-36 justify-center  items-center p-2 pb-6">
            <div className="student  max-w-36 mx-4 rounded-lg flex flex-col  shadow-sm bg-white dark:bg-gray-800">
                <img src={student} alt="Student Png" className='dark:bg-gray-800'/>
                <button className='p-3 bg-violet-500 w-36 rounded-md mt-3 text-white' onClick={handlerStudent}>Add Student</button>
                <button className='p-3 bg-violet-500 w-36 mt-1 rounded-md text-white' onClick={()=>navigate('/admin/teacher/delete')}>Delete Student</button>
            </div>

            <div className="student  max-w-36 mx-4 rounded-lg flex flex-col  shadow-sm bg-white dark:bg-gray-800">
                <img src={teacher} alt="Student Png " onClick={handlerTeacher}/>
                <button className='p-3 bg-violet-500 w-36 rounded-md text-white mt-3' onClick={handlerTeacher}>Add Teacher</button>
                <button className='p-3 bg-violet-500 w-36 mt-1 rounded-md text-white' onClick={()=>navigate('/admin/student/delete')}>Delete Teacher</button>
            </div>
        </div>
        </div>
    </div>
  )
}

export default AdminPage