import { useState } from "react";
import "../style/notifications.css";
import bellIcon from "../assets/bell-fill.svg";

const Notifications = ({ notifications, getUserData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState();

  const toggleNotifications = () => {
    const toggle = !isOpen;
    //read notifications on close
    if (isOpen) {
      setNotificationsRead();
    }
    setIsOpen(toggle);
    getUserData();
  };

  const setNotificationsRead = () => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:3000/api/notification", {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
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
        console.log(response);
      })
      .catch((error) => setError(error));
  };

  const handleAccept = (userId, sentById) => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:3000/api/acceptFriendRequest", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId, sentById }),
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("server error");
        }
        return response.json();
      })
      .then((response) => {
        console.log("sent");
      })
      .catch((error) => setError(error));
  };

  const handleIgnore = (id) => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:3000/api/notification/${id}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
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
        console.log(response);
        getUserData();
      })
      .catch((error) => setError(error));
  };

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  return (
    <div className="notifications">
      <button className="navbar-buttons" onClick={toggleNotifications}>
        {unreadCount > 0 && (
          <span className="notification-count">{unreadCount}</span>
        )}
        <img src={bellIcon} alt="Notifications" />
      </button>

      {isOpen && (
        <div className="notifications-dropdown">
          {notifications.length === 0 ? (
            <p>No notifications</p>
          ) : (
            notifications.map((notification) => (
              <div key={notification.id} className="notification-item">
                <p>{notification.sentBy.username}</p>
                {notification.type === "FRIEND_REQUEST" ? (
                  <div className="actions">
                    <p>Friend Request from {notification.sentBy.username}</p>
                    <button
                      className="notifications-button"
                      onClick={() =>
                        handleAccept(notification.userId, notification.sentById)
                      }
                    >
                      ✔️
                    </button>
                    <button onClick={() => handleIgnore(notification.id)}>
                      ❌
                    </button>
                  </div>
                ) : notification.type === "MESSAGE" ? (
                  <>
                    <p>
                      {notification.sentBy.username} sent you a new message!
                    </p>
                    <button onClick={() => handleIgnore(notification.id)}>
                      ❌
                    </button>
                  </>
                ) : null}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Notifications;
