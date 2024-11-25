import { useState, useEffect } from "react";

function NewConversation( { friends, getUserData }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [error, setError] = useState([]);
  const token = localStorage.getItem("token");


  useEffect(() => {
    if (!friends) return;
    const filtered = friends.filter((friend) =>
      friend.friendOf.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);

  }, [searchTerm, friends]);

  
  const handleNewConversation = (friendId) => {
    
    fetch(`http://localhost:3000/api/conversation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ friendId }),
      })
        .then((response) => {
          if (response.status >= 400) {
            throw new Error("server error");
          }
          return response.json();
        })
        .then((response) => {
         console.log(response);
         getUserData();
        })
        .catch((error) => setError(error));
    };
  
    return (
      <div style={{ position: "relative" }}>
        <input
          type="text"
          placeholder="Search for a friend"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && filteredUsers.length > 0 && (
          <ul className="dropdown-menu">
            {filteredUsers.map((friend) => (
              <li key={friend.friendOfId} className="dropdown-item">
                <span>{friend.friendOf.username}</span>
                <button className="dropdown-button" onClick={() => handleNewConversation(friend.friendOfId)}>New Conversation</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
}

export default NewConversation;