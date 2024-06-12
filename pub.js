import express from 'express';
import redis from 'redis';

const app = express();

let publisher = redis.createClient({
    url: 'redis://localhost:6379'
})

publisher.on('error', (err) => console.log(`Redis error on connecting`));
publisher.on('connect', (err) => console.log(`Redis connected to port http://localhost:6379`));

const connect = async () => {
    publisher.connect();
}
connect();

app.get('/', (req, res) => {
    res.send({
        message: 'Publish active from port 6004'
    })
})

app.get('/publish', async (req, res) => {
    const id = Math.floor(Math.random() * 10);

    const data = {
        _id: id,
        message: `message - ${id}`
    }

    await publisher.publish('person', JSON.stringify(data));
    res.send({
        message: 'Message Published'
    })
})

app.listen(6004, () => {
    console.log(`Publisher listening to port http://localhost:6004`);
})