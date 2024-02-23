import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AdminNavigation from "./AdminNavigation";

const StudentFindAndDelete = () => {
  const [student, setStudent] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation()
  const navigate = useNavigate();
  const {user} = useParams()
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (student) {
        try {
          const { data } = await axios.get(
            `http://localhost:4000/api/v1/admin/students?query=${student}`
          );
          setSearchResult(data);
          setError(null); 
        } catch (error) {
          setError(error.response);
          setSearchResult([]);
        }
      } else {
        setSearchResult([]);
        setError(null); 
      }
    }, 300); 

    return () => clearTimeout(delayDebounceFn);
  }, [student]);

  const handleDeleteStudent = async(student)=>{

  
     try {
        await axios.delete(`http://localhost:4000/api/v1/admin/students/${student._id}`);
        
        alert('Successfully deleted student');
        window.location.reload();    

     } catch (error) {

        alert(error.message);
        //console.log(error.message);
        
     }
  }

 

  return (
<>
    <AdminNavigation/>
    <div className="w-full">
      <div className="p-4 mx-auto">
        <div className="search-student">
          <label htmlFor="name" className="block mb-2 text-lg text-gray-500">
            Search Student by Name or ID:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={student}
            autoFocus
            onChange={(e) => setStudent(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 w-1/3"
          />
        </div>
        <div className="mt-4">
          <h2 className="text-lg mb-2 text-gray-500">Users</h2>
          {error && <p className="text-red-500">Error: {error.message}</p>}
          {searchResult.length > 0 ? (
            <ul>
              {searchResult.map((student, index) => (
                <li key={student._id} className="border-b border-gray-300 py-2 flex items-center">
                  <div className="w-3/4">
                    <p className="mb-1 text-sm">
                      Name : {student.firstName + " " + student.lastName}
                    </p>
                    <p className="mb-1 text-sm">
                      ID: {student.rollNo}
                    </p>
                    <p className="mb-1 text-sm">
                      Email: {student.email}
                    </p>
                  </div>
                  <div className="w-1/4 flex gap-2">
                   
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded max-sm:text-sm"
                      onClick={(e) => handleDeleteStudent(student)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-gray-500">No User Found</p>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default StudentFindAndDelete;
