import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { FaFileAlt, FaChartLine, FaUserFriends, FaUser, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { fetchToken } from './Auth.js'; // Import fetchToken function from Auth.js
import { jwtDecode } from 'jwt-decode'; // Import jwt_decode from jwt-decode package

function Dashboard() {
    const navigate = useNavigate();
    const signOut = () => {
        localStorage.removeItem('Token');
        navigate("/Adminlogin");
    };

    const [userName, setUserName] = useState('');

    useEffect(() => {
        const userToken = fetchToken(); // Get token from local storage
        if (userToken) {
            // Decode token to extract user's name
            const decodedToken = jwtDecode(userToken); // Decode the token
            if (decodedToken && decodedToken.name) {
                setUserName(decodedToken.name);
            }
        }
    }, []);

    return (
        <div className="dashboard-container" style={{ backgroundColor: '#ffffff' }}> {/* Apply a unique class name and background color */}
            <div className="container-fluid">
                <div className="row flex-nowrap">
                    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                            <a href="/" className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none">
                                <img src="images/logo.png" alt="Office of the City Engineer" className="fs-5 fw-bolder d-none d-sm-inline" width="100" height="100" />
                            </a>
                            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                                <li>
                                    <Link to="/" className="nav-link text-white px-0 align-middle">
                                        <FaChartLine className="me-2" />
                                        <span className="ms-1 d-none d-sm-inline">Dashboard</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/admin" className="nav-link px-0 align-middle text-white">
                                        <FaUserFriends className="me-2" />
                                        <span className="ms-1 d-none d-sm-inline">Admins</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/employee" className="nav-link px-0 align-middle text-white">
                                        <FaUserFriends className="me-2" />
                                        <span className="ms-1 d-none d-sm-inline">Employees</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/permitform" className="nav-link px-0 align-middle text-white">
                                        <FaFileAlt className="me-2" />
                                        <span className="ms-1 d-none d-sm-inline">Permits</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/profile" className="nav-link px-0 align-middle text-white">
                                        <FaUser className="me-2" />
                                        <span className="ms-1 d-none d-sm-inline">Profile</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col p-0 m-0">
                        <div className='p-2 d-flex justify-content-between align-items-center shadow'>
                            <h4>Record Monitoring System</h4>
                            <div className="dropdown">
                                <button className="btn btn-outline-dark dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                    <FaUserCircle className="me-2" />
                                    Hi, {userName}
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <li>
                                        <Link to="/profile" className="dropdown-item">
                                            <FaUser className="me-2" />
                                            Profile
                                        </Link>
                                    </li>
                                    <hr className="dropdown-divider" />
                                    <li>
                                        <button className="dropdown-item" onClick={signOut}>
                                            <FaSignOutAlt className="me-2" />
                                            Sign Out
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
