import newNotification from "./notification";

const keys = require("../config/keys");

const extVersion = keys.extVersion;

const checkUpdate = () => {
  console.log(extVersion);
  checkCookie();
};

const checkCookie = () => {
  chrome.storage.local.get(
    {
      version: ""
    },
    items => {
      if (items.version != extVersion) {
        newCookie();
      }
    }
  );
};

const newCookie = () => {
  chrome.storage.local.set(
    {
      version: extVersion
    },
    () => {
      newNotification(
        `Mise à jour ${extVersion}`,
        "L'extension à bien été mise à jour."
      );
    }
  );
};

export default checkUpdate;
