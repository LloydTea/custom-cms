import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const backendPaths = [
    "/dashboard",
    "/posts",
    "/profile",
    "/settings",
    "/create-post",
    "/pages",
    "/subscribers",
    "/media",
  ];

  const navigate = useNavigate();
  useEffect(() => {
    const currentPath = window.location.pathname;
    if (backendPaths.includes(currentPath)) {
      navigate(`/account${currentPath}`);
    }
  }, []);
  return (
    <div>
      <h2>404 - Not Found</h2>
      <p>The page you're looking for does not exist.</p>
    </div>
  );
}

export default ErrorPage;
