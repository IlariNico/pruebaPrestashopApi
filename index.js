const express = require('express');
const fetch = require('node-fetch');
const { parseString } = require('xml2js'); 
const app = express();
const port = 3000;
const key = 'JDVYQKYTJBKWIECMFBC8HV94XJLDEB8P';
const url = 'https://www.dromosport.com/api/products/1433';

app.get('/', (req, res) => {
    fetch(url, {
        headers: {
            'Authorization': 'Basic ' + Buffer.from(key + ':' + '').toString('base64')
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('La solicitud no fue exitosa');
        }
        return response.text();
    })
    .then(xmlData => {
        parseString(xmlData, (err, result) => {
            if (err) {
                throw new Error('Error al analizar XML');
            }

            console.log(result); 
            res.send(result); 
        });
    })
    .catch(error => {
        console.error('Error:', error);
        res.status(500).send('Error interno del servidor');
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});