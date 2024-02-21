import express from 'express';
import { connectToMongoDB } from '../db/db.js';
import { ObjectId } from 'mongodb';

const router = express.Router()

router.route('/')
    .post( async (req, res) => {
      try{
        const db = await connectToMongoDB()
        const tasksCollection = db.collection('tasks');
        const result = await tasksCollection.insertOne(req.body);
        res.json(result);
      }catch (error) {
        console.error('Error tasks:', error.message);
        res.status(400).json({ error: error.message });
      }
    })
    .get( async (req, res) => {
        try{
            const db = await connectToMongoDB();
            const usersCollection = db.collection('tasks');
            const tasks = await usersCollection.find().toArray();
            res.json(tasks)
        }catch (error) {
          console.error('Error tasks:', error.message);
          res.status(400).json({ error: error.message });
        }
      });
    

    router.route('/:id')
    .put( async(req, res) => {
        const itemId = req.params.id;
        const db = await connectToMongoDB();
        const collection = db.collection('tasks');
        const objectId = new ObjectId(itemId)

        const result = await collection.updateOne({ _id: objectId }, { $set: req.body});
        if (result.modifiedCount === 1) {
            res.status(200).json({ message: 'Item updateCount successfully' });
          } else {
            res.status(404).json({ message: 'Item not found' });
          }

    })
    .delete( async(req, res) => {
        const itemId = req.params.id;
        try {
            const db = await connectToMongoDB();
            const collection = db.collection('tasks');
            const objectId = new ObjectId(itemId)

            // Delete the item with the specified ID
            const result = await collection.deleteOne({ _id: objectId });
        
            if (result.deletedCount === 1) {
              res.status(200).json({ message: 'Item deleted successfully' });
            } else {
              res.status(404).json({ message: 'Item not found' });
            }
        }catch (error) {
            console.error('Error deleting item:', error);
            res.status(500).json({ message: 'Internal Server Error' });
          }
      
    });



    export default router;