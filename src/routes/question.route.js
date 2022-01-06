const { QuestionController } = require("../controllers/question.controller");

const questionRoute = (app, db) => {
    const qc = new QuestionController(db);

    // router.route("/question/add").get(
    //     (req, res) => qc.addQuestionCollection(req, res)
    // )

    app.post("/question-collection/add", (req, res) => qc.addQuestionCollection(req, res));

    app.post("/question-collection/question/add", (req, res) => qc.addQuestion(req, res));

    // app.get("/question-collection/view/", (req, res) => qc.getQuestionCollection(req, res));

    // app.get("/question-collection", (req, res) => qc.getQuestionCollections(req, res));

    app.get("/question-collection", (req, res) => qc.sortBy(req, res));

    app.get("/question-collection/question", (req, res) => qc.getQuestions(req, res));

    app.get("/lastIndex", (req, res) => qc.getLastIndex(req, res));
}

module.exports = { questionRoute }
