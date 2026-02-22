import React, { useEffect } from "react";
import logo_with_title from "../assets/logo-with-title.png";
import logoutIcon from "../assets/logout.png";
import closeIcon from "../assets/white-close-icon.png";
import dashboardIcon from "../assets/element.png";
import settingIcon from "../assets/setting-white.png";
import { RiAdminFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { logout, resetAuthSlice } from "../store/slices/authSlice";
import { toast } from "react-toastify";
import {
  toggleAddNewAdminPopup,
  toggleSettingPopup,
} from "../store/slices/popUpSlice";
// import { fetchUserBorrowedBooks } from "../store/slices/borrowSlice";
// import AddNewAdmin from "../popups/AddNewAdmin";
import SettingPopup from "../popups/SettingPopup";

const SideBar = ({ isSideBarOpen, setIsSideBarOpen, setSelectedComponent }) => {
  const dispatch = useDispatch();

  const { addNewAdminPopup, settingPopup } = useSelector(
    (state) => state.popup
  );

  const { loading, error, message, user, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
    if (message) {
      toast.success(message);
      dispatch(resetAuthSlice());
    }
  }, [dispatch, isAuthenticated, error, loading, message]);

  return (
    <>
      <aside
        className={`${
          isSideBarOpen ? "left-0" : "-left-full"
        } fixed top-0 h-full w-64 bg-[#0D0F17] text-white z-30 
           transition-all duration-700 md:relative md:left-0 flex flex-col shadow-xl`}
        style={{ position: "fixed" }}
      >
        <div className="flex justify-between items-center px-6 py-6 border-b border-gray-800">
          <img src={logo_with_title} alt="logo" className="w-40" />

          <button className="md:hidden" onClick={() => setIsSideBarOpen(false)}>
            <img src={closeIcon} alt="close" className="w-6" />
          </button>
        </div>

        <nav className="flex flex-col gap-3 px-6 py-6">
          <button
            onClick={() => setSelectedComponent("Dashboard")}
            className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-gray-800/50 transition"
          >
            <img src={dashboardIcon} alt="dashboard" className="w-5" />
            <span className="text-sm font-medium">Dashboard</span>
          </button>

         

          {isAuthenticated && user?.role === "admin" && (
            <>

             {/* <button
            onClick={() => setSelectedComponent("Books")}
            className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-gray-800/50 transition"
          >
            <img src={bookIcon} alt="books" className="w-5" />
            <span className="text-sm font-medium">Books</span>
          </button> */}
          
              {/* <button
                onClick={() => setSelectedComponent("catalog")}
                className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-gray-800/50 transition"
              >
                <img src={catalogIcon} alt="catalog" className="w-5" />
                <span className="text-sm font-medium">Catalog</span>
              </button> */}

              <button
                className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-gray-800/50 transition"
                onClick={() => dispatch(toggleAddNewAdminPopup())}
              >
                <RiAdminFill />
                <span>Add new Admin</span>
              </button>

              {/* <button
                onClick={() => setSelectedComponent("Users")}
                className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-gray-800/50 transition"
              >
                <img src={usersIcon} alt="users" className="w-5" />
                <span className="text-sm font-medium">Users</span>
              </button> */}
            </>
          )}

          {/* {isAuthenticated && user?.role === "User" && (
            <>
              <button
                onClick={() => {
                  dispatch(fetchUserBorrowedBooks()); 
                  setSelectedComponent("MyBorrowedBooks");
                }}
                className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-gray-800/50 transition"
              >
                <img src={catalogIcon} alt="MyBorrowedBooks" className="w-5" />
                <span className="text-sm font-medium">My Books</span>
              </button>
            </>
          )} */}

          <button
            onClick={() => dispatch(toggleSettingPopup())}
            className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-gray-800/50 transition"
          >
            <img src={settingIcon} alt="settings" className="w-5" />
            <span className="text-sm font-medium">Settings</span>
          </button>
        </nav>

        <div className="mt-auto px-6 pb-6">
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 w-full px-4 py-3 rounded-lg 
                       bg-red-600/20 hover:bg-red-600/30 transition border border-red-600/30 
                       text-red-400 font-medium"
          >
            <img src={logoutIcon} alt="logout" className="w-5" />
            Logout
          </button>
        </div>
      </aside>

      {addNewAdminPopup && <AddNewAdmin />}
      {settingPopup && <SettingPopup />}
    </>
  );
};

export default SideBar;
