import express from 'express';
import importData from "./dataImporter";
import fileUpload = require("express-fileupload");
import { NextFunction, Request, Response } from "express-serve-static-core";

const app: express.Application = express();
const port = 3000;

app.use(fileUpload({limits: {fileSize: 50 * 1024 * 1024}}));

app.get('/', (req, res) => res.send('Running!'));

app.post('/upload', async (req: Request, res: Response, next: NextFunction) => {
    if (req.files && req.files.file) {
        try {
            const file = req.files.file as fileUpload.UploadedFile;
            await importData(file.data);
            res.send('File uploaded');
        } catch (e) {
            next(e);
        }
    } else {
        res.sendStatus(400);
    }
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));
