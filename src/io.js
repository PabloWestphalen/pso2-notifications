const scrapper = require("./scrapper.js");
const { readFile, writeFile } = require("fs").promises;

const load = async () => {
  let localNews;
  let localCacheNeedsUpdate = true;

  try {
    const file = await readFile("./announcements.json", "utf8");
    console.log("Loaded!");
    localNews = file;
  } catch (err) {
    console.log("Error reading local file.", err);
  }

  try {
    localNews = JSON.parse(localNews);
    console.log("Parsed!");
  } catch (err) {
    console.error("Error parsing local file.", err);
    localNews = [];
  }

  try {
    const remoteNews = await scrapper.getFrontPageAnnouncements();
    await Promise.all(
      remoteNews.map(async (remote) => {
        const loadedIndex = localNews.findIndex(
          (local) => local.id === remote.id
        );
        const loaded = localNews[loadedIndex];

        if (!loaded || !loaded.content) {
          localCacheNeedsUpdate = true;
          console.log("News", remote.id, "is not yet  loaded.");
          const details = await scrapper.loadDetails(remote.link);
          if (localNews[loadedIndex]) {
            localNews[loadedIndex]["content"] = details.content;
          } else {
            localNews.push({
              ...remote,
              content: details.content,
            });
          }

          console.log("Loaded ", remote.id);
        } else {
          console.log("News", remote.id, "is already loaded");
        }
      })
    );

    console.log("done loading");

    if (localCacheNeedsUpdate) {
      writeFile("./announcements.json", JSON.stringify(localNews, null, 2));
      console.log("updated local cache");
    }

    return localNews;
  } catch (err) {
    console.error("Error loading entries from local cache: ", err);
    return [];
  }
};

const write = async (object) => {
  setTimeout(() => {
    writeFile("./announcements.json", JSON.stringify([...object], null, 2));
  }, 2000);
};

exports.load = load;
exports.write = write;
