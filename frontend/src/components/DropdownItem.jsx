import { Link } from 'react-router-dom';

const DropdownItem = ({ children, to }) => {
  return (
    <li>
      <Link to={to} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
        {children}
      </Link>
    </li>
  );
};

export default DropdownItem;