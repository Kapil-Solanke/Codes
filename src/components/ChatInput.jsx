import React, { useState } from "react";
export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <div className="h-full ">
      <form className=" w-full px-2  " onSubmit={(event) => sendChat(event)}>
        <input
          type="text"
          placeholder="Type your message here"
          className="w-full border-2 border-[#1e4d91] px-2 py-2"
          onChange={(e) => setMsg(e.target.value)}
          onMouseEnter={(event) => sendChat(event)}
          value={msg}
        />
      </form>
    </div>
  );
}


