import { Link } from 'react-router-dom';
import "./NavBar.css";

export default function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          <img src="/android-chrome-512x512.png" alt="Headliner" className="navbar-logo-image" />
        </Link>
      </div>
      <div className="navbar-right">
        <Link to="/recent" className="navbar-link">Recent</Link>
        <Link to="/gallery" className="navbar-link">Gallery</Link>
      </div>
    </nav>
  );
}
