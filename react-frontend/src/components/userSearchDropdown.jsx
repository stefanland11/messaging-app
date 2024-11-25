import { useState, useEffect } from "react";
import "../style/dropdown.css";
import searchIcon from "../assets/search.svg";

function UserSearchDropdown({ currentUser }) {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:3000/api/users", {
      method: "GET",
      mode: "cors",
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("server error");
        }
        return response.json();
      })
      .then((response) => {
        setUsers(response.data);
        setFilteredUsers(response.data);
      })
      .catch((error) => setError(error));
  }, []);

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) &&
        user.id !== currentUser.id
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users, currentUser]);

  const toggleIsVisible = () => {
    const toggle = !isVisible;
    setIsVisible(toggle);
  };

  const handleAddFriend = (recipientId) => {
    const bodyData = {
      recipientId: recipientId,
      type: "FRIEND_REQUEST",
    };
    fetch(`http://localhost:3000/api/notification`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bodyData),
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("server error");
        }
        return response.json();
      })
      .then((response) => {
        window.alert(response.message);
      })
      .catch((error) => setError(error));
  };

  return (
    <div style={{ position: "relative" }}>
      {isVisible && (
        <input
          type="text"
          placeholder="Search for a user..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      )}
      <button className="navbar-buttons" onClick={toggleIsVisible}>
        <img src={searchIcon}></img>
      </button>
      {searchTerm && filteredUsers.length > 0 && (
        <ul className="dropdown-menu">
          {filteredUsers.map((user) => (
            <li key={user.id} className="dropdown-item">
              <span>{user.username}</span>
              <button
                className="dropdown-button"
                onClick={() => handleAddFriend(user.id)}
              >
                Add Friend
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserSearchDropdown;
