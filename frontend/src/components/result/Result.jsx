import React, { useEffect, useState } from "react";
import axios from "axios";
import { calculateScore, determinePassOrFail } from "./utils";
import StudentDetails from "./StudentDetails";
import { useParams } from "react-router-dom";
import CustomDialog from "../CustomDialog";

const ResultSection = () => {
  const [subjects, setSubjects] = useState([
    { srNo: 1, subjectName: "", marksObtained: 0, totalMarks: 100 },
  ]);
  const [totalScore, setTotalScore] = useState(0);
  const [passOrFail, setPassOrFail] = useState("");

  const [student, setStudent] = useState("");
  const { studentId } = useParams();
  const [message,setMessage] = useState("")

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        await axios
          .get(
            `http://localhost:4000/api/v1/class/result/get?query=${studentId}`
          )
          .then((data) => {
            setStudent(data.data.student);
          });
        // setStudent(data.student);
      } catch (error) {
        //console.log("Error :", error.message);
      }
    };
    fetchStudent();
  }, [studentId]);

  const handleAddSubject = () => {
    const newSubject = {
      srNo: subjects.length + 1,
      subjectName: "",
      marksObtained: 0,
      totalMarks: 100,
    };
    setSubjects([...subjects, newSubject]);
  };

  const handleRemoveSubject = () => {
    if (subjects.length > 1) {
      const updatedSubjects = [...subjects];
      updatedSubjects.pop();
      setSubjects(updatedSubjects);
    }
  };

  const handleClearFields = () => {
    setSubjects([
      { srNo: 1, subjectName: "", marksObtained: 0, totalMarks: 100 },
    ]);
    setTotalScore(0);
    setPassOrFail("");
  };

  const handleSubjectChange = (index, key, value) => {
    const updatedSubjects = [...subjects];
    if (key === "marksObtained" && value > updatedSubjects[index].totalMarks) {
      alert("Marks obtained cannot be greater than total marks");
      return;
    }
    updatedSubjects[index][key] = value;
    setSubjects(updatedSubjects);
  };

  const handleCalculateResult = () => {
    const score = calculateScore(subjects);
    setTotalScore(score);
    const result = determinePassOrFail(score);
    setPassOrFail(result);
  };

  useEffect(() => {
    handleCalculateResult();
  }, [subjects]);

  const handleSubmitResult = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/class/result/submit",
        { student, subjects }
      );
      setMessage("Result Added Successfully !")
      setTimeout(() => {
        setMessage("")
      }, 1500);
    } catch (error) {
      setMessage("Error submitting result !")
      setTimeout(() => {
        setMessage("")
      }, 1500);
      console.error("Error submitting result:", error.message);
    }
  };

  return (
    <>
      {message != "" && <CustomDialog message={message}/>}
      <div className="container mx-auto">
        <div class="relative">
          <table class="w-fit text-sm m-auto">
            {student && <thead>
              <tr className="p-4">
                <th>NAME&nbsp;:&nbsp;&nbsp;{student.firstName.toUpperCase()}&nbsp;&nbsp;{student.middleName.toUpperCase()}&nbsp;&nbsp;{student.lastName.toUpperCase()}</th>
              </tr>
              <tr className="text-left">
              <th>ROLL&nbsp;NO&nbsp;:&nbsp;{student.rollNo}</th>
              </tr>
            </thead>}
            <thead class="text-xs uppercase bg-gray-200 text-black">
              <tr>
                <th scope="col" class="py-3 text-center w-20 max-sm:w-fit max-sm:font-normal max-sm:hidden">
                  Sr.No
                </th>
                <th scope="col" class="py-3 max-sm:font-normal">
                  subject <span className="max-sm:hidden">name</span>
                </th>
                <th scope="col" class="py-3 max-sm:font-normal">
                  obtained <span className="max-sm:hidden">marks</span>
                </th>
                <th scope="col" class="py-3 max-sm:font-normal">
                  total <span className="max-sm:hidden">marks</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject, index) => (
                <tr class="bg-white border-b text-gray-900 max-sm:px-1">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium whitespace-nowrap max-sm:hidden"
                  >
                    {index + 1}
                  </th>
                  <td class="">
                    <input
                      type="text"
                      className="border border-gray-300 rounded p-3 w-96 outline-none max-md:w-64 max-sm:w-full"
                      value={subject.subjectName}
                      placeholder="Subject Name"
                      onChange={(e) =>
                        handleSubjectChange(
                          index,
                          "subjectName",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td class="px-6 py-4 max-sm:px-2">
                    <input
                      type="number"
                      className="border border-gray-300 rounded p-3 w-28 outline-none max-sm:w-16 m-auto"
                      value={subject.marksObtained}
                      onChange={(e) =>
                        handleSubjectChange(
                          index,
                          "marksObtained",
                          parseInt(e.target.value)
                        )
                      }
                    />
                  </td>
                  <td class="px-6 py-4 max-sm:px-0">
                    <input
                      type="number"
                      className="border border-gray-300 rounded p-3 w-28 outline-none max-sm:w-16 m-auto"
                      value={subject.totalMarks}
                      onChange={(e) =>
                        handleSubjectChange(
                          index,
                          "totalMarks",
                          parseInt(e.target.value)
                        )
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center flex-wrap mt-4">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded shadow-md mr-2 max-sm:text-xs max-sm:p-2"
            onClick={handleAddSubject}
          >
            Add Subject
          </button>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded shadow-md mr-2 max-sm:text-xs max-sm:p-2"
            onClick={handleRemoveSubject}
          >
            Remove Subject
          </button>
          <button
            className="bg-yellow-500 text-white py-2 px-4 rounded shadow-md mr-2 max-sm:text-xs max-sm:p-2"
            onClick={handleClearFields}
          >
            Clear Fields
          </button>
          {/* <button
            className="bg-blue-500 text-white py-2 px-4 rounded shadow-md"
            onClick={handleCalculateResult}
          >
            Calculate Result
          </button> */}
        </div>
        {/* <p className="mt-4">Total Score: {totalScore}</p>
        <p>Result: {passOrFail}</p> */}
      </div>
      <button
        type="submit"
        onClick={handleSubmitResult}
        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded w-full my-5 max-sm:text-xs"
      >
        Declare result
      </button>
    </>
  );
};

export default ResultSection;
