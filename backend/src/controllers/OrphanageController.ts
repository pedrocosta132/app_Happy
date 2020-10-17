import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanage';
import * as Yup from 'yup';

import orphanageView from '../views/orphanage_view';

export default {

    //Get all
    async index(req: Request,res: Response){
        const orphanageRep = getRepository(Orphanage);

        const orphanagesList = await orphanageRep.find({
            relations: ['images']
        });

        return res.json(orphanageView.renderMany(orphanagesList));
    },

    //Get one
    async show(req: Request,res: Response){
        const orphanageRep = getRepository(Orphanage);

        const { id } = req.params;

        const orphanage = await orphanageRep.findOneOrFail(id, {
            relations: ['images']
        });

        return res.json(orphanageView.render(orphanage));
    },

    //Create
    async create(req: Request,res: Response){

        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekend
        } = req.body;

        const reqImages = req.files as Express.Multer.File[];
        const images = reqImages.map(image => {
            return { path: image.filename }
        } )
    
        const orphanageRep = getRepository(Orphanage);

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekend: open_on_weekend == 'true',
            images
        }

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekend: Yup.boolean().required(),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required()
                })
            )
        })

        await schema.validate(data, {
            abortEarly: false,
        })
    
        const orphanage = orphanageRep.create(data);
    
        await orphanageRep.save(orphanage);

        return res.status(201).json(orphanage);
    }
}