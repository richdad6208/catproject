import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loggedOut } from "../app/userSlice";
import { useNavigate } from "react-router-dom";
function Logout() {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(loggedOut());
      navigate("/");
    }
  }, []);
  return <div></div>;
}

export default Logout;
