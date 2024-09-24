import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../feautures/theme/themeSlice';

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  return (
    <button
      className="p-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-700"
      onClick={() => dispatch(toggleTheme())}
    >
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  );
}

export default ThemeToggle;
