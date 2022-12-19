import React from "react";

const Message = (props) => {

  let imgOrder = { order: 0 };
  let cls_nm = "msg-container agent";
  let imgSrc = "https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg";
  if (props.sender === "user") {
    imgOrder = { order: 2 };
    cls_nm = "msg-container user";
    imgSrc = "https://image.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg";
  }

  return (
    <>
      {props.sender === "notify" ? (<span className="notify-msg">{props.message}</span>) :
       (<div className={cls_nm}>
        <div className="msg-line">
          <img src={imgSrc} alt={props.sender} className="image" style={imgOrder} />
          <p>{props.message}</p>
        </div>
        <small className="time">{props.time}</small>
      </div>)}
    </>
  );
};

export default Message;
