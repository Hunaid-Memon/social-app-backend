const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(express.json({ extended: false }))

const PORT = process.env.PORT || 5003;

app.get('/', (req, res) => {
    res.status(200).json({ msg: 'This is Social App' })
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/posts', require('./routes/posts'));

app.listen(PORT, () => {
    console.log(`Server has been started\nhttp://localhost:${PORT}`);
});