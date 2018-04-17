import newNotification from "./notification";

const checkUpdate = () => {
  chrome.runtime.onInstalled.addListener(details => {
    try {
      switch (details.reason) {
        case "install":
          newNotification(
            "Installation de l'extension",
            "Merci d'avoir installé l'extension."
          );
          break;
        case "update":
          checkVersion(details);
          break;
      }
    } catch (e) {
      console.info("OnInstall Error - " + e);
    }
  });
};

const checkVersion = details => {
  const currentVersion = chrome.runtime.getManifest().version;
  const { previousVersion } = details;

  if (previousVersion < currentVersion) {
    newNotification(
      `Mise à jour ${currentVersion}`,
      "L'extension à bien été mise à jour."
    );
  }
};

export default checkUpdate;
