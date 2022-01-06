const { CollectionResultController } = require("../controllers/result.controller");

const resultRoute = (app, db) => {
    const crc = new CollectionResultController(db);

    app.post("/collectionResult/add", (req, res) => crc.add(req, res));

    app.get("/collectionResult", (req, res) => crc.get(req, res));
}

module.exports = { resultRoute }
