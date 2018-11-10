import keys from "../config/keys";

const newNotification = (title, body, type) => {
  const date = new Date();
  const id = date
    .toString()
    .split(" ")
    .join("");

  console.log("type", type);

  let idWithType;
    
  if (type === "live") {
    idWithType = `live${id}`;
  } else {
    idWithType = id;
  }

  console.log("id", idWithType);

  const notification = browser.notifications.create(idWithType, {
    type: "basic",
    title: title,
    message: body,
    iconUrl: "../assets/icon_live.png"
  });

  setTimeout(() => {
    browser.notifications.clear(idWithType);
  }, 5000);

  console.log("notification :", notification);
};

export default newNotification;
