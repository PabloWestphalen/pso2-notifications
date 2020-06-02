const open = require("opn");

const WindowsToaster = require("node-notifier").WindowsToaster;
const notifier = new WindowsToaster({
  withFallback: false, // Fallback to Growl or Balloons?
  customPath: "./lib/SnoreToast.exe",
});

const callback = (action, link = null) => {
  console.log("notification response was", action);
  if (action === "activate" && link) {
    open(link);
  }
};

const notify = (title, message, link = null) => {
  notifier.notify(
    {
      title: title,
      message: message,
      sound: true,
      wait: true,
      icon: null,
      timeout: 1,
    },
    (err, action) => {
      callback(action, link);
    }
  );
};

exports.notify = notify;
