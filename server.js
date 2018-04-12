const express = require('express');
const scraper = require('./scraper');
const app = express();
app.use(express.static(__dirname + '/assets/'));
app.use(express.static(__dirname + '/assets/icons'));
const port = process.env.PORT || 5000;
let result = scraper.scrape();
app.get('/api/calendar', (req, res) => {
  result.then((data) => {
    res.send(data);
  })
});
app.listen(port, () => console.log(`Listening on port ${port}`));
