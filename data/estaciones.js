require('dotenv').config();
const conn = require('./connection');
const DATABASE = 'Test_estacion';
const ESTACIONES = 'estaciones';
const objectId = require('mongodb').ObjectId;
const { ObjectId } = require('mongodb');

async function  getEstaciones(){
    const connectiondb = await conn.getConnection();
    const estaciones = await connectiondb
                        .db(DATABASE)
                        .collection(ESTACIONES)
                        .find()
                        .toArray();
    return estaciones;
}

async function getEstacionById(id){
    const connectiondb = await conn.getConnection();
    const estacion = await connectiondb
                        .db(DATABASE)
                        .collection(ESTACIONES)
                        .findOne({_id: new ObjectId(id)});
    return estacion;
}

async function getCoord(){
    const estaciones = await getEstaciones();
    let coord = estaciones
                .map((e)=>({coordenadas: e.coordenadas}));
    return coord;
}

async function addEstacion(estacion){
    const connectiondb = await conn.getConnection();
    const estAgregada = await connectiondb
                            .db(DATABASE)
                            .collection(ESTACIONES)
                            .insertOne(estacion);
    return estAgregada;
}

async function deleteEstacion(id){
    const connectiondb = await conn.getConnection();
    const estacion = await getEstacionById(id)
    const estEliminada = await connectiondb
                            .db(DATABASE)
                            .collection(ESTACIONES)
                            .deleteOne(estacion);
    return estEliminada;                        
}

module.exports = {getEstaciones, getEstacionById, getCoord, addEstacion, deleteEstacion}