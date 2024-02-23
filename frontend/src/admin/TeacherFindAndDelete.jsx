import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AdminNavigation from "./AdminNavigation";

const TeacherFindAndDelete = () => {
  const [teacher, setTeacher] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useParams();

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (teacher) {
        try {
          const { data } = await axios.get(
            `http://localhost:4000/api/v1/admin/teachers?query=${teacher}`
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
  }, [teacher]);

  const handleDeleteTeacher = async (teacher) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/admin/teachers/${teacher._id}`);
      alert('Successfully deleted teacher');
      setSearchResult(searchResult.filter((t) => t._id !== teacher._id));
    } catch (error) {
      alert(error.message);
      //console.log(error.message);
    }
  };

  return (
    <>
      <AdminNavigation />
      <div className="container mx-auto p-4">
        <div className="mb-4">
          <label htmlFor="searchInput" className="block mb-2 text-lg text-gray-600">
            Search teacher by Name or ID:
          </label>
          <input
            type="text"
            id="searchInput"
            name="searchInput"
            value={teacher}
            autoFocus
            onChange={(e) => setTeacher(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 w-1/3"
          />
        </div>
        <div>
          <h2 className="text-lg mb-2 text-gray-600">Search Results</h2>
          {error && <p className="text-red-500">Error: {error.message}</p>}
          {searchResult.length > 0 ? (
            <ul>
              {searchResult.map((teacher, index) => (
                <li key={teacher._id} className="border-b border-gray-300 py-2 flex items-center">
                  <div className="w-3/4">
                    <p className="mb-1 text-sm">
                      Name : {teacher.firstName + " " + teacher.lastName}
                    </p>
                    <p className="mb-1 text-sm">
                      ID: {teacher._id}
                    </p>
                    <p className="mb-1 text-sm">
                      Email: {teacher.email}
                    </p>
                  </div>
                  <div className="w-1/4 flex gap-2">
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded max-sm:text-sm"
                      onClick={(e) => handleDeleteTeacher(teacher)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-gray-600">No User Found</p>
          )}
        </div>
      </div>
    </>
  );
};

export default TeacherFindAndDelete;
