import DataBase from "./DataBase";

const URI = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_CLUSTER_NAME}.${process.env.MONGO_DB_SUBDOMAIN}.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`;

export const db = new DataBase(URI);
