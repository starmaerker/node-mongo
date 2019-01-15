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
    });
  }
);
