
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import dns from "node:dns";

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";
import contactRoute from "./route/contact.route.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4001;
const URI = process.env.MONGODB_URI || process.env.MongoDBURI;
const DEFAULT_DB_NAME = process.env.MONGODB_DB || "bookstore";

// Define routes
app.use("/book", bookRoute);
app.use("/user", userRoute);
app.use("/contact", contactRoute);

const resolveAtlasDns = async (uri) => {
  if (!uri.startsWith("mongodb+srv://")) {
    return;
  }

  const srvRecord = `_mongodb._tcp.${new URL(uri).hostname}`;

  try {
    await dns.promises.resolveSrv(srvRecord);
  } catch (error) {
    if (!["ECONNREFUSED", "ETIMEOUT", "EAI_AGAIN", "ESERVFAIL"].includes(error.code)) {
      throw error;
    }

    dns.setServers(["8.8.8.8", "1.1.1.1"]);
    await dns.promises.resolveSrv(srvRecord);
  }
};

// A URI without a database name makes MongoDB fall back to the "test"
// database, which hides the real data. Always target an explicit database.
const getConnectOptions = (uri) => {
  let pathname = "";

  try {
    pathname = new URL(uri).pathname;
  } catch {
    return {};
  }

  if (pathname && pathname !== "/") {
    return {};
  }

  console.warn(`MongoDB URI has no database name. Using "${DEFAULT_DB_NAME}".`);
  return { dbName: DEFAULT_DB_NAME };
};

const startServer = async () => {
  if (!URI) {
    throw new Error("Missing MONGODB_URI (or MongoDBURI) in Backend/.env");
  }

  await resolveAtlasDns(URI);
  await mongoose.connect(URI, getConnectOptions(URI));
  console.log(`Connected to MongoDB (database: ${mongoose.connection.db.databaseName})`);

  const server = app.listen(PORT);

  server.once("error", (error) => {
    const message = error.code === "EADDRINUSE"
      ? `Port ${PORT} is already in use. Stop the other server before starting this one.`
      : error.message;

    console.error("Backend startup failed:", message);
    process.exit(1);
  });

  server.once("listening", () => {
    console.log(`Server is listening on port ${PORT}`);
  });
};

startServer().catch((error) => {
  const message = /bad auth|authentication failed/i.test(error.message)
    ? "MongoDB Atlas rejected the database credentials. Check the Atlas database user/password and URL-encode special characters in the password."
    : error.message;

  console.error("Backend startup failed:", message);
  process.exit(1);
});
