const express = require('express');
const bodyParser = require('body-parser');
const postRoutes = require('./routes/postRoutes');
const { userRouter } = require('./users');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/auth', userRouter);
app.use('/api/posts', postRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
