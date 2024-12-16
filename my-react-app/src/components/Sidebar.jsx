import "./Sidebar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch, faCompass, faFilm, faEnvelope, faHeart, faUser, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import logo from '../images/iglogo.png';

function Sidebar() {
    return (
        <>
            <div className="sidebar">
                <div className="sidebar-logo">
                    <img src= {logo} alt="Instagram Logo" />
                </div>
                <div className="sidebar-links">
                    <a href="#home"><FontAwesomeIcon icon={faHome} /> Home</a>
                    <a href="#search"><FontAwesomeIcon icon={faSearch} /> Search</a>
                    <a href="#explore"><FontAwesomeIcon icon={faCompass} /> Explore</a>
                    <a href="#reels"><FontAwesomeIcon icon={faFilm} /> Reels</a>
                    <a href="#messages"><FontAwesomeIcon icon={faEnvelope} /> Messages</a>
                    <a href="#notifications"><FontAwesomeIcon icon={faHeart} /> Notifications</a>
                    <a href="#profile"><FontAwesomeIcon icon={faUser} /> Profile</a>
                    <a href="#more"><FontAwesomeIcon icon={faEllipsisH} /> More</a>
                </div>
            </div>
        </>
    );
}

export default Sidebar;