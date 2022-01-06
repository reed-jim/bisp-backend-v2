const { FeedController } = require("../controllers/feed.controller");

const feedRoute = (app, db) => {
    const fc = new FeedController(db);

    app.post("/feed/add", (req, res) => fc.add(req, res));

    app.post("/feed/update", (req, res) => fc.update(req, res));

    app.get("/feed", (req, res) => fc.get(req, res));

    app.get("/feed/search", (req, res) => fc.search(req, res));

    app.get("/feed/delete", (req, res) => fc.delete(req, res));
}

module.exports = { feedRoute }
