import { Router, Request, Response } from 'express';
//import mongoose from 'mongoose';
import User from "../schemas/user";

const router: Router = Router();

router.post("/", (req: Request, res: Response) => {
    const name = req.body.name
    const email = req.body.email
    const google = req.body.google
    let password = ""

    if (!google) {
        password = req.body.password
    }

    if (!name || !email) {
        return res.status(400).json({ error: "All fields required" });
    }

    let user = null

    if (google) {
        user = new User({ name, email, google })
    } else {
        user = new User({ name, email, password, google });
    }

    user.save().then((savedItem: any) => { return res.status(201).json(savedItem) }).catch((err: any) => {
        return res.status(500).json({ error: err });
    })
    return;
});

router.get("/", (req: Request, res: Response) => {
    const email = req.query.email;
    const google = req.query.google;
    let password = "";
    if (!google) {
        password = req.body.password;

        User.find({
            "email": email,
            "password": password, 
            "google": google
        }).then(user => {
            if (!user || user.length != 1) {
                return res.status(404).json({ error: "User notttt found" });
            }
            return res.json({ id: user[0]._id });
        }).catch(err => {
            return res.status(500).json({ error: err });
        });
    }
    else {
        User.find({ "email": email}).then(user => {
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            if(user.length != 1){
                return res.status(405).json({error: "More than one user with this email."})
            }
            return res.json({ id: user[0]._id });
        }).catch(err => {
            return res.status(500).json({ error: err })
        });
    }

});

router.delete("/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    User.findByIdAndDelete(id).then(user => {
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.json({ delete: "User is deleted", user: user });
    }).catch(err => {
        return res.status(500).json({ error: err });
    })

});

router.put("/", (req: Request, res: Response) => {
    const { id, chat_id } = req.body;
    User.findByIdAndUpdate(id, { $push: { chats: chat_id } }, { new: true })
        .then((user) => {
            if (!user) {
                return res.status(404).json({ error: "Cannot add chat" });
            }
            return res.json({ id: user._id });
        })
        .catch((err) => {
            return res.status(500).json({ error: err });
        });
});

export default router;

