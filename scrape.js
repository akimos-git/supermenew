const scrape = require('website-scraper').default;

const options = {
  urls: ['https://vertora.webflow.io/'],
  directory: './vertora-export',
};

scrape(options).then((result) => {
  console.log("Website downloaded successfully!");
}).catch((err) => {
  console.error("An error occurred", err);
});
