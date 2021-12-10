const { MongoClient } = require("mongodb");

// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://<username>:<password>@clustername.mongodb.net/test?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true";
const client = new MongoClient(url);

// The database to use
const dbName = "test";

class QuestionController {

    constructor(db) {
        this.db = db
    }

    addQuestionCollection = (req, res) => {
        try {
            const col = db.collection("questionCollection");

            const obj = req.body;
    
            let personDocument = {
                title: obj.title,
                desc: new Date(1912, 5, 23),
                author: new Date(1954, 5, 7),
                date: new Date(1954, 5, 7),
                views: 0
            }
    
            const p = await col.insertOne(personDocument);

            res.status(200).send("Added")
        } catch (err) {
            console.log(err.stack);
        }
    }
}

export { QuestionController }
