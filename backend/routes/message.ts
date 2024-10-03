import { Router, Request, Response } from "express";
import Message from "../schemas/message"
const router: Router = Router();

router.post("/", (req: Request, res: Response) => {

    const { text, type } = req.body as Message;

    if (!text || !type) {
        return res.status(400).json({ error: "Text and Type required" });
    }

    const message = new Message({ text, type });

    message.save().then(savedItem => {
        return res.status(201).json(savedItem)
    }).catch(err => {
        return res.status(500).json({ error: err });
    })
    return;
});

router.get("/:id", (req: Request, res: Response) => {

    const { id } = req.params;

    Message.findById(id).then(message => {
        if (!message) {
            return res.status(404).json({ error: "Message not found" });
        }
        return res.json(message);
    }).catch(err => {
        return res.status(500).json({ error: err });
    })

    return;
});

router.delete("/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    Message.findByIdAndDelete(id).then(message => {
        if (!message) {
            return res.status(404).json({ error: "Message not found" });
        }
        return res.json({ delete: "Message is deleted", message: message });
    }).catch(err => {
        return res.status(500).json({ error: err });
    })

});

// No update at the moment. 



export default router; 