import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ViewFilesInFolder from "./ViewFile";
import CustomSpinner from '../CustomSpinner.jsx'
// import classNames from "classnames";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [contentTitle, setContentTitle] = useState("");
  const { unitId } = useParams();
  const [loading, setLoading] = useState(false);
  const {user} = useParams()
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    const filename = e.target.value.split("\\");
    setContentTitle(filename[filename.length - 1]);
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true)
    const formData = new FormData();
    formData.append("file", file);
    formData.append("contentTitle", contentTitle);

    try {
      const response = await axios.post(
        `https://educative-backend.onrender.com/api/v1/class/subject/unit/content/file/upload/${unitId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoading(false)
      //console.log("File uploaded successfully:", response.data);
    } catch (error) {
      setLoading(false);
      console.error("Error uploading file:", error);
    }
  };

  return (
    <>
      {loading ? (
        <CustomSpinner />
      ) : (
        <>
          {user ==="teacher" && (<div className="flex flex-col mt-2">
            <div className="p-4 text-gray-500 text-xl">{contentTitle}</div>
            <div className="flex gap-2 mx-4">
              <input
                type="file"
                className="hidden"
                id="fileInput"
                onChange={(e) => handleFileChange(e)}
              />
              <label
                htmlFor="fileInput"
                className="cursor-pointer bg-violet-500 text-white p-4 rounded-xl transition duration-300 ease-in-out"
              >
                Choose File
              </label>
              <button
                className="bg-violet-500 text-white py-1 px-4 rounded-xl transition duration-300 ease-in-out"
                onClick={handleUpload}
              >
                Upload
              </button>
            </div>
          </div>)}
          <ViewFilesInFolder />
        </>
      )}
    </>
  );
};

export default FileUpload;
