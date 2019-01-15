const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const url = require("./secrets");
const dboper = require("./operations");

const dbname = "lernwerkstatt";

MongoClient.connect(
  url,
  (err, client) => {
    assert.equal(err, null);

    console.log("Connected!");

    const db = client.db(dbname);

    dboper.insertDocument(db, { name: "Beta", level: 7 }, "elite", result => {
      console.log("Inserted document:\n", result.ops);

      dboper.findDocuments(db, "elite", docs => {
        console.log("Found documents:\n", docs);

        dboper.updateDocument(
          db,
          { name: "Alpha" },
          { level: 9 },
          "elite",
          result => {
            console.log("Updated document:\n", result.result);

            dboper.findDocuments(db, "elite", docs => {
              console.log("Found documents:\n", docs);

              db.dropCollection("elite", result => {
                console.log("Dropped collection: ", result);

                client.close();
              });
            });
          }
        );
      });
    });
  }
);
