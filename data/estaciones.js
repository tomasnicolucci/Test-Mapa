require('dotenv').config();
const conn = require('./connection');
const DATABASE = 'Test_estacion';
const ESTACIONES = 'estaciones';
const objectId = require('mongodb').ObjectId;
const { ObjectId } = require('mongodb');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const excelJS = require('exceljs');

async function exportCsv(id){
    const estacion = await getEstacionById(id);
    
    const csvWriter = createCsvWriter({
        path: 'Data.csv',
        header: [
            {id: 'date', title: 'DATE'},
            {id: 'temperature', title: 'TEMPERATURE'},
            {id: 'reliability', title: 'RELIABILITY'},
            {id: 'pm1', title: 'PM1'},
            {id: 'pm10', title: 'PM10'},
            {id: 'pm25', title: 'PM25'},
            {id: 'airQLevel', title: 'AIRQUALITYLEVEL'}
        ]
    });
    const records = [
        {date: estacion.dateObserved,  temperature: estacion.temperature, reliability: estacion.reliability, 
            pm1: estacion.pm1, pm10: estacion.pm10, pm25: estacion.pm25, airQLevel: estacion.airQualityLevel}
    ];
    csvWriter.writeRecords(records)
    .then(() => {
        console.log('...Exportando');
    });
}

async function exportExcel(id){
    const estacion = await getEstacionById(id);

    
    const workbook = new excelJS.Workbook();
    const fileName = 'data.xlsx'

    const sheet = workbook.addWorksheet('Data');
    const reColumns = [
        {header: 'DATE', key: 'date'},
        {header: 'TEMPERATURE', key: 'temperature'},
        {header: 'RELIABILITY', key: 'reliability'},
        {header: 'PM1', key: 'pm1'},
        {header: 'PM10', key: 'pm10'},
        {header: 'PM25', key: 'pm25'},
        {header: 'AIRQUALITYLEVEL', key: 'airQLevel'}
    ];
    sheet.columns = reColumns;
        
    const rows = [
        {
            date: estacion.dateObserved,
            temperature: estacion.temperature,
            reliability: estacion.reliability,
            pm1: estacion.pm1,
            pm10: estacion.pm10,
            pm25: estacion.pm25,
            airQLevel: estacion.airQualityLevel
        }
    ];
    sheet.addRows(rows);
        
    workbook.xlsx.writeFile(fileName).then(() => {
        console.log('Descargando');
    });
    
}

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
                .map((e)=>({coordenadas: e.location.coordinates}));
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

module.exports = {getEstaciones, getEstacionById, getCoord, addEstacion, deleteEstacion, exportCsv, exportExcel}