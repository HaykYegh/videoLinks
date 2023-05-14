import * as functions from "firebase-functions";
import * as express from "express";
import {addLink, getAllLinks, deleteLink} from "./linksController";

const app = express();

// eslint-disable-next-line max-len
app.get("/", (rec, res) => res.status(200).send("Hey There 22222"));
app.post("/links", addLink);
app.get("/allLinks", getAllLinks);
app.delete("/delete/:linkId", deleteLink);

exports.app = functions.https.onRequest(app);
