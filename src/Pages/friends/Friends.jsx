// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useSelector } from 'react-redux';
// import Navbar from '../navbar/Navbar';

// const Friends = () => {
//   const [friends, setFriends] = useState([]); // Ensuring friends is initialized as an empty array
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const theme = useSelector((state) => state.theme.theme);

//   useEffect(() => {
//     const fetchFriends = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get('/api/users/friends', {
//           headers: { Authorization: `Bearer ${token}` }
//         });

//         // Ensure that we set an array, even if the response data is undefined or null
//         setFriends(Array.isArray(response.data) ? response.data : []);
//       } catch (err) {
//         setError('Failed to load friends.');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchFriends();
//   }, []);

//   return (
//     <div className={`${theme} min-h-screen w-screen bg-gray-100 p-6`}>
//       <Navbar />
//       <div className="container mx-auto">
//         <h1 className="text-3xl font-bold text-center mb-6">Friends List</h1>

//         {loading ? (
//           <p className="text-center text-blue-600">Loading...</p>
//         ) : error ? (
//           <p className="text-center text-red-600">{error}</p>
//         ) : friends.length > 0 ? (
//           <ul className="space-y-4">
//             {friends.map((friend) => (
//               <li
//                 key={friend._id}
//                 className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center"
//               >
//                 <div>
//                   <h2 className="text-xl font-semibold">{friend.name}</h2>
//                   <p className="text-gray-600">{friend.email}</p>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-center text-gray-500">You have no friends added.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Friends;

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Navbar from '../navbar/Navbar';
import ThemeToggle from '../../utils/themeToggle.jsx'; // Adjust the import path as necessary

const Friends = () => {
  const [friends, setFriends] = useState([]); // Ensuring friends is initialized as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/users/friends', {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Ensure that we set an array, even if the response data is undefined or null
        setFriends(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        setError('Failed to load friends.');
      } finally {
        setLoading(false);
      }
    };
    fetchFriends();
  }, []);

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} min-h-screen w-screen p-6`}>
      <Navbar />
      <ThemeToggle /> {/* Add the ThemeToggle button here */}
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Friends List</h1>

        {loading ? (
          <p className="text-center text-blue-600">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : friends.length > 0 ? (
          <ul className="space-y-4">
            {friends.map((friend) => (
              <li
                key={friend._id}
                className={`bg-white shadow-md rounded-lg p-4 flex justify-between items-center ${
                  theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'
                }`}
              >
                <div>
                  <h2 className="text-xl font-semibold">{friend.name}</h2>
                  <p className="text-gray-600">{friend.email}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">You have no friends added.</p>
        )}
      </div>
    </div>
  );
};

export default Friends;
