import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import SideBar from "../layout/SideBar";
import UserDashboard from "../components/UserDashboard";
import AdminDashboard from "../components/AdminDashboard";
// import BookManagement from "../components/BookManagement";
// import Catalog from "../components/Catalog";
import Users from "../components/Users";
// import MyBorrowedBooks from "../components/MyBorrowedBooks";

const Home = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(""); 

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  console.log("Home component - User:", user); // Debug log
  console.log("Home component - isAuthenticated:", isAuthenticated); // Debug log

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const renderComponent = () => {
    console.log("Rendering component for role:", user?.role); // Debug log
    console.log("Selected component:", selectedComponent); // Debug log

    switch (selectedComponent) {
      case "Dashboard":
        return user?.role === "admin" ? (
          <AdminDashboard />
        ) : (
          <UserDashboard />
        );

      // case "Books":
      //   return <BookManagement />;

      // case "catalog":
      //   if (user?.role === "Admin") {
      //     return <Catalog />;
      //   }
      //   return null;

      case "Users":
        if (user?.role === "admin") {
          return <Users />;
        }
        return null;

      // case "MyBorrowedBooks":
      //   return <MyBorrowedBooks />;

      default:
        return user?.role === "admin" ? (
          <AdminDashboard />
        ) : (
          <UserDashboard />
        );
    }
  };

  return (
    <>
      <div className="relative md:pl-64 flex min-h-screen bg-gray-100">
        <div className="md:hidden z-10 absolute right-6 top-4 sm:top-6 flex justify-center items-center bg-black rounded-md h-9 w-9 text-white">
          <GiHamburgerMenu
            className="text-2xl"
            onClick={() => setIsSideBarOpen(!isSideBarOpen)}
          />
        </div>

        <SideBar
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
          setSelectedComponent={setSelectedComponent}
          userRole={user?.role} // Pass user role to SideBar
        />

        <div className="flex-1 p-6">
          {renderComponent()}
        </div>
      </div>
    </>
  );
};

export default Home;