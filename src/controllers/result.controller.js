class CollectionResultController {

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

    updateDoc = async (collection, id, obj) => {
        try {
            const col = this.db.collection(collection);

            await col.updateOne({ "_id": id }, { $set: { obj } }, { upsert: true })

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

    add = async (req, res) => {
        const data = req.body;

        const doc = {
            _id: data.id,
            userId: data.userId,
            collectionId: data.collectionId,
            results: data.results
        }

        this.addDoc("collectionResult", doc);
    }

    update = async (req, res) => {
        const data = req.body;

        const doc = {
            _id: data.id,
            userId: data.userId,
            collectionId: data.collectionId,
            results: data.results
        }

        this.updateDoc("collectionResult", data.id, doc);
    }

    get = async (req, res) => {
        try {
            const _userId = Number(req.query.user);
            const _collectionId = Number(req.query.collection);

            const col = this.db.collection("collectionResult");

            const cursor = await col.find({ userId: _userId, collectionId: _collectionId });

            this.getDocsFromQuery(cursor).then(
                docs => res.status(200).send(docs)
            )
        }
        catch (err) {
            console.log(err);
        }
    }

    // sortBy = async (req, res) => {
    //     try {
    //         const col = this.db.collection("questionCollection");

    //         const field = req.query.sort;

    //         const cursor = await col.find({ _id: { $ne: "index" } }).sort({ sort: 1 }).limit(8);

    //         this.getDocsFromQuery(cursor).then(
    //             docs => res.status(200).send(docs)
    //         )
    //     }
    //     catch (err) {
    //         console.log(err);
    //     }
    // }
}

module.exports = { CollectionResultController }
