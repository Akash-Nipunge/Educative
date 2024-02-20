import { StudentData } from "../../model/student.model.js";
export const searchResultByStudent = async (req, res) => {
  const studentId = req.query.query;
  if (!studentId) {
    return res.status(400).send({
      success: false,
      message: "Student Id Not Found",
    });
  }

  try {
    const student = await StudentData.findById(studentId).populate("result");
    if (!student) {
      return res.status(404).send({
        message: "Student Not Found",
        success: false,
      });
    }
    res.status(200).send({
      success: true,
      student,
    });
  } catch (error) {
    console.log("Error", error);
    res.status(400).send({
      success: false,
      message: "Error Occured In getting Result Data!",
    });
  }
};
