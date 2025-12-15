import Link from "next/link";
import { auth } from "../_lib/auth";

async function Header() {
  const session = await auth();

  return (
    <header className="bg-dark sticky-top">
      <div className="container">
        <nav className="navbar navbar-expand-md navbar-dark">
          <div
            className="navbar-nav w-100 d-flex flex-column flex-md-row"
            id="navbarSupportedContent"
          >
            {session?.user?.email ? (
              <Link className="nav-link ml-3" href="/api/auth/signout">
                {`Logout (${session.user.name})`}
              </Link>
            ) : (
              <Link className="nav-link ml-3" href="/api/auth/signin">
                Login
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
