

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ViewFilesInFolder = () => {
    const [files, setFiles] = useState([]);
    const { unitId } = useParams();
    console.log("class id : ",unitId)

    useEffect(() => {
      const fetchFiles = async () => {
          try {
              const res = await axios.get(`http://localhost:4000/api/v1/class/subject/unit/content/file/gets/${unitId}`);
              setFiles(res.data);
              console.log(res.data)
          } catch (error) {
              console.error('Error fetching files:', error);
          }
      };

      fetchFiles();
  }, []);


    return (
        <div className="w-full">
            {files.length > 0 ? (
                <div>
                    <div className="grid grid-cols-3 gap-4">
                        {files.map(file => (
                            <div key={file.id} className="rounded-md p-4">
                                <div className=" text-gray-600 text-xl">{file.name}</div>
                                <small className="text-gray-700">File ID: {file.id}</small><br/>
                                <small className="text-gray-700">File Type: {file.mimeType}</small>
                                <div className="mt-4">
                                    <a href={`https://drive.google.com/uc?export=download&id=${file.id}`} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105 mr-2" target="_blank" rel="noopener noreferrer">Download</a>
                                    <a href={`https://drive.google.com/file/d/${file.id}/view`} className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105" target="_blank" rel="noopener noreferrer">View</a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <p>The folder is empty.</p>
            )}
        </div>
    );
};

export default ViewFilesInFolder;
