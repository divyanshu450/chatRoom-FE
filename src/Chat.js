import React, { useState, useEffect } from "react";
import Message from "./Message";
import moment from "moment";
import ReactScrollableFeed from "react-scrollable-feed";
import io from "socket.io-client";

import Loader from "./components/loader/Loader";

var audio = new Audio("./assets/ting.mp3");

const socket = io("https://chatserver-9t43.onrender.com");

const Chat = () => {
  const [oldData, setData] = useState("");
  const [state, setstate] = useState([]);
  const [isConnected, setIsConnected] = useState(socket.connected);

  const typeMsg = (event) => {
    setData(event.target.value);
  };

  function notifyMe(data) {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      const notification = new Notification(`${data.name} : ${data.message}`);
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          const notification = new Notification(
            `${data.name} : ${data.message}`
          );
        }
      });
    }
  }

  const sendMsg = () => {
    if (oldData.trim() !== "") {
      let msgObj = {
        message: oldData,
        createdAt: moment().format(),
        sender: "user",
        _id: state.length + 1,
      };
      setstate((old) => {
        return [...old, msgObj];
      });
      socket.emit("send", oldData);
    }
    setData("");
  };

  const onsubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    const name = prompt("Enter your name to join");
    socket.emit("new-user-joined", name);

    socket.on("user-joined", (name) => {
      let msgObj = {
        message: `${name} Joined the chat`,
        createdAt: moment().format(),
        sender: "notify",
        _id: state.length + 1,
      };
      setstate((old) => {
        return [...old, msgObj];
      });
    });
    socket.on("receive", (data) => {
      audio.play();
      let msgObj = {
        message: `${data.name} : ${data.message}`,
        createdAt: moment().format(),
        sender: "receive",
        _id: state.length + 1,
      };
      setstate((old) => {
        return [...old, msgObj];
      });
      notifyMe(data);
    });
    socket.on("left", (name) => {
      let msgObj = {
        message: `${name} left the chat`,
        createdAt: moment().format(),
        sender: "notify",
        _id: state.length + 1,
      };
      setstate((old) => {
        return [...old, msgObj];
      });
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
    };
  }, []);

  return (
    <>
      {!isConnected && <Loader />}
      <div className="container">
        <div className="profile">
          <img
            src="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg"
            alt=""
            className="profile-pic"
          />
          <span className="profile-name">Agent</span>
        </div>
        <div className="messages">
          <div className="inhert">
            <ReactScrollableFeed className="messages">
              {state.map((msg_obj) => {
                return (
                  <Message
                    key={msg_obj._id}
                    message={msg_obj.message}
                    time={moment(msg_obj.createdAt).fromNow()}
                    sender={msg_obj.sender}
                  />
                );
              })}
            </ReactScrollableFeed>
          </div>
        </div>
        <form action="" className="input-btn" onSubmit={onsubmit}>
          <input
            type="text"
            name="msg"
            placeholder="Enter your message"
            value={oldData}
            onChange={typeMsg}
          />
          <button type="submit" className="send" onClick={sendMsg}>
            Send
          </button>
        </form>
      </div>
    </>
  );
};

export default Chat;
