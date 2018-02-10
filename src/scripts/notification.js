const newNotification = (title, body) => {
  const notification = new Notification(title, {
    icon: "../assets/icon_live.png",
    body: body
  });


  notification.onclick = () => {
    notification.close();
  };

  setTimeout(() => {
    notification.close();
  }, 5000);

  console.log("notification :", notification);
};

export default newNotification;
