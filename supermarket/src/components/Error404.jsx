import { Link, useNavigate } from 'react-router-dom'
import Hero from "./Partials/Hero";

const Error404 = () => {
  let navigate = useNavigate();
  setTimeout(() => {
    if (
      window.location.pathname === "/admin" ||
      window.location.pathname === "/profile"
    ) {
      if (
        localStorage.getItem("login") &&
        localStorage.getItem("role") === "Admin"
      )
        navigate("/admin");
      else if (localStorage.getItem("login")) navigate("/profile");
    }
  }, 500);

  return (
    <>
      {/* <!-- 404 Start --> */}
      <Hero title="404!!! Page Not Found" />
      <div className="container-fluid py-5">
        <div className="container py-5 text-center">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <i className="bi bi-exclamation-triangle display-1 text-secondary"></i>
              <h1 className="display-1">404</h1>
              <h1 className="mb-4">Page Not Found</h1>
              <p className="mb-4">
                We’re sorry, the page you have looked for does not exist in our
                website! Maybe go to our home page or try to use a search?
              </p>
              <Link
                className="btn border-secondary rounded-pill py-3 px-5"
                to="/"
              >
                Go Back To Home
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- 404 End --> */}
    </>
  );
};

export default Error404;
