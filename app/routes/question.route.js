const controller = require("../controllers/discussion.controller");

const { QuestionController } = require("../controllers/question.controller");

const questionRoute = (app) => {
    const qc = new QuestionController(db);

    app.get("/api/discussion", (req, res) => qc.addQuestionCollection(req, res));
}

export { questionRoute }
