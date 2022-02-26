import { MongoClient } from "mongodb";
import type { MongoClientOptions } from "mongodb";

const URI = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_CLUSTER_NAME}.${process.env.SUBDOMAIN}.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`;

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

let client;
let clientPromise: Promise<MongoClient>;

if (process.env.ENV === "DEV") {
  //@ts-ignore
  if (!global._mongoClientPromise) {
    client = new MongoClient(URI, options as MongoClientOptions);
    //@ts-ignore
    global._mongoClientPromise = client.connect();
  }
  //@ts-ignore
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(URI, options as MongoClientOptions);
  clientPromise = client.connect();
}

export default clientPromise;
