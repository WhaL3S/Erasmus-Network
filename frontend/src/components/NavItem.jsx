import React from 'react';
import { Link } from 'react-router-dom';

const NavItem = ({ to, children }) => {
    return (
        <Link to={to} className="font-bold text-xl text-black hover:text-gray-700">
            {children}
        </Link>
    );
};

export default NavItem;