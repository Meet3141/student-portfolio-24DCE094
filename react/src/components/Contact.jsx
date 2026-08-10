import { useState } from "react";

function Contact() {
  const [message, setMessage] = useState("");
  const [showHelp, setShowHelp] = useState(false);

  return (
    <section className="section contact">
      <h2>Contact Me</h2>

      <p>Feel free to send me a message.</p>

      <label htmlFor="message">Your Message:</label>

      <textarea
        id="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here..."
        rows="5"
      />

      <p>
        Characters: <strong>{message.length}</strong>
      </p>

      <button onClick={() => setShowHelp(!showHelp)}>
        {showHelp ? "Hide Help" : "Show Help"}
      </button>

      {showHelp && (
        <p className="help">
          Please enter your message in the box above.
        </p>
      )}

      <h3>Live Preview</h3>

      <p className="preview">
        {message || "Your message will appear here..."}
      </p>
    </section>
  );
}

export default Contact;
