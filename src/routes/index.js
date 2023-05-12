const router = require('express').Router();
const path = require('path');
const data = require('../../data/estaciones')

router.get('/', (req, res) => {
  res.render('index.ejs');
});

router.get('/getEstaciones', async (req, res) => {
  res.json(await data.getEstaciones())
});

router.get('/getEstacionById/:id', async (req, res) => {
  res.json(await  data.getEstacionById(req.params.id))
});

router.get('/getCoord', async (req, res) => {
    res.json(await data.getCoord());
});

router.post('/addEstacion', async (req, res) => {
  const result = await data.addEstacion(req.body);
  res.json(result);
})

router.delete('/deleteEstacion/:id', async (req, res) => {
  res.json(await data.deleteEstacion(req.params.id));
})

module.exports = router;