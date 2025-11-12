function Header() {
  return (
    <header className="bg-dark sticky-top">
      <div className="container">
        <nav className="navbar navbar-expand-md navbar-dark">
          <div
            className="navbar-nav w-100 d-flex flex-column flex-md-row"
            id="navbarSupportedContent"
          >
            <a className="nav-link ml-3" href="/index">
              Register
            </a>
            <a className="nav-link ml-3" href="/index">
              Login
            </a>
            <a className="nav-link ml-3" href="/index">
              Logout
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
