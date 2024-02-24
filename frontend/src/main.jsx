import React, { Component, useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './index.css'
import Layout from './Layout.jsx'
import Login from './components/Login.jsx'
import SignUp from './components/SignUp.jsx'
import ClassesPage from './components/class/ClassesPage.jsx'
import AppProvider from './components/context/AppProvider.jsx'
import SubjectPage from './components/subject/SubjectPage.jsx'
import FileUpload from './components/FileUpload/UploadFile.jsx'
import FileViewer from './components/FileUpload/ViewFile.jsx'
import ResultSection from './components/result/Result.jsx'
import FindStudents from './components/result/FindStudent.jsx'  
import studentResult from './components/studentResult/StudentResult.jsx'
import NotFound from './components/PageNotFound.jsx'
import ViewResult from './components/result/ViewResult.jsx'
import AdminPage from './admin/AdminPage.jsx'
import StudentRegistration from './admin/StudentRegistration.jsx'

import StudentFindAndDelete from './admin/StudentFindAndDelete.jsx'
import TeacherFindAndDelete from './admin/TeacherFindAndDelete.jsx'
import TeacherRegistration from './admin/TeacherRegistration.jsx'

import Homepage from './home/HomePage.jsx'


function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path='' element={<Homepage />} />
        <Route path="/user/login" element={<Login/>} />
        <Route path="/:user/register" element={<SignUp/>} />
        <Route path="/:user/class" element={<AppProvider Component = {ClassesPage} />}/>
        <Route path='/:user/class/:classid' element={<AppProvider Component={SubjectPage}/>}/>

        <Route path='/:user/class/:unitId/file/upload' element={<AppProvider Component={FileUpload}/>}/>
        <Route path='/:user/class/:classId/file/View' element={<AppProvider Component={FileViewer}/>}/>
        <Route path='/:user/class/student/search' element={<AppProvider Component={FindStudents}/>}/>
        <Route path='/:user/result/:studentId' element={<AppProvider Component={ResultSection}/>}/>
        <Route path='/:user/result/view/:studentId' element={<AppProvider Component={ViewResult}/>}/>
        <Route path='/:user/result/view/:studentId' element={<AppProvider Component={studentResult}/>}/>
        </Route>
        <Route path='/main/admin' element={<AdminPage/>} />
        <Route path='/admin/student' element={<StudentRegistration/>}/>
        <Route path='/admin/student/delete' element={<StudentFindAndDelete/>}/>
        <Route path='/admin/teacher' element={<TeacherRegistration/>}/>
        <Route path='/admin/teacher/delete' element={<TeacherFindAndDelete/>}/>
        <Route path="*" element={<NotFound/>} />
    </Routes>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
        <AppRoutes />
    </BrowserRouter>
  </React.StrictMode>
);