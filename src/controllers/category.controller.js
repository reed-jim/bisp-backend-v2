const { Utility } = require("./util");

class CategoryController {

    constructor(db) {
        this.db = db
        this.util = new Utility(db, "category");
    }

    add = async (req, res) => {
        const data = req.body;

        const doc = {
            _id: data.id,
            name: data.name
        }

        this.util.addDoc(doc);
    }

    getAll = () => {
        try {
            const col = this.db.collection("category");

            const cursor = await col.find({ });

            this.util.getDocsFromQuery(cursor).then(
                docs => res.status(200).send(docs)
            )
        }
        catch (err) {
            console.log(err);
        }
    }
}

module.exports = { CategoryController }
