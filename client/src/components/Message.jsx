const Message = ({ username, time, message }) => {
  return (
    <div
      style={{
        marginBottom: "0.3rem",
        marginTop: "0.8rem",
        padding: "0.6rem 1.2rem",
        minHeight: "5.5rem",
        minWidth: "40%",
        maxWidth: "80%",
        background: "black",
        borderRadius: "15px",
        flexShrink:0
      }}
    >
      <h1 style={{ fontSize: "0.9rem", fontWeight: "500" }}>
        {username}
        <span
          style={{
            marginLeft: "0.6rem",
            fontWeight: "400",
            fontSize: "0.7rem",
            color: "gray",
          }}
        >
          {time}
        </span>
      </h1>
      <p style={{ margin: "0.5rem 0.2rem", fontSize: "0.9rem" }}>{message}</p>
    </div>
  );
};

export default Message;
