import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch, faCompass, faFilm, faEnvelope, faHeart, faUser, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import logo from '../images/iglogo.png';

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar-logo">
                <img src={logo} alt="Instagram Logo" />
            </div>
            <div className="sidebar-links">
                <NavLink 
                    to="/feed"  // Change this to "/feed" to navigate to the Feed page
                    className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"} 
                    end
                >
                    <FontAwesomeIcon icon={faHome} /> Home
                </NavLink>
                <NavLink 
                    to="/search" 
                    className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}
                >
                    <FontAwesomeIcon icon={faSearch} /> Search
                </NavLink>
                <NavLink 
                    to="/explore" 
                    className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}
                >
                    <FontAwesomeIcon icon={faCompass} /> Explore
                </NavLink>
                <NavLink 
                    to="/reels" 
                    className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}
                >
                    <FontAwesomeIcon icon={faFilm} /> Reels
                </NavLink>
                <NavLink 
                    to="/messages" 
                    className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}
                >
                    <FontAwesomeIcon icon={faEnvelope} /> Messages
                </NavLink>
                <NavLink 
                    to="/notifications" 
                    className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}
                >
                    <FontAwesomeIcon icon={faHeart} /> Notifications
                </NavLink>
                <NavLink 
                    to="/profile" 
                    className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}
                >
                    <FontAwesomeIcon icon={faUser} /> Profile
                </NavLink>
                <NavLink 
                    to="/more" 
                    className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}
                >
                    <FontAwesomeIcon icon={faEllipsisH} /> More
                </NavLink>
            </div>
        </div>
    );
}

export default Sidebar;
