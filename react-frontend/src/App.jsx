import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import NewConversation from "./components/newConversation";
import ConversationsList from "./components/conversationsList";
import Conversation from "./components/conversation";

function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState();
  const [selectedConversation, setSelectedConversation] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getUserData(token);
    }
  }, []);

  const getUserData = async (token) => {
    fetch("http://localhost:3000/api/userData", {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("server error");
        }
        return response.json();
      })
      .then((response) => {
        setUser(response);
      })
      .catch((error) => setError(error));
  };

  const handleToken = () => {
    const token = localStorage.getItem("token");
    getUserData(token);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const handleConversationClick = (conversation) => {
    setSelectedConversation(conversation);
  };
  console.log(user);
  return (
    <>
      <div className="app">
        <Navbar
          user={user}
          handleToken={handleToken}
          handleLogout={handleLogout}
          getUserData={getUserData}
        />
        {user && (
          <>
            <div className="sidebar">
              <NewConversation friends={user.friends} />
              <ConversationsList
                user={user}
                handleConversationClick={handleConversationClick}
                getUserData={getUserData}
                setSelectedConversation={setSelectedConversation}
              />
            </div>
            <div className="conversation">
              <Conversation
                selectedConversation={selectedConversation}
                user={user}
                getUserData={getUserData}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
