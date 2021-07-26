const UsersChange = ({ msgData }) => {
  
    const message =
    msgData.action === "joined"
      ? `${msgData.username} just joined the chat`
      : `${msgData.username} has left the chat`;
  return (
    <div
      style={{
        background: "#494c52",
        color: "white",
        fontSize: "0.8rem",
        padding: "0.2rem 0.6rem",
        minWidth: "20%",
        borderRadius: "5px",
        fontWeight: "500",
        margin:'0.4rem 0'
      }}
    >
      {message}
    </div>
  );
};

export default UsersChange;
