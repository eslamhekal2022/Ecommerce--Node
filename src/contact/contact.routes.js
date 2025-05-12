import express from "express";
import { authMiddleware } from "../../MiddleWare/MiddleWare.js";
import { addContact, deleteAllContacts, deleteContact, getContacts } from "./contact.controller.js";

export const ContactRouter=express.Router()

ContactRouter.post("/addContact",authMiddleware,addContact)
ContactRouter.get("/getContacts",getContacts)
ContactRouter.delete("/deleteAllContacts",deleteAllContacts)
ContactRouter.delete("/deleteContact/:id",deleteContact)
