require('dotenv').config();
const conn = require('./connection');
const DATABASE = 'Test_estacion';
const ESTACIONES = 'estaciones';
const objectId = require('mongodb').ObjectId;

async function getCoord(){
    const connectiondb = await conn.getConnection();
    const data = await connectiondb
                        .db(DATABASE)
                        .collection(ESTACIONES)
                        .find()
                        .toArray();
    let coord = data
                .map((e)=>({coordenadas: e.coordenadas}));
    return coord;
}

module.exports = {getCoord}