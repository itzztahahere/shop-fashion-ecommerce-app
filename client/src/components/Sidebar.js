// Sidebar.js
import React from 'react';
import { FaTachometerAlt, FaBox, FaUserFriends, FaShoppingCart, FaCog } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { useUser } from '../context/userAuth';
import { Link, useNavigate } from 'react-router-dom';


const Sidebar = () => {
    const navigate = useNavigate();
    const { isLoggedIn, logout } = useUser();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };
    const menuItems = [
        { name: 'Dashboard', icon: <FaTachometerAlt />, path: '/dashboard' },
        { name: 'Products', icon: <FaBox />, path: '/dashboard/products' },
        { name: 'Add Product', icon: <FaBox />, path: '/dashboard/add-product' },
        { name: 'Subscribers', icon: <FaUserFriends />, path: '/dashboard/subscribers' },
        // { name: 'Orders', icon: <FaShoppingCart />, path: '/orders' },
        // { name: 'Order History', icon: <FaShoppingCart />, path: '/order-history' },
    ];

    return (
        <div style={styles.sidebar}>
            <h4>SOFT</h4><hr />
            {menuItems.map((item, index) => (
                <NavLink
                    key={index}
                    to={item.path}
                    style={({ isActive }) => ({
                        ...styles.menuItem,
                        backgroundColor: isActive ? '#333' : 'transparent'
                    })}
                >
                    {item.icon} <span>{item.name}</span>
                </NavLink>
            ))}
            {isLoggedIn && (
                <button onClick={handleLogout}style={{textAlign:'left',backgroundColor:'transparent',border:'none',color:'white',margin:'0'}}>Logout</button>

            )}

        </div>
    );
};

const styles = {
    sidebar: {
        width: '250px',
        background: '#282c34',
        height: '120vh',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        padding: '1rem',
    },
    menuItem: {
        display: 'flex',
        alignItems: 'center',
        color: '#fff',
        padding: '10px',
        textDecoration: 'none',
        margin: '5px 0',
        borderRadius: '5px',
    },
};

export default Sidebar;
