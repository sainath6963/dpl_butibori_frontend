import React, { useEffect, useState } from "react";
import logo_with_title from "../assets/logo-with-title-black.png";
import returnIcon from "../assets/redo.png";
import browseIcon from "../assets/pointing.png";
import bookIcon from "../assets/book-square.png";

import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
} from "chart.js";

import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement
);

const UserDashboard = () => {
  const { userBorrowedBooks } = useSelector((state) => state.borrow);
  const { user } = useSelector((state) => state.auth);

  const [totalBorrowedBooks, setTotalBorrowedBooks] = useState(0);
  const [totalReturnedBooks, setTotalReturnedBooks] = useState(0);

  const [borrowCounter, setBorrowCounter] = useState(0);
  const [returnCounter, setReturnCounter] = useState(0);

  useEffect(() => {
    const borrowed = userBorrowedBooks.filter((book) => !book.returned);
    const returned = userBorrowedBooks.filter((book) => book.returned);

    setTotalBorrowedBooks(borrowed.length);
    setTotalReturnedBooks(returned.length);

    let i = 0;
    const interval = setInterval(() => {
      if (i <= borrowed.length) setBorrowCounter(i);
      if (i <= returned.length) setReturnCounter(i);
      i++;
    }, 30);

    return () => clearInterval(interval);
  }, [userBorrowedBooks]);

  const pieData = {
    labels: ["Borrowed Books", "Returned Books"],
    datasets: [
      {
        data: [totalBorrowedBooks, totalReturnedBooks],
        backgroundColor: ["#3B82F6", "#10B981"],
        hoverBackgroundColor: ["#1D4ED8", "#059669"],
        borderWidth: 2,
        hoverOffset: 12,
      },
    ],
  };

  return (
    <div className="p-6 w-full max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900">
            Welcome Back, <span className="text-blue-600">{user?.name}</span>
          </h1>
          <p className="text-gray-600 mt-1 text-lg">
            Track your reading progress and activity
          </p>
        </div>

        <img
          src={logo_with_title}
          alt="logo"
          className="w-48 opacity-80 hover:opacity-100 transition"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-7 rounded-3xl shadow-lg border hover:shadow-2xl hover:scale-[1.03] transition-transform duration-300">
          <div className="flex items-center gap-4">
            <img src={bookIcon} alt="borrowed" className="w-14 drop-shadow" />
            <div>
              <h2 className="text-gray-600 font-medium">Borrowed Books</h2>
              <p className="text-4xl font-extrabold text-blue-600">
                {borrowCounter}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-7 rounded-3xl shadow-lg border hover:shadow-2xl hover:scale-[1.03] transition-transform duration-300">
          <div className="flex items-center gap-4">
            <img src={returnIcon} alt="returned" className="w-14 drop-shadow" />
            <div>
              <h2 className="text-gray-600 font-medium">Returned Books</h2>
              <p className="text-4xl font-extrabold text-green-600">
                {returnCounter}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-7 rounded-3xl shadow-lg border hover:shadow-2xl hover:scale-[1.03] transition-transform duration-300">
          <div className="flex items-center gap-4">
            <img src={browseIcon} alt="activity" className="w-14 drop-shadow" />
            <div>
              <h2 className="text-gray-600 font-medium">Total Activity</h2>
              <p className="text-4xl font-extrabold text-purple-600">
                {borrowCounter + returnCounter}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border p-10 max-w-2xl mx-auto hover:shadow-2xl transition duration-300">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Reading Stats Overview
        </h2>

        <Pie
          data={pieData}
          className="mx-auto"
          options={{
            plugins: {
              legend: { position: "bottom", labels: { padding: 20 } },
            },
          }}
        />
      </div>

      {userBorrowedBooks.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Recent Activity
          </h2>

          <div className="space-y-4">
            {userBorrowedBooks.slice(0, 3).map((item) => (
              <div
                key={item._id}
                className="p-5 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border hover:shadow-lg transition flex justify-between"
              >
                <div>
                  <p className="text-gray-700 font-medium">
                    Book ID: <span className="font-bold">{item.bookId}</span>
                  </p>

                  <p className="text-gray-600 text-sm">
                    Borrowed On:{" "}
                    {new Date(item.borrowedDate).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  {item.returned ? (
                    <span className="px-4 py-1 text-green-700 bg-green-200 rounded-xl font-semibold">
                      Returned
                    </span>
                  ) : (
                    <span className="px-4 py-1 text-red-700 bg-red-200 rounded-xl font-semibold">
                      Not Returned
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {userBorrowedBooks.length === 0 && (
        <p className="text-gray-500 mt-12 text-center text-lg">
          No activity yet. Start borrowing books to see insights here!
        </p>
      )}
    </div>
  );
};

export default UserDashboard;
