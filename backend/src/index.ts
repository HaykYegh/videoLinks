import * as functions from "firebase-functions";
import * as express from "express";
import {addLink, getAllLinks, deleteLink, getLink} from "./linksController";
import {admin} from "./config/firebase";
import * as cors from "cors";

const app = express();

app.use(cors({
  origin: "*",
}));

// eslint-disable-next-line max-len
app.get("/", (rec, res) => res.status(200).send("Hey There 22222"));
app.post("/links", addLink);
app.get("/allLinks", getAllLinks);
app.get("/link/:linkId", getLink);
app.delete("/delete/:linkId", deleteLink);

// eslint-disable-next-line max-len
exports.removeExpiredLinks = functions.pubsub.schedule("every 1 minutes").onRun(async () => {
  const db = admin.firestore();
  const now = admin.firestore.Timestamp.now();
  const ts = now.toMillis() - 24 * 60 * 60 * 1000;

  const snap = await db.collection("links").where("createdAt", "<", ts).get();
  const promises: any[] = [];
  snap.forEach((snap) => {
    promises.push(snap.ref.delete());
  });
  return Promise.all(promises);
});

exports.app = functions.https.onRequest(app);
