const { Utility } = require("./util");

class UserController {

    constructor(db) {
        this.db = db
        this.collection = "user";
        this.util = new Utility(db, this.collection);
    }

    isExist = async (req, res) => {
        const key = req.body.key;

        this.getByKey(key).then(
            doc => {
                res.status(200).send(doc);
            }
        )
    }

    add = async (req, res) => {
        try {
            const data = req.body;

            this.util.addDoc(this.createDoc(data));
        }
        catch (err) {
            console.log(err);
        }
    }

    createDoc = (data) => {
        const doc = {
            _id: data._id,
            key: data.key,
            gem: data.gem,
            learn: data.learn,
            bonus: data.bonus,
            lastLearnTime: new Date(data.lastLearnTime),
            name: data.name,
            desc: data.desc,
            friends: data.friends
        }

        return doc;
    }

    update = async (req, res) => {
        const data = req.body;
        
        this.util.updateDoc(data._id, this.createDoc(data));
    }

    get = async (req, res) => {
        try {
            const _userId = Number(req.query.user);

            const col = this.db.collection(this.collection);

            const cursor = await col.find({ userId: _userId, collectionId: _collectionId });

            this.getDocsFromQuery(cursor).then(
                docs => res.status(200).send(docs)
            )
        }
        catch (err) {
            console.log(err);
        }
    }

    getByKey = async (_key) => {
        try {
            const col = this.db.collection(this.collection);

            const doc = await col.findOne({ key: _key });

            return doc;
        }
        catch (err) {
            console.log(err);
        }
    }

    getFriendList = async (req, res) => {
        try {
            const col = this.db.collection(this.collection);

            const friendIdList = req.body.friendIdList;

            const cursor = await col.find({ _id: { $in: friendIdList } });

            this.getDocsFromQuery(cursor).then(
                docs => res.status(200).send(docs)
            )
        }
        catch (err) {
            console.log(err);
        }
    }

    delete = async (req, res) => {
        try {
            const col = this.db.collection(this.collection);

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
}

module.exports = { UserController }
