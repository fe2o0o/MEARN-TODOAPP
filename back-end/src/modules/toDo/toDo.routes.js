import { Router } from 'express';
import {notesModel} from '../../../database/models/notes.model.js'
import { auth } from '../../middlewares/auth.js';
const router = Router();

router.post('/addToDo', auth ,async (req,res) => {
    const { title, content } = req.body;
    const { userId } = req;

    if (title.trim().length ==0 || content.trim().length == 0) {
        return res.status(400).json({status:"faild" , message:"All Data Is Required"})
    }

    const addToDo = await notesModel.create({ title, content, userId })

    res.status(201).json({status:"success" , message:"To Do Added"})

})


router.get('/userToDo', auth ,async (req,res) => {
    const { userId } = req;

    const userToDo = await notesModel.find({userId} ,'-userId')

    res.status(200).json({status:'success' , data:userToDo})

})


router.delete('/toDo/:id', auth, async (req, res) => {
    const { id } = req.params;
    const { userId } = req;

    const deleteToDo = await notesModel.deleteOne({ _id: id, userId: userId })
    
    res.status(200).json({status:'success' , message:"Task Deleted"})

})


router.get('/toDo/:id', auth, async (req,res) => {
    const { id } = req.params;
    const { userId } = req;

    const toDo = await notesModel.findOne({ _id: id, userId: userId })
    
    res.status(200).json({status:"success" , data:toDo})
})


router.put('/toDo/:id', auth, async (req, res) => {
    const { title, content } = req.body;
    const { id } = req.params;
    const { userId } = req;

    const update = await notesModel.updateOne({ _id: id, userId: userId }, { title, content })
    
    res.status(204).json({status:'success' , data:update})

})


router.patch('/todo/:id', auth, async (req, res) => {
    const { isDone } = req.body
    const { id } = req.params;
    const { userId } = req;
    const updateStatus = await notesModel.findOneAndUpdate({_id:id , userId:userId},{isDone:Boolean(isDone)})

    res.status(204).json({status:'success' , message:"up date status"})
})


export default router