const { UserController } = require("../controllers/user.controller");

const userRoute = (app, db) => {
    const uc = new UserController(db);

    app.post("/user/add", (req, res) => uc.add(req, res));

    app.post("/user/update", (req, res) => uc.update(req, res));

    app.post("/user/isExist", (req, res) => uc.isExist(req, res));

    app.post("/user/friends", (req, res) => uc.getFriendList(req, res));

    // app.get("/user", (req, res) => uc.get(req, res));

    // app.get("/user", (req, res) => uc.sortBy(req, res));
}

module.exports = { userRoute }
