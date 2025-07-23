import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { toast } from "react-toastify";

const PrivateRoute = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user === null) {
      toast.info("Please login to access this page", {
        position: "top-center",
        autoClose: 2000,
      });

      const timer = setTimeout(() => {
        navigate("/login");
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [user, navigate]);

  if (user === undefined) return <div>Loading...</div>;

  if (user) return children;

  return null;
};

export default PrivateRoute;