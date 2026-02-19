import React, { useEffect, useState } from "react";
import adminIcon from "../assets/pointing.png";
import usersIcon from "../assets/people-black.png";
import bookIcon from "../assets/book-square.png";
import { Pie, Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
} from "chart.js";

import logo from "../assets/black-logo.png";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement
);

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.user);
  const { books } = useSelector((state) => state.book);
  const { allBorrowedBooks } = useSelector((state) => state.borrow);

  const [totalUser, setTotalUsers] = useState(0);
  const [totalAdmin, setTotalAdmin] = useState(0);
  const [totalBooks, setTotalBooks] = useState(0);
  const [totalBorrowedBooks, setTotalBorrowedBooks] = useState(0);
  const [totalReturnedBooks, setTotalReturnedBooks] = useState(0);
  const [overdueCount, setOverdueCount] = useState(0);

  useEffect(() => {
    let numberOfUsers = users.filter((u) => u.role === "User");
    let numberOfAdmins = users.filter((u) => u.role === "Admin");

    setTotalUsers(numberOfUsers.length);
    setTotalAdmin(numberOfAdmins.length);

    setTotalBooks(books?.length || 0);

    let borrowed = allBorrowedBooks.filter((b) => b.returnDate === null);
    let returned = allBorrowedBooks.filter((b) => b.returnDate !== null);

    setTotalBorrowedBooks(borrowed.length);
    setTotalReturnedBooks(returned.length);

    let overdue = borrowed.filter((b) => new Date(b.dueDate) < new Date());
    setOverdueCount(overdue.length);
  }, [users, books, allBorrowedBooks]);


  const pieData = {
    labels: ["Borrowed Books", "Returned Books"],
    datasets: [
      {
        data: [totalBorrowedBooks, totalReturnedBooks],
        backgroundColor: ["#3B82F6", "#10B981"],
        hoverBackgroundColor: ["#1D4ED8", "#059669"],
        borderWidth: 2,
      },
    ],
  };

 
  const monthlyCount = Array(12).fill(0);
  allBorrowedBooks.forEach((item) => {
    const month = new Date(item.borrowDate).getMonth();
    monthlyCount[month] += 1;
  });

  const lineChartData = {
    labels: [
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec"
    ],
    datasets: [
      {
        label: "Books Borrowed",
        data: monthlyCount,
        borderColor: "#3B82F6",
        backgroundColor: "#93C5FD",
        tension: 0.3,
      },
    ],
  };


  const bookFrequency = {};
  allBorrowedBooks.forEach((item) => {
    if (!bookFrequency[item.bookTitle]) bookFrequency[item.bookTitle] = 0;
    bookFrequency[item.bookTitle]++;
  });

  const topBooks = Object.entries(bookFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  
  const recentBorrowList = [...allBorrowedBooks]
    .sort((a, b) => new Date(b.borrowDate) - new Date(a.borrowDate))
    .slice(0, 5);

  return (
    <div className="p-6 w-full max-w-7xl mx-auto">

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <img src={logo} alt="logo" className="w-10" />
          Admin Dashboard
        </h1>

    
        <div className="flex items-center gap-3 bg-white p-2 px-4 rounded-xl shadow border">
          <img
            src={
              user?.avatar?.url ||
              "/default-avatar.png"
            }
            alt="avatar"
            className="w-12 h-12 rounded-full object-cover border shadow"
          />

          <p className="text-gray-700 text-lg font-medium">
            Welcome, <span className="text-blue-600">{user?.name}</span>
          </p>
        </div>
      </div>


      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
    
        <div className="bg-white shadow-lg rounded-xl p-5 border">
          <div className="flex items-center gap-4">
            <img src={usersIcon} className="w-12" />
            <div>
              <p className="text-gray-500 text-sm">Users</p>
              <h2 className="text-2xl font-bold">{totalUser}</h2>
            </div>
          </div>
        </div>


        <div className="bg-white shadow-lg rounded-xl p-5 border">
          <div className="flex items-center gap-4">
            <img src={adminIcon} className="w-12" />
            <div>
              <p className="text-gray-500 text-sm">Admins</p>
              <h2 className="text-2xl font-bold">{totalAdmin}</h2>
            </div>
          </div>
        </div>

      
        <div className="bg-white shadow-lg rounded-xl p-5 border">
          <div className="flex items-center gap-4">
            <img src={bookIcon} className="w-12" />
            <div>
              <p className="text-gray-500 text-sm">Total Books</p>
              <h2 className="text-2xl font-bold">{totalBooks}</h2>
            </div>
          </div>
        </div>


        <div className="bg-white shadow-lg rounded-xl p-5 border">
          <p className="text-gray-500 text-sm">Borrowed</p>
          <h2 className="text-2xl font-bold">{totalBorrowedBooks}</h2>
        </div>

 
        <div className="bg-white shadow-lg rounded-xl p-5 border bg-red-50">
          <p className="text-red-500 text-sm">Overdue</p>
          <h2 className="text-2xl font-bold text-red-600">{overdueCount}</h2>
        </div>
      </div>

   
      <div className="grid lg:grid-cols-2 gap-10 mb-12">
        <div className="bg-white shadow-xl rounded-xl p-6 border">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Borrowed vs Returned
          </h2>
          <Pie data={pieData} />
        </div>

        <div className="bg-white shadow-xl rounded-xl p-6 border">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Monthly Borrow Trend
          </h2>
          <Line data={lineChartData} />
        </div>
      </div>

      <div className="bg-white shadow-xl rounded-xl p-6 border mb-10">
        <h2 className="text-xl font-semibold mb-4">Top 5 Most Borrowed Books</h2>
        {topBooks.map(([title, count], index) => (
          <p key={index} className="text-gray-700 mb-2">
            <span className="font-bold">{index + 1}. {title}</span> — {count} borrows
          </p>
        ))}
      </div>

    
      <div className="bg-white shadow-xl rounded-xl p-6 border">
        <h2 className="text-xl font-semibold mb-4">Recent Borrow Activity</h2>

        {recentBorrowList.map((item) => (
          <div
            key={item._id}
            className="flex justify-between border-b py-3 last:border-none"
          >
            <p className="font-medium">{item.bookTitle}</p>
            <p className="text-gray-600">{item.userEmail}</p>
            <p className="text-gray-600">
              {new Date(item.borrowDate).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
