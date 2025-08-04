import React, { useState } from "react";

export default function Chat({ backendUrl }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  async function sendMessage(e) {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");

    try {
      const res = await fetch(backendUrl + "/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setMessages((msgs) => [...msgs, { role: "bot", content: data.reply }]);
    } catch (err) {
      setMessages((msgs) => [
        ...msgs,
        { role: "bot", content: "Sorry, something went wrong." },
      ]);
    }
  }

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`message ${m.role === "user" ? "user" : "bot"}`}
          >
            <b>{m.role === "user" ? "You:" : "Code Bot:"}</b> {m.content}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="chat-form">
        <input
          type="text"
          value={input}
          placeholder="Ask me anything..."
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
