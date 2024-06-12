import redis from 'redis';

(async () => {
    let subscriber = redis.createClient({
        url: 'redis://localhost:6379'
    })

    subscriber.on('error', (err) => console.log(`Redis error on connecting`));
    subscriber.on('connect', (err) => console.log(`Redis connected to port http://localhost:6379`));

    const connect = async () => {
        subscriber.connect();
    }
    await connect();

    subscriber.subscribe('person', (data) => console.log(JSON.parse(data)));
})();