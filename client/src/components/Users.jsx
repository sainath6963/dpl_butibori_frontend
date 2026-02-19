import React from "react";
import { useSelector } from "react-redux";
import Header from "../layout/Header";

const Users = () => {
  const { users } = useSelector((state) => state.user);

  // Clean Date Formatter
  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";

    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}-${month}-${year} | ${hours}:${minutes}`;
  };

  // Filter only normal users
  const filteredUsers =
    users?.filter((u) => u.role?.toLowerCase() === "user") || [];

  return (
    <>
      <main className="min-h-screen bg-gray-100">
        <Header />

        {/* Page Header */}
        <div className="px-8 pt-6">
          <h2 className="text-3xl font-semibold text-gray-800">
            Registered Users
          </h2>
          <p className="text-gray-600 mt-1">
            List of all normal users in the system
          </p>
        </div>

        {/* Table Section */}
        <div className="mt-8 px-8 pb-10">
          <div className="bg-white shadow-xl rounded-xl border border-gray-200 overflow-hidden">

            {filteredUsers.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="py-4 px-6 text-sm font-semibold text-gray-700">#</th>
                      <th className="py-4 px-6 text-sm font-semibold text-gray-700">Name</th>
                      <th className="py-4 px-6 text-sm font-semibold text-gray-700">Email</th>
                      <th className="py-4 px-6 text-sm font-semibold text-gray-700">Role</th>
                      <th className="py-4 px-6 text-sm font-semibold text-gray-700">
                        Books Borrowed
                      </th>
                      <th className="py-4 px-6 text-sm font-semibold text-gray-700">Joined At</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredUsers.map((user, index) => (
                      <tr
                        key={user._id}
                        className="hover:bg-gray-50 transition border-b border-gray-200"
                      >
                        <td className="py-4 px-6 text-sm text-gray-700">
                          {index + 1}
                        </td>

                        <td className="py-4 px-6 text-sm text-gray-900 font-medium">
                          {user.name || "N/A"}
                        </td>

                        <td className="py-4 px-6 text-sm text-gray-700">
                          {user.email}
                        </td>

                        {/* Role Badge */}
                        <td className="py-4 px-6 text-sm">
                          <span
                            className={`
                            px-3 py-1 rounded-full text-white text-xs font-semibold
                            ${user.role === "admin" ? "bg-red-500" :
                              user.role === "librarian" ? "bg-green-600" :
                              "bg-blue-600"}
                          `}
                          >
                            {user.role}
                          </span>
                        </td>

                        {/* Borrow count badge */}
                        <td className="py-4 px-6 text-sm">
                          <span className="px-3 py-1 bg-gray-200 rounded-full text-gray-800 text-xs font-semibold">
                            {user.borrowedBooks?.length || 0}
                          </span>
                        </td>

                        <td className="py-4 px-6 text-sm text-gray-700">
                          {formatDate(user.createdAt)}
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="py-16 text-center text-gray-500 text-lg">
                No registered users found.
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Users;
