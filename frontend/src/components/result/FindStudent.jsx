import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const FindStudents = () => {
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
            `http://localhost:4000/api/v1/class/result/search?query=${student}`
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

  const handleNavigate = (student) => {
    navigate(`/teacher/result/${student._id}`);
  };

  function HandleViewResult(student){
      navigate()
  }

  return (
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
                    {user === 'teacher' && <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleNavigate(student)}
                    >
                      Edit
                    </button>
                    }
                    <button
                      className="bg-teal-500 hover:bg-teal-700 text-white py-2 px-4 rounded max-sm:text-sm"
                      onClick={(e) => handleViewResult(student)}
                    >
                      View
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
  );
};

export default FindStudents;
