const Notification = ({ oData }) => {
  if (oData?.message === null) {
    return null;
  }

  // return <div className="error">{message}</div>;
  return (
    <div
      style={oData.type == "success" ? { color: "green" } : { color: "red" }}
      className="notification"
    >
      {oData.message}
    </div>
  );
};

export default Notification;
