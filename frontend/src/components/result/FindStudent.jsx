import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const FindStudents = () => {
  const [student, setStudent] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useParams();
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
    console.log("student : ",student)
    navigate(`/teacher/result/${student._id}`);
  };

  function HandleViewResult(student) {
    navigate(`/${user}/result/view/${student._id}`);
  }

  return (
    <div className="w-full">
      <div className="p-4 mx-auto mt-3">
        <div className="search-student">
          <div class="w-1/3 relative group max-sm:w-full">
            <input
              type="text"
              id="name"
              name="name"
              required
              value={student}
              onChange={(e) => setStudent(e.target.value)}
              class="w-full h-10 p-4 text-sm peer bg-gray-100 outline-none"
            />
            <label
              for="username"
              class="transform transition-all absolute top-0 left-0 h-full flex items-center pl-2 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0 text-gray-400"
            >
              Search Student by Name
            </label>
          </div>
        </div>
        <div className="mt-4">
          <h2 className="text-lg mb-2 text-gray-500">Users</h2>
          {error && <p className="text-red-500">Error: {error.message}</p>}
          {searchResult.length > 0 ? (
            <ul className="grid grid-cols-2 max-md:grid-cols-1">
              {searchResult.map((student, index) => (
                <li
                  key={student._id}
                  className="border-b border-gray-300 p-2 flex items-center max-sm:flex-col max-sm:items-start shadow-xl rounded-lg bg-slate-200 bg-opacity-50"
                >
                  <div className="w-3/4">
                    <p className="mb-1 text-sm max-sm:">
                      Name : {student.firstName + " " + student.lastName}
                    </p>
                    <p className="mb-1 text-sm">ID: {student.rollNo}</p>
                    <p className="mb-1 text-sm">Email: {student.email}</p>
                  </div>
                  <div className="w-1/4 flex gap-2">
                    {user === "teacher" && (
                      <button
                        className="bg-violet-500 text-white font-bold py-2 px-4 rounded max-sm:mt-2"
                        onClick={() => handleNavigate(student)}
                      >
                        Edit
                      </button>
                    )}
                    <button
                      className="bg-violet-500 text-white py-2 px-4 rounded max-sm:text-sm max-sm:mt-2"
                      onClick={(e) => HandleViewResult(student)}
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
