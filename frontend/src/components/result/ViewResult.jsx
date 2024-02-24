import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ViewResult() {
  const { studentId } = useParams();
  const [resultData, setResultData] = useState([]);
  const [student, setStudent] = useState({});
  //console.log("studentid ; ", studentId);
  useEffect(() => {
    (async () => {
      await axios
        .get(
          `https://educative-backend.onrender.com/api/v1/class/result/view?query=${studentId}`
        )
        .then((data) => {
          setResultData(data.data.student.subjects);
          //console.log(data.data.student.subjects);
        })
        .catch((err) => {
          //console.log("err");
        });
    })();
    (async () => {
      await axios
        .get(`https://educative-backend.onrender.com/api/v1/class/result/get?query=${studentId}`)
        .then((data) => {
          setStudent(data.data.student);
        })
        .catch((err) => {
          //console.log("err");
        });
    })();
  }, []);
  function printDiv(){
    const printContents = document.getElementById('divToPrint').innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  }
  return (
    <>
      <div className="m-auto bg-gray-200 p-4">
        {student.firstName && (
          <div className="" id="divToPrint">
            <div className="m-1">
              NAME : {student.firstName.toUpperCase()} &nbsp;
              {student.middleName.toUpperCase()} &nbsp;
              {student.lastName.toUpperCase()}
            </div>
            <div className="m-1">ROLL NO : {student.rollNo}</div>
            <div>
            <div className="flex">
                  <div className="text-center p-1 w-40 border-x border-y m-1 max-sm:w-32">
                    SubjectName
                  </div>
                  <div className="p-1 w-24 text-center border-x border-y m-1 max-sm:w-18">
                    Obtained
                  </div>
                  <div className="p-1  w-24 text-center border-x border-y m-1 max-sm:w-18">
                    Total
                  </div>
                </div>
              {resultData.map((item) => (
                <div className="flex">
                  <div className="text-center bg-slate-100 p-4 w-40 border-x border-y border-black m-1 max-sm:p-2 max-sm:w-32">
                    {item.subjectName.toUpperCase()}
                  </div>
                  <div className="bg-slate-100 p-4 w-24 text-center border-x border-y border-black m-1 max-sm:p-2 max-sm:w-18">
                    {item.marksObtained}
                  </div>
                  <div className="bg-slate-100 p-4 w-24 text-center border-x border-y border-black m-1 max-sm:p-2 max-sm:w-18">
                    {item.totalMarks}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <button className="py-2 px-4 bg-violet-500 rounded-xl justify-self-end w-fit m-auto mt-1" onClick={printDiv}>
        Print
      </button>
    </>
  );
}
