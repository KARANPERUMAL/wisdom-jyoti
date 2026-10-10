import logo from "../../assets/images/logo.png";
import { navItems } from "../../data/constants";

export function Navbar({ page, setPage, menuOpen, setMenuOpen, scrolled }) {
  return (
    <header className={scrolled ? "site-header header-v2 compact" : "site-header header-v2"}>
      <button className="brand brand-v2" onClick={() => setPage("home")} aria-label="Go to home">
        <img src={logo} alt="Wisdom Jyoti logo" />
        <span>
          <strong>Wisdom Jyoti</strong>
          <small>Preschool & Skill Development Center</small>
        </span>
      </button>

      <nav className={menuOpen ? "nav nav-v2 open" : "nav nav-v2"}>
        {navItems.map(([label, id]) => (
          <button
            className={page === id ? "active" : ""}
            key={id}
            onClick={() => setPage(id)}
          >
            {label}
          </button>
        ))}
      </nav>

      <button className="outline-action" onClick={() => setPage("contact")}>
        Enquiry <span aria-hidden="true">-&gt;</span>
      </button>

      <button
        className="menu-button"
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        <span />
        <span />
        <span />
      </button>
    </header>
  );
}

export default Navbar;
