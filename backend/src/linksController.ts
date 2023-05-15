import {Response} from "express";
import {db} from "./config/firebase";
import * as admin from "firebase-admin";

type LinkType = {
  url: string;
  publishedAt: number;
}

type Request = {
  body: LinkType;
  params: {
      linkId: string;
  }
}

const addLink = async (req: Request, res: Response)=> {
  const {url} = req.body;
  try {
    const link = db.collection("links").doc();
    const now = admin.firestore.Timestamp.now();

    const linkObject = {
      id: link.id,
      url,
      createdAt: now.toMillis(),
    };

    link.set(linkObject);

    return res.status(200).send({
      status: "success",
      message: "Link added successfully",
      data: linkObject,
    });
  } catch (error) {
    return res.status(500).json((error as Record<string, any>).message);
  }
};

const getAllLinks = async (req: Request, res: Response)=> {
  try {
    const allLinks: LinkType[] = [];
    const querySnapshot = await db.collection("links").get();
    querySnapshot.forEach((doc: any) => allLinks.push(doc.data()));
    return res.status(200).json(allLinks);
  } catch (error) {
    return res.status(500).json((error as Record<string, any>).message);
  }
};

const getLink = async (req: Request, res: Response)=> {
  const {linkId} = req.params;
  try {
    const link = await db.collection("links").doc(linkId).get();

    return res.status(200).json(link.data());
  } catch (error) {
    return res.status(500).json((error as Record<string, any>).message);
  }
};

const deleteLink = async (req: Request, res: Response)=> {
  const {linkId} = req.params;
  try {
    const link = db.collection("links").doc(linkId);

    await link.delete();

    return res.status(200).json({
      status: "success",
      message: "link deleted successfully",
    });
  } catch (error) {
    return res.status(500).json((error as Record<string, any>).message);
  }
};

export {addLink, getAllLinks, getLink, deleteLink};
