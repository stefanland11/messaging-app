import Login from "./login";
import SignUp from "./sign-up";
import UserSearchDropdown from "./userSearchDropdown";
import Notifications from "./notifcations";
import { useState } from "react";

const Navbar = ({ user, handleToken, handleLogout, getUserData }) => {
  const [signUpActive, setSignUpActive] = useState(false);
  const toggleSignUp = () => {
    setSignUpActive((prev) => !prev);
  };
  return (
    <>
      {user ? (
        <div className="navbar">
          <p className="welcome">Hi, {user.username}!</p>
          <div className="nav-right">
            <UserSearchDropdown currentUser={user} />
            <Notifications notifications={user.notifications} getUserData={getUserData} />
            <button className="navbar-buttons" onClick={handleLogout}>Log Out</button>
          </div>
        </div>
      ) : signUpActive ? (
        <SignUp sendUserToParent={handleToken} toggleSignUp={toggleSignUp} />
      ) : (
        <Login sendUserToParent={handleToken} toggleSignUp={toggleSignUp} />
      )}
    </>
  );
};

export default Navbar;
