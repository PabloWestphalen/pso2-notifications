const io = require("./io");
const { setAsyncInterval } = require("./asyncUtils");
const notifier = require("./notifier.js");

const FREQUENCY = 1000 * 60 * 60;

setAsyncInterval(async () => {
  notifier.notify("PSO 2 Notification Started", "Have a nice ride!");
  const allNews = await io.load();
  let localNeedsUpdate = true;

  for (let i = 0; i < allNews.length; i++) {
    const news = allNews[i];

    if (!news.notified) {
      localNeedsUpdate = true;
      allNews[i].notified = true;

      notifier.notify(news.title, news.headline, news.link);
    }
  }

  if (localNeedsUpdate) {
    console.log("Updating local cache after having notified");
    io.write(allNews);
  } else {
    console.log("No notifications so no update");
  }
}, FREQUENCY);
