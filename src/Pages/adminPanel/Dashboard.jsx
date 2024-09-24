// import { useSelector } from "react-redux";

// const Dashboard = () => {
//   const { user } = useSelector((state) => state.auth)
//   console.log(user)
//   return <div>Dashboard</div>;
// };

// export default Dashboard;

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Navbar from '../navbar/Navbar';

const Dashboard = () => {
  const [userData, setUserData] = useState({ lastLogin: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data);
      } catch (err) {
        console.log(err)
        setError('Failed to load user data.');
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  // Parse and format last login date correctly
  const formatLastLogin = (lastLogin) => {
    const date = new Date(lastLogin);
    if (!isNaN(date.getTime())) {
      return date.toLocaleString(); // Customize formatting as needed
    }
    return 'N/A'; // Fallback in case of invalid date
  };

  return (



    <div className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} min-h-screen w-screen p-6`}>
       <Navbar/>
      <div className="container mx-auto">

        <h1 className="text-3xl font-bold text-center mb-6">Dashboard</h1>
     
        {loading ? (
          <p className="text-center text-blue-600">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : (
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Welcome, {userData.name}!</h2>
            <p className="text-gray-700 dark:text-gray-300">Last Login: {formatLastLogin(userData.lastLogin)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
