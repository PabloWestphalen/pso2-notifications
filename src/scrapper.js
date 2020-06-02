const axios = require("axios");
const cheerio = require("cheerio");

async function loadDetails(url) {
  const { data: html } = await axios.get(url);
  const $ = cheerio.load(html);
  const content = ""; //$("#active-section").text().replace(/\n/g, "").trim();
  const contentHTML = ""; //$("#active-section").html();
  return {
    content,
    contentHTML,
  };
}

async function getFrontPageAnnouncements() {
  const baseURL = "https://pso2.com/news?page=1";
  const { data: html } = await axios.get(baseURL);

  const $ = cheerio.load(html);

  const newsItems = $(".all-news-section-wrapper .news-item")
    .get()
    .map((node) => {
      const title = $(node).find(".title").text().trim();
      const date = $(node).find(".date").text();
      const id = $(node)
        .find(".read-more")
        .attr("onclick")
        .match(/'([^']*)/)[1];
      const headline = $(node).find(".description.main").text();

      const link = `${baseURL}/${id}`;
      return {
        id,
        title,
        headline,
        date,
        link,
        notified: false,
      };
    });

  return newsItems;
}

exports.getFrontPageAnnouncements = getFrontPageAnnouncements;
exports.loadDetails = loadDetails;
