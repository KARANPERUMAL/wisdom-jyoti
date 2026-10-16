import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.webp";
import { navItems } from "../../data/constants";

export function Navbar({ menuOpen, setMenuOpen, scrolled, onOpenEnquiry }) {
  const navigate = useNavigate();

  const handleEnquiryClick = () => {
    if (setMenuOpen) setMenuOpen(false);
    if (onOpenEnquiry) {
      onOpenEnquiry();
    } else {
      navigate("/contact");
    }
  };

  const handleBrandClick = () => {
    if (setMenuOpen) setMenuOpen(false);
  };

  return (
    <header className={scrolled ? "site-header header-v2 compact" : "site-header header-v2"}>
      <Link
        to="/"
        className="brand brand-v2"
        onClick={handleBrandClick}
        aria-label="Wisdom Jyoti Preschool Home"
      >
        <img src={logo} alt="Wisdom Jyoti logo" />
        <span>
          <strong>Wisdom Jyoti</strong>
          <small>Preschool &amp; Skill Development Center</small>
        </span>
      </Link>

      <nav
        id="mobile-nav-drawer"
        className={menuOpen ? "nav nav-v2 open" : "nav nav-v2"}
        aria-label="Main navigation"
      >
        {navItems.map(([label, path]) => (
          <NavLink
            key={path}
            to={path}
            end={path === "/"}
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={() => setMenuOpen && setMenuOpen(false)}
          >
            {label}
          </NavLink>
        ))}
        <button
          type="button"
          className="nav-mobile-enquiry"
          onClick={handleEnquiryClick}
        >
          Admission Enquiry →
        </button>
      </nav>

      <button
        type="button"
        className="btn btn-neutral btn-outline outline-action"
        onClick={handleEnquiryClick}
      >
        Enquiry&nbsp;<span aria-hidden="true">-&gt;</span>
      </button>

      <button
        type="button"
        className={menuOpen ? "menu-button is-open" : "menu-button"}
        onClick={() => setMenuOpen((v) => !v)}
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={menuOpen}
        aria-controls="mobile-nav-drawer"
      >
        <span />
        <span />
        <span />
      </button>
    </header>
  );
}

export default Navbar;
