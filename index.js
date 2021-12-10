const express = require("express");
const bodyParser = require("body-parser");
var compression = require("compression");
var helmet = require("helmet");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const { questionRoute } = require("./app/routes/question.route");



const app = express();

app.use(compression());
app.use(helmet());
app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

questionRoute(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});



// const url = "mongodb+srv://<username>:<password>@clustername.mongodb.net/test?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true";
// const client = new MongoClient(url);

// async function run() {
//     try {
//         await client.connect();
//         console.log("Connected correctly to server");
//         const db = client.db(dbName);
//     } catch (err) {
//         console.log(err.stack);
//     }

//     finally {
//         await client.close();
//     }
// }
