import express from 'express';
import importData from "./dataImporter";
import fileUpload = require("express-fileupload");
import { Request, Response } from "express-serve-static-core";

const app: express.Application = express();
const port = 3000;

const fileUploadHandler = async (req: Request, res: Response) => {
    if (req.files && req.files.file) {
        try {
            const file = req.files.file as fileUpload.UploadedFile;
            await importData(file.data);
            res.send('File uploaded');
        } catch (e) {
            res.status(500).send(e);
        }
    } else {
        res.sendStatus(400);
    }
};

app.use(fileUpload({limits: {fileSize: 50 * 1024 * 1024}}));
app.use(express.static(__dirname + '/../../../client/build'));
app.post('/upload', fileUploadHandler);

app.listen(port, () => console.log(`Server listening on port ${port}!`));

export default app;