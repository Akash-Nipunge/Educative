import { useNavigate } from "react-router-dom";

export default function ClassCard({ classItem, user }) {
  const navigate = useNavigate();
  function HandleExploreClick(e) {
    e.preventDefault();
    navigate(`/${user}/class/${e.currentTarget.id}`);
  }
  return (
    <div
      className="border-x border-y rounded-lg border-violet-500 relative z-50 overflow-hidden"
    >
      <div
        key={classItem.className}
        id={classItem._id}
       onClickCapture={(e) => {
        HandleExploreClick(e);
      }}
        className="rounded-lg flex-col content-between overflow-hidden cursor-pointer"
      >
        <div className="py-4 px-2 flex flex-col">
          <div className="bg-violet-100 w-fit h-fit p-1 px-2 rounded-md text-xs self-end">
            {classItem.classTeacher}
          </div>
          <div
            className="text-7xl max-xl:text-5xl z-50"
            style={{
              fontWeight: 1000,
              WebkitTextStroke: "1px black",
              color: "white",
            }}
          >
            {classItem.className}
            {classItem.classCode}
          </div>
        </div>
        <div
          className="py-2 bg-violet-500 text-white absolute z-10 h-full rotate-45 w-80"
          style={{ left: "-93px", top: "69px" }}
        >
          {" "}
        </div>
      </div>
    </div>
  );
}
