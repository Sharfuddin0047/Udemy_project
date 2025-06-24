import express from "express";
import mongoose from "mongoose";
import { UserService } from "./../services/user/UserService.js";
import { PayloadError, InternalError } from "./../errors/index.js";


const userRouter = express.Router();

export const userRoutes = (router) => {

    router.use('/user', userRouter);

    userRouter.get('/:_id', (req, res) => {
        console.log(`Hitting the GET user endpoint`);
        const id = req.params._id;

        //validate if id is the valid mongo id.
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json(
                new PayloadError(
                    '_id',
                    'Invalid userId',
                    'user'
                )
            )
            return;
        }
        
        UserService.get(id)
            .then(user => res.status(200).json(user))
            .catch(err => res.status(500)
            .json(new InternalError(
                'Failed to get user',
                'user'
            )))
    });

    userRouter.post('/', async (req, res) => {
        console.log('Hitting the POST use endpoint');

        UserService.create(req.body)
            .then(user => res.status(200).json(user))
            .catch(err => {

                const service = 'user';

                //Catch 400 type error first
                //Check for duplicate error
                if (err.code === 11000) {

                    const msg = [`User with ${err.keyValue.email} already exists`];
                    const key = Object.keys(err.keyPattern)[0] || 'email';

                    res.status(400).json(new PayloadError(key, msg, service));
                    return;
                };

                //Validation error
                if (err.name === 'ValidationError') {
                    const msg = Object.values(err.errors).map(e => e.message);
                    const key = Object.keys(err.errors);
                    res.status(400).json(new PayloadError(key, msg, service));
                    return;
                }

                return res.status(500).json(new InternalError(`Failed to create user`, service));
            })
    });

    userRouter.put('/:_id', async (req, res) => {
        console.log('Hitting the PUT endpoint');

        const id = req.params._id;

         //validate if id is the valid mongo id.
         if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json(
                new PayloadError(
                    '_id',
                    'Invalid userId',
                    'user'
                )
            )
            return;
        }
        
        const data = req.body;

        UserService.update(id, data)
        .then(user => res.status(200).json(user))
        .catch(err => res.status(500).json(
            new InternalError(
            'Failed to update user',
            'user'
        )))
        
    });

    userRouter.delete('/:_id', (req, res) => {
        console.log(`Hitting the DELETE user endpoint`);
        

        const id = req.params._id;

         //validate if id is the valid mongo id.
         if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json(
                new PayloadError(
                    '_id',
                    'Invalid userId',
                    'user'
                )
            )
            return;
        }

        UserService.delete(id)
            .then(user => {
                if(user){
                    res.status(200).json({
                        message: `User with ${id} has been deleted`
                    })
                } else {
                    res.status(404).json({
                        message: `User with ${id} not found`
                    })
                }
            })
            .catch(err => res.status(500).json(
                new InternalError(
                    'Failed to delete user',
                    'user'
                )
            ))
    });

    
};