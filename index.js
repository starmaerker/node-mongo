const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const url = require("./secrets");

const dbname = "lernwerkstatt";

MongoClient.connect(
  url,
  (err, client) => {
    assert.equal(err, null);

    console.log("Connected!");

    const db = client.db(dbname);
    const collection = db.collection("blogposts");

    collection.insertOne(
      {
        id: 1,
        title: "Wohnzimmergespräche",
        date: "24.01.2018",
        author: "Janina",
        summary:
          "Wohnzimmergespräche Wenn ihr öfters in die Lernwerkstatt kommt, seid ihr vielleicht schon mal Janina begegnet. Sie bietet manchmal spontane Gesprächszeit an, besucht einen Koch-Abend, oder arbeitet gerade mit unserer Bürokollegin Carla bei Lakunabi. Wir teilen mit Janina eine Vorstellung von...",
        blogpost:
          "Wenn ihr öfters in die Lernwerkstatt kommt, seid ihr vielleicht schon mal Janina begegnet. Sie bietet manchmal spontane Gesprächszeit an, besucht einen Koch-Abend, oder arbeitet gerade mit unserer Bürokollegin Carla bei Lakunabi. Wir teilen mit Janina eine Vorstellung von freier Bildung, praktizierter Schenkökonomie und nachhaltigem Leben. Heute hat sie ein Geschenk für euch: Ich habe vor einem Jahr meine Lebenshaltungskosten auf gegen Null reduziert. Der letzte dafür notwendige Schritt war, meinen Mietvertrag zu kündigen und meinen Besitz wegzugeben. Ich habe in diesem Jahr einen großen inneren Wandel vollzogen. Ich erlebte Ängste und Komplexe und ließ sie hinter mir. Ich suchte den Sinn und fand ihn im Moment. Ich erlebte spirituelles Wachstum. In Gesprächen mit meinen Gastgebern (in deren Küchen und Wohnzimmern) erlebte ich immer wieder, dass meine Lebensart und die daraus gewonnenen Erkenntnisse sie inspirieren konnten. Daher biete ich, ganz im Sinne der von mir praktizierten Schenkökonomie, die Wohnzimmer-Gespräche als Geschenk an.",
        imagelink: "/img/blog/1.jpg"
      },
      (err, result) => {
        assert.equal(err, null);

        console.log("After insert:\n");
        console.log(result.ops);

        collection.find({}).toArray((err, docs) => {
          assert.equal(err, null);

          console.log("Found:\n");
          console.log(docs);

          db.dropCollection("blogposts", (err, result) => {
            assert.equal(err, null);

            client.close();
          });
        });
      }
    );
  }
);
