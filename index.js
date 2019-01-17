const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const url = require("./secrets");
const dboper = require("./operations");

const dbname = "lernwerkstatt";

MongoClient.connect(url)
  .then(client => {
    //assert.equal(err, null);

    console.log("Connected!");

    const db = client.db(dbname);

    dboper
      .insertDocument(db, { name: "Beta", level: 7 }, "elite")
      .then(result => {
        console.log("Inserted document:\n", result.ops);

        return dboper.findDocuments(db, "elite");
      })
      .then(docs => {
        console.log("Found documents:\n", docs);

        return dboper.updateDocument(
          db,
          { name: "Beta" },
          { level: 9 },
          "elite"
        );
      })
      .then(result => {
        console.log("Updated document:\n", result.result);

        return dboper.findDocuments(db, "elite");
      })
      .then(docs => {
        console.log("Found documents:\n", docs);

        return db.dropCollection("elite");
      })
      .then(result => {
        console.log("Dropped collection: ", result);

        client.close();
      })
      .catch(err => console.log(err));
  })
  .catch(err => console.log(err));
