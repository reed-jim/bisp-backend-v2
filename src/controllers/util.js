class Utility {
    constructor(db, collection) {
        this.db = db;
        this.collection = collection;
    }

    addDoc = async (obj) => {
        try {
            const col = this.db.collection(this.collection);

            await col.updateOne({ "_id": "index" }, { $set: { _id: "index", index: obj._id + 1 } }, { upsert: true })

            await col.insertOne(obj);

        } catch (err) {
            console.log(err.stack);
        }
    }

    updateDoc = async (id, obj) => {
        try {
            const col = this.db.collection(this.collection);

            await col.updateOne({ "_id": id }, { $set: obj }, { upsert: true })

        } catch (err) {
            console.log(err.stack);
        }
    }

    getDocsFromQuery = async (cursor) => {
        // if ((await cursor.count()) === 0) {
        //     console.log("No documents found!");
        // }

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
}

module.exports = { Utility }
