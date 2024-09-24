// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useSelector } from 'react-redux';
// import Navbar from '../navbar/Navbar';
// import ThemeToggle from '../../utils/themeToggle.jsx'; // Adjust the import path as necessary



// const Notifications = () => {
//   const [notifications, setNotifications] = useState([]); // Initialize notifications as an array
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const theme = useSelector((state) => state.theme.theme);

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get('/api/users/notifications', {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         // Ensure notifications is an array, fallback to an empty array
//         setNotifications(Array.isArray(response.data) ? response.data : []);
//       } catch (err) {
//         setError('Failed to load notifications.');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchNotifications();
//   }, []);

//   return (
//     <div className={`${theme} min-h-screen w-screen bg-gray-100 p-6`}>
//       <Navbar />
//       <ThemeToggle /> 

//       <div className="container mx-auto">
//         <h1 className="text-3xl font-bold text-center mb-6">Notifications</h1>

//         {loading ? (
//           <p className="text-center text-blue-600">Loading...</p>
//         ) : error ? (
//           <p className="text-center text-red-600">{error}</p>
//         ) : notifications.length > 0 ? (
//           <ul className="space-y-4">
//             {notifications.map((notification) => (
//               <li
//                 key={notification._id}
//                 className="bg-white shadow-md rounded-lg p-4"
//               >
//                 <p className="text-lg font-medium">{notification.message}</p>
//                 <span className="text-sm text-gray-500">
//                   {new Date(notification.date).toLocaleString()}
//                 </span>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-center text-gray-500">No notifications found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Notifications;

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Navbar from '../navbar/Navbar';
import ThemeToggle from '../../utils/themeToggle.jsx'; // Adjust the import path as necessary

const Notifications = () => {
  const [notifications, setNotifications] = useState([]); // Initialize notifications as an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/users/notifications', {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Ensure notifications is an array, fallback to an empty array
        setNotifications(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.log(err)
        setError('Failed to load notifications.');
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  return (
    <div
      className={`${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
      } min-h-screen w-screen p-6`}
    >
      <Navbar />
      <ThemeToggle />

      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Notifications</h1>

        {loading ? (
          <p className="text-center text-blue-600">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : notifications.length > 0 ? (
          <ul className="space-y-4">
            {notifications.map((notification) => (
              <li
                key={notification._id}
                className={`${
                  theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'
                } shadow-md rounded-lg p-4`}
              >
                <p className="text-lg font-medium">{notification.message}</p>
                <span className="text-sm text-gray-500">
                  {new Date(notification.date).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No notifications found.</p>
        )}
      </div>
    </div>
  );
};

export default Notifications;
