const { Utility } = require("./util");

class FeedController {

    constructor(db) {
        this.db = db;
        this.util = new Utility(db, "feed");
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
            title: data.title,
            content: data.content,
            userId: data.userId,
            date: new Date(Date.now()),
            gem: 0
        }

        this.util.addDoc(doc);
    }

    update = async (req, res) => {
        const data = req.body;

        const doc = {
            _id: data._id,
            title: data.title,
            content: data.content,
            userId: data.userId,
            date: new Date(data.date),
            gem: data.gem
        }

        this.util.updateDoc(data._id, doc);
    }

    delete = async (req, res) => {
        try {
            const col = this.db.collection("feed");

            const confirm = req.query.sure;

            if (confirm == "true") {
                await col.deleteMany({ _id: { $ne: "index" } });

                res.status(200).send({ message: "Deleted!" })
            }
            else {
                res.status(200).send({ message: "Refused!" })
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    get = async (req, res) => {
        try {
            const userId = req.query.user;
            const sortField = req.query.sort;
            const page = req.query.page || 0;

            // Match
            const matchQuery = {};
            matchQuery["_id"] = { $ne: "index" };

            if (userId != undefined) {
                matchQuery["userId"] = Number(userId);
            }
            // Sort (default by date)
            const sortQuery = {};

            if (sortField != undefined) {
                sortQuery[sortField] = 1;
            }
            else {
                sortQuery["date"] = 1;
            }

            const col = this.db.collection("feed");

            // const cursor = await col.find(query).sort(sortQuery).skip(8 * page).limit(8);

            const cursor = await col.aggregate(
                [
                    // { $match: { status: "A" } },
                    // { $group: { _id: "$cust_id", total: { $sum: "$amount" } } },
                    // { $sort: { total: -1 } }
                    {
                        $match: matchQuery
                    },
                    {
                        $lookup: {
                            from: 'user',
                            localField: 'userId',
                            foreignField: '_id',
                            as: 'userDetail'
                        }
                    }
                ]
            )
                .sort(sortQuery)
                .skip(8 * page)
                .limit(8);

            this.util.getDocsFromQuery(cursor).then(
                docs => res.status(200).send(docs)
            )
        }
        catch (err) {
            console.log(err);
        }
    }

    sortBy = async (req, res) => {
        try {
            const col = this.db.collection("feed");

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

    sortInRange = async (req, res) => {
        try {
            const col = this.db.collection("feed");

            const sort = req.query.sort;
            const page = req.query.page;

            const sortQuery = {};
            sortQuery[sort] = 1;

            const cursor = await col.find({ _id: { $ne: "index" } }).sort(sortQuery).skip(8 * page).limit(8);

            this.getDocsFromQuery(cursor).then(
                docs => res.status(200).send(docs)
            )
        }
        catch (err) {
            console.log(err);
        }
    }

    search = async (req, res) => {
        try {
            const col = this.db.collection("feed");

            const query = req.query.q;

            const cursor = await col.find({ $text: { $search: "meteor" } }).limit(3);

            this.util.getDocsFromQuery(cursor).then(
                docs => res.status(200).send(docs)
            )
        }
        catch (err) {
            console.log(err);
        }
    }
}

module.exports = { FeedController }
