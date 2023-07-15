const mongoose = require('mongoose');

const USER = 'ridaceva';
const PASSWORD = 'NCrnLHBeuWfTuro1';
const DATABASE_NAME = 'proyecto';
const url = `mongodb+srv://${USER}:${PASSWORD}@cluster0.tftwqw2.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`

mongoose.connect(url)
.then(() => {
    console.log('Database connected!');
})
.catch((error) => {
    console.log('DB Error:', error);
});
