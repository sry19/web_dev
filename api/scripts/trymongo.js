require('dotenv').config();
/**
 * The first thing to do is make a connection to the database server.
 * This can be done by first importing the object MongoClient from the driver,
 * then creating a new client object from it using a URL that identifies a database to connect to,
 * and finally calling the connect method on it
 */
const { MongoClient } = require('mongodb');
/**
 * The URL should start with mongodb:// followed by the hostname or the IP address of the server to connect to.
 * An optional port can be added using : as the separator,
 * but it’s not required if the MongoDB server is running on the default port, 27017.
 */
/**
 * For the local installation, the URL will be mongodb://localhost/ issuetracker.
 * Note that the MongoDB Node.js driver accepts the database name as part of the URL itself,
 * and it is best to specify it this way, even though a cloud provider may not show this explicitly.
 */

// const url = process.env.DB_URL || 'mongodb://localhost/issuetracker';
// Atlas URL - replace UUU with user, PPP with password, XXX with hostname
// const url = 'mongodb+srv://UUU:PPP@cluster0-XXX.mongodb.net/issuetracker?retryWrites=true';
const url = process.env.DB_URL || 'mongodb://localhost/issuetracker';
// mLab URL - replace UUU with user, PPP with password, XXX with hostname
// const url = 'mongodb://UUU:PPP@XXX.mlab.com:33533/issuetracker';

function testWithCAllbacks(callback) {
  console.log('\n--- testWithCallbacks ---');
  const client = new MongoClient(url, { useNewUrlParser: true });
  client.connect((err, client) => {
    if (err) {
      callback(err);
      return;
    }
    console.log('Connected to MongoDB URL', url);

    const db = client.db();
    const collection = db.collection('employees');

    const employee = { id: 1, name: 'A. Callback', age: 23 };
    collection.insertOne(employee, (err, result) => {
      if (err) {
        client.close();
        callback(err);
        return;
      }
      console.log('Result of insert:\n', result.insertedId);
      collection.find({ _id: result.insertedId }).toArray((err, docs) => {
        if (err) {
          client.close();
          callback(err);
          return;
        }
        console.log('Result of find:\n', docs);
        client.close();
        callback(err);
      });
    });
  });
}

async function testWithAsync() {
  console.log('\n --- testWithAsync ---');
  const client = new MongoClient(url, { useNewUrlParser: true });
  try {
    await client.connect();
    console.log('Connected to MongoDB URL', url);
    const db = client.db();
    const collection = db.collection('employees');

    const employee = { id: 2, name: 'B. Async', age: 16 };
    const result = await collection.insertOne(employee);
    console.log('Result of insert:\n', result.insertedId);
    const docs = await collection.find({ _id: result.insertedId }).toArray();
    console.log('Result of find:\n', docs);
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
}

testWithCAllbacks((err) => {
  if (err) {
    console.log(err);
  }
  testWithAsync();
});
