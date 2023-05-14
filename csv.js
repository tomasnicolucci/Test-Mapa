const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: 'file.csv',
    header: [
        {id: 'name', title: 'NAME'},
        {id: 'lang', title: 'LANGUAGE'},
        {id: 'age', title: 'AGE'}
    ]
});
 
const records = [
    {name: 'Bob',  lang: 'French', age:20},
    {name: 'Mary', lang: 'English', age:40}
];
 
csvWriter.writeRecords(records)       // returns a promise
    .then(() => {
        console.log('...Done');
    });