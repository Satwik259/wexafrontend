import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="flex justify-around p-4 bg-gray-800 text-white">
      <Link to="/" className="hover:text-yellow-400">Dashboard</Link>
      <Link to="/profile" className="hover:text-yellow-400">Profile</Link>
      <Link to="/friends" className="hover:text-yellow-400">Friends</Link>
      <Link to="/notifications" className="hover:text-yellow-400">Notifications</Link>
    </nav>
  );
};

export default Navbar;
