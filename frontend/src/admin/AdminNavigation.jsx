import React from "react";

const AdminNavigation = () => {
  return (
    <nav className="max-sm:px-4 lg:px-8 w-full px-18 py-1 sticky top-0 z-50 shadow-md bg-white">
      <div className="flex items-center justify-between h-16">
        <div className="flex-shrink-0">
          {/* <img src={img} className="" alt="Logo" width="150px"/> */}
          <h1 className="text-2xl font-mono max-sm:text-xl">Educative</h1>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavigation;
