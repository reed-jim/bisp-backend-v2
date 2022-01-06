const express = require("express");
const bodyParser = require("body-parser");
var compression = require("compression");
var helmet = require("helmet");
const cors = require("cors");

const { getDb } = require("./src/db/conn");
// const conn = require("./src/db/conn1");

const { questionRoute } = require("./src/routes/question.route");
const { resultRoute } = require("./src/routes/result.route");
const { feedRoute } = require("./src/routes/feed.route");
const { userRoute } = require("./src/routes/user.route");

// 2 ways
const app = express();
// const router = express.Router();

app.use(compression());
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const test = (db) => {
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
    });

    questionRoute(app, db);
    resultRoute(app, db)
    feedRoute(app, db)
    userRoute(app, db)
}

getDb().then(
    db => test(db)
).catch(
    err => console.log(err)
)
