class QuestionController {

    constructor(db) {
        this.db = db
    }

    addDoc = async (collection, obj) => {
        try {
            const col = this.db.collection(collection);

            await col.updateOne({ "_id": "index" }, { $set: { _id: "index", index: obj._id + 1 } }, { upsert: true })

            await col.insertOne(obj);

        } catch (err) {
            console.log(err.stack);
        }
    }

    getDocsFromQuery = async (cursor) => {
        if ((await cursor.count()) === 0) {
            console.log("No documents found!");
        }

        let docs = {};
        let index = 0;
        await cursor.forEach(item => { docs[index] = item; index++ });

        return docs;
    }

    getLastIndex = async (req, res) => {
        try {
            const query = req.query;

            const col = this.db.collection(query.collection);

            const indexer = await col.findOne({ "_id": "index" })

            res.status(200).send(indexer)
        }
        catch (err) {
            console.log(err);
        }
    }

    getLastIndexNoResponse = async (collection) => {
        try {
            const col = this.db.collection(collection);

            const indexer = await col.findOne({ "_id": "index" })

            return indexer.index
        }
        catch (err) {
            console.log(err);
        }
    }

    addQuestionCollection = async (req, res) => {
        const data = req.body;

        const doc = {
            _id: data.id,
            title: data.title,
            description: data.description,
            author: data.author,
            date: data.date,
            total: 0,
        }

        this.addDoc("questionCollection", doc);
    }

    addQuestion = async (req, res) => {
        const data = req.body;

        const answerArr = Object.values(data).slice(1, 5);

        const answers = {}

        for (let i = 0; i < 4; i++) {
            answers[i] = answerArr[i]
        }

        const doc = {
            _id: data.id,
            question: data.question,
            answers: answers,
            correctAnswer: data.correctAnswer
        }

        this.addDoc("question", doc);
    }

    getQuestionCollections = async (req, res) => {
        try {
            const start = Number(req.query.start);
            const end = Number(req.query.end);

            const col = this.db.collection("questionCollection");

            const cursor = await col.find({ _id: { $gte: start, $lte: end } });

            if ((await cursor.count()) === 0) {
                console.log("No documents found!");
            }

            let docs = {};
            let index = 0;
            await cursor.forEach(item => { docs[index] = item; index++ });

            res.status(200).send(docs);
        }
        catch (err) {
            console.log(err);
        }
    }

    getQuestions = async (req, res) => {
        try {
            const _collectionId = Number(req.query.collection);

            const col = this.db.collection("question");

            const cursor = await col.find({ collectionId: _collectionId });

            this.getDocsFromQuery(cursor).then(
                docs => res.status(200).send(docs)
            )
        }
        catch (err) {
            console.log(err);
        }
    }

    sortBy = async (req, res) => {
        try {
            const col = this.db.collection("questionCollection");

            const field = req.query.sort;

            const cursor = await col.find({ _id: { $ne: "index" } }).sort({ sort: 1 }).limit(8);

            this.getDocsFromQuery(cursor).then(
                docs => res.status(200).send(docs)
            )
        }
        catch (err) {
            console.log(err);
        }
    }
}

module.exports = { QuestionController }
