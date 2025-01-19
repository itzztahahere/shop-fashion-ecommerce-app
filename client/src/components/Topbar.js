
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import { useUser } from '../context/userAuth';
const TopBar = ({ userName }) => {
      const { isLoggedIn, logout } = useUser();
      const navigate = useNavigate();
      const handleLogout = () => {
        logout();
        navigate("/login");
      };
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    // Function for avatar click behavior
    const handleAvatarClick = () => {
        if (isLoggedIn) {
            setIsDropdownOpen(!isDropdownOpen); // Toggle the dropdown if logged in
        } else {
            navigate("/login"); // Redirect to login if not logged in
        }
    };
    const { auth, setAuth } = useUser();
    console.log(auth)
    return (
        <div style={styles.topBar}>
            <h2 style={styles.heading}>Welcome Back Admin {auth}</h2>
            <div style={styles.icons}>
                <FaBell style={styles.icon} />
                {/* <FaUserCircle style={styles.icon} />
                 */}
                <div className='user-avatar'>
                    <FaUserCircle size={18} onClick={handleAvatarClick} />  {/* User avatar icon */}
                    {isLoggedIn && isDropdownOpen && (
                        <div className="dropdown-menu">
                            <button onClick={handleLogout} className="dropdown-item">Logout</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const styles = {
    topBar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        background: '#f8f9fa',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    },
    heading: {
        margin: 0,
        fontSize: '20px',
        color: '#333',
    },
    icons: {
        display: 'flex',
        alignItems: 'center',
    },
    icon: {
        fontSize: '20px',
        marginLeft: '15px',
        cursor: 'pointer',
    },
};

export default TopBar;
