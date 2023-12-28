import React from 'react';
import NavItem from './NavItem';
import Dropdown from './Dropdown';
import DropdownItem from './DropdownItem';

const Navbar = () => {
    return (
        <div className='flex items-start space-x-4 bg-white p-5'>
            <NavItem to="/">Main</NavItem>
            <NavItem to="/profile">Profile</NavItem>
            <Dropdown title="Universities" defaultLink="/universities">
                <DropdownItem to="/universities">Universities</DropdownItem>
                <DropdownItem to="/universities-map">Universities Map</DropdownItem>
            </Dropdown>
            <NavItem to="/messenger">Messages</NavItem>
            <NavItem to="/review">Review student applications</NavItem>

        </div>
    );
}
    
export default Navbar;