import React  from "react";


const StudentDetails = ({ student }) => {
  return (
    <div className="container mx-auto mt-2 p-4 rounded-lg">
      {student && (
          <div className="mb-4">
            <h2 className="text-lg">{`${student.firstName.toUpperCase()} ${student.middleName.toUpperCase()} ${student.lastName.toUpperCase()}`}</h2>
            Roll No: {student.rollNo}
          </div>
      )}
    </div>
  );
};

export default StudentDetails;
