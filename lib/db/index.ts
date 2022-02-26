import DataBase from "./DataBase";

export const db = new DataBase(
  `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_CLUSTER_NAME}.${process.env.SUBDOMAIN}.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`
);
