import { Express } from 'express';
import UserResource from './resource/UserResource.js';
import Resource from './resource/Resource.js';
import ClassResource from './resource/ClassResource.js';

export default class Router {
    private app: Express;
    private userResource = new UserResource();
    private classResource = new ClassResource();
    private resource = new Resource();

    constructor(app: Express) {
        this.app = app;
    }

    public setRoutes() {
        this.setGetRoutes();
        this.setPostRoutes();
        this.setPutRoutes();
        this.setDeleteRoutes();
    }

    // private async handleAsyncError(func: Function, req: Request, res: Response) {
    //     try {
    //         await func(req, res);
    //     } catch (error) {
    //         console.error('Error:', error);
    //         res.status(500).json({ error: 'An error occurred while processing the request' });
    //     }
    // }

    private setGetRoutes() {
        this.app.get('/', async (req, res) => {
            try {
                let users = await this.userResource.getUsers();
                let totalNumberOfYears = 10;
                let areasOfConcentration = await this.resource.getAreasOfConcentration();
                let subscriptions = await this.resource.getSubscriptions();
                let reviews = await this.resource.getReviews();

                res.json({
                    users,
                    totalNumberOfYears,
                    areasOfConcentration,
                    subscriptions,
                    reviews
                });
            } catch (error) {
                console.error('Error fetching data:', error);
                res.status(500).json({ error: 'An error occurred while fetching data' });
            }
        });

        this.app.get('/users/:id', async (req, res) => {
            try {
                const userId = parseInt(req.params.id);
                let user = await this.userResource.getUserById(userId);
        
                res.json({
                    user
                });
            } catch (error) {
                console.error('Error fetching data:', error);
                res.status(500).json({ error: 'An error occurred while fetching data' });
            }
        });

        this.app.get('/users/client-profile/:id', async (req, res) => {
            try {
                const userId = parseInt(req.params.id);
                let user = await this.userResource.getUserProfileDataById(userId);
        
                res.json({
                    user
                });
            } catch (error) {
                console.error('Error fetching data:', error);
                res.status(500).json({ error: 'An error occurred while fetching data' });
            }
        });

        // improve
        this.app.get('/users/email/:email', async (req, res) => {
            try {
                const userEmail = req.params.email;
                let user = await this.userResource.getUserByEmail(userEmail);
        
                res.json({
                    user
                });
            } catch (error) {
                console.error('Error fetching data:', error);
                res.status(500).json({ error: 'An error occurred while fetching data' });
            }
        });

        this.app.get('/classes/:id', async (req, res) => {
            try {
                const classId = parseInt(req.params.id);
                let classe = await this.classResource.getClassById(classId);
        
                res.json({
                    classe
                });
            } catch (error) {
                console.error('Error fetching data:', error);
                res.status(500).json({ error: 'An error occurred while fetching data' });
            }
        });

        this.app.get('/classes/client-profile/:id', async (req, res) => {
            try {
                const classId = parseInt(req.params.id);
                let classes = await this.classResource.getClassesById(classId);
        
                res.json({
                    classes
                });
            } catch (error) {
                console.error('Error fetching data:', error);
                res.status(500).json({ error: 'An error occurred while fetching data' });
            }
        });

        this.app.get('/classes', async (req, res) => {
            try {
                let classes = await this.classResource.getClasses();
        
                res.json({
                    classes
                });
            } catch (error) {
                console.error('Error fetching data:', error);
                res.status(500).json({ error: 'An error occurred while fetching data' });
            }
        });

    }

    private setPostRoutes() {
        this.app.post('/user', async (req, res) => {
            try {
                const newUser = req.body;
                await this.userResource.addUser(newUser);
        
                res.json({ message: 'User added successfully' });
            } catch (error) {
                console.error('Error Posting data:', error);
                res.status(500).json({ error: 'An error occurred while posting data' });
            }
        });
    }

    private setPutRoutes() {
        this.app.put('/users/:id', (req, res) => {
            try {
                const userId = parseInt(req.params.id);
                const updatedUser = req.body;
                updatedUser.id = userId;
        
                this.userResource.updateUser(updatedUser);
        
                res.json({ message: 'User updated successfully', user: updatedUser });
            } catch (error) {
                console.error('Error Posting data:', error);
                res.status(500).json({ error: 'An error occurred while posting data' });
            }
        });
    }

    private setDeleteRoutes() {
        
    }

}