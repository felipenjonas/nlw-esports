import express from 'express';
import cors from 'cors';
// conection database
import { PrismaClient } from '@prisma/client';
import { convertHourStringToMinutes } from './utils/convert-hour-string-to-minutes';
import { convertMinutesToHourString } from './utils/convert-minutes-to-hours-string';
const app = express();;
app.use(express.json());
app.use(cors());
const port = 3333;
const prisma = new PrismaClient({
    log: ['query']  //Mostra no terminal todas as querys feitas pelo prisma
});


app.get('/games', async (request, response) => {
    const games = await prisma.game.findMany({
        // Join em tabela ads
        include: {
            _count: {
                select: {
                    ads: true,
                }
            }
        }
    });
    return response.json(games);
});

app.post('/games/:id/ads', async (request, response) => {
    const gameId = request.params.id;
    const body: any = request.body;

    // VALIDAÇÃO USANDO LIB ZOD TYPESCRIPT.

    const ad = await prisma.ad.create({
        data: {
            gameId,
            name: body.name,
            yearsPlaying: body.yearsPlaying,
            discord: body.discord,
            weekDays: body.weekDays.join(','),
            hourStart: convertHourStringToMinutes(body.hourStart),
            hourEnd: convertHourStringToMinutes(body.hourEnd),
            useVoiceChannel: body.useVoiceChannel,
        },
    })

    return response.status(201).json(ad);
})

app.get('/games/:id/ads', async (request, response) => {
    const gameId = request.params.id;

    const ads = await prisma.ad.findMany({

        select: {
            id: true,
            name: true,
            weekDays: true,
            useVoiceChannel: true,
            yearsPlaying: true,
            hourStart: true,
            hourEnd: true,
        },
        where: {
            gameId,
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return response.json(ads.map(ad => {
        return {
            ...ad,
            weekDays: ad.weekDays.split(','),
            hourStart: convertMinutesToHourString(ad.hourStart),
            hourEnd: convertMinutesToHourString(ad.hourEnd),
        }
    }));
});

app.get('/ads/:id/discord', async (request, response) => {
    const adId = request.params.id;

    // Tenta enocntrar ad com o id informado, se não achar retorna erro.
    const ad = await prisma.ad.findUniqueOrThrow({
        select: {
            discord: true,
        },
        where: {
            id: adId,
        }
    })
    return response.json({
        discord: ad.discord,
    });
});



app.listen(port);

