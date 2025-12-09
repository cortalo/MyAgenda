import Link from "next/link";
import { auth } from "../_lib/auth";
import {
  getUser,
  insertData,
  updateUserImage,
  updateUserName,
} from "../_lib/data-service";

async function Header() {
  const session = await auth();
  if (session?.user?.email) {
    const user = await getUser(session.user.email);
    if (user.length === 0) {
      try {
        insertData("users", {
          email: session.user.email,
          name: session.user.name,
          image: session.user.image,
        });
      } catch (error) {
        console.log("failed: ", error);
      }
    } else {
      if (user[0].name != session.user.name) {
        updateUserName("users", user[0].id, session.user.name);
      }
      if (user[0].image != session.user.image) {
        updateUserImage("users", user[0].id, session.user.image);
      }
    }
  }

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
