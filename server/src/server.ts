import express from 'express';


const app = express();
const port = 3333;

app.get('/ads', (request, response) => {
    return response.json([
        { id: 1, nmae: 'Anúncio 1'},
        { id: 1, nmae: 'Anúncio 2'},
        { id: 1, nmae: 'Anúncio 3'},
        { id: 1, nmae: 'Anúncio 4'},
        { id: 1, nmae: 'Anúncio 5'},
        { id: 1, nmae: 'Anúncio 6'},
        { id: 1, nmae: 'Anúncio 7'},
    ]);
});


app.listen(port);

