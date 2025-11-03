import "./message.css";

export default function Message({ msg, type }) {
  return (
    <div className={`message ${type}`}>
      <p>{msg}</p>
    </div>
  );
}
