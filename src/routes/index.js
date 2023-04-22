const router = require('express').Router();
const path = require('path');
const data = require('../../data/estaciones')

router.get('/', (req, res) => {
  res.render('index.ejs');
});

router.get('/getCoord', async (req, res) => {
    res.json(await data.getCoord());
});
  

module.exports = router;