const express = require('express')
const dataRoutes = require('./src/data/routes')

const app = express();
const port  = 3000;

app.use(express.json())

app.get("/", (req, res) => {
    res.send('RES data')
})

app.use('/api/v1/data', dataRoutes);

app.listen(port, () => console.log(`app listetning on port ${port}`))