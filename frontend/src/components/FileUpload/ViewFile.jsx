

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ViewFilesInFolder = () => {
    const [files, setFiles] = useState([]);
    const { unitId } = useParams();
    //console.log("class id : ",unitId)

    useEffect(() => {
      const fetchFiles = async () => {
          try {
              const res = await axios.get(`https://educative-backend.onrender.com/api/v1/class/subject/unit/content/file/gets/${unitId}`);
              setFiles(res.data);
              //console.log(res.data)
          } catch (error) {
              console.error('Error fetching files:', error);
          }
      };

      fetchFiles();
  }, []);


    return (
        <div className="w-full p-4">
            {files.length > 0 ? (
                <div>
                    <div className="grid grid-cols-3 gap-4 max-sm:grid-cols-1">
                        {files.map(file => (
                            <div key={file.id} className="rounded-md p-4 bg-black bg-opacity-10 h-40 relative shadow-lg">
                                <marquee className=" text-gray-600 text-xl overflow-scroll">{file.name}</marquee>
                                <small className="text-gray-700">File Type: {file.mimeType}</small>
                                <div className="absolute bottom-0 flex gap-2">
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white p-2 px-4 rounded-lg"><a href={`https://drive.google.com/uc?export=download&id=${file.id}`}  target="_blank" rel="noopener noreferrer">Download</a></button>
                                    <button className="bg-green-500 hover:bg-green-700 text-white p-2 px-4 rounded-lg"><a href={`https://drive.google.com/file/d/${file.id}/view`} target="_blank" rel="noopener noreferrer">View</a></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="text-center text-xl text-gray-400">The folder is empty.</div>
            )}
        </div>
    );
};

export default ViewFilesInFolder;
