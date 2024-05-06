import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Express } from 'express';

export default class App {
    private app: Express;

    constructor() {
        this.app = express();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(cors());
    }

    public getApp(): Express {
        return this.app;
    }

    public listen(port: number) {
        this.app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    }
}