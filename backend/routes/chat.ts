import { Request, Response, Router  } from "express";
// schema import
import Chat from "../schemas/chat";

const router: Router = Router();

router.post("/", (req: Request, res: Response) => {
    const {link} = req.body as Chat;
    const {title} = req.body as Chat;

    if(!link || !title){
        return res.status(400).json({error: "A chat requires a link and title"});
    }

    const chat = new Chat({title, link});

    chat.save().then(savedItem => {
        return res.status(201).json(savedItem);
    }).catch(err=> {
        return res.status(500).json({error: err});
    });
    return;
});

router.delete("/:id", (req: Request, res: Response) =>{
    const {id} = req.params;
    Chat.findByIdAndDelete(id).then((chat) => {
        if (!chat){
            return res.status(404).json({error: "Could not find chat!"});
        } else {
            return res.json({action: "Deleted chat.", name: chat.title, id: id});
        }
    }).catch(err => {
        return res.status(500).json({error: err});
    });
});

router.get("/:id", (req: Request, res: Response) =>{
    const {id} = req.params;
    Chat.findById(id).then((chat) => {
        if (!chat){
            return res.status(404).json({error: "Could not find chat!"});
        } else {
            return res.json({name: chat.title, 
                            id: id, 
                            link: chat.link, 
                            messages: chat.messages});
        }
    }).catch(err => {
        return res.status(500).json({error: err});
    });
});

// may change
router.post("/u", (req: Request, res: Response) =>{
    const {id, message_id} = req.body;
    Chat.findOneAndUpdate({_id: id}, { $push: { messages: message_id  } }).then((chat) => {
        if (!chat){
            return res.status(404).json({error: "Could not find chat!"});
        } else {
            return res.json({name: chat.title, id: id});
        }
    }).catch(err => {
        return res.status(500).json({error: err});
    });
});

export default router;
