import { Express } from 'express';
import UserResource from './resource/UserResource.js';
import Resource from './resource/Resource.js';
import ClassResource from './resource/ClassResource.js';
import ReviewResource from './resource/ReviewResource.js';

export default class Router {
    private app: Express;
    private userResource = new UserResource();
    private classResource = new ClassResource();
    private reviewResource = new ReviewResource();
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

    private setGetRoutes() {
        this.app.get('/', async (req, res) => {
            try {
                let totalUsers = await this.userResource.getTotalUsers();
                let totalTrainers = await this.userResource.getTotalTrainers();
                let totalNumberOfYears = 10;
                let areasOfConcentration = await this.resource.getAreasOfConcentration();
                let subscriptions = await this.resource.getSubscriptions();
                let reviews = await this.reviewResource.getReviews();

                console.log(totalUsers, totalTrainers)

                res.json({
                    totalUsers,
                    totalTrainers,
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

        this.app.get('/users', async (req, res) => {
            try {
                let users = await this.userResource.getUsers();
        
                res.json({
                    users
                });
            } catch (error) {
                console.error('Error fetching data:', error);
                res.status(500).json({ error: 'An error occurred while fetching data' });
            }
        });

        this.app.get('/users/profile/client/:id', async (req, res) => {
            try {
                const clientId = parseInt(req.params.id);
                let client = await this.userResource.getClientProfileDataById(clientId);
                
                res.json({
                    client
                });
            } catch (error) {
                console.error('Error fetching data:', error);
                res.status(500).json({ error: 'An error occurred while fetching data' });
            }
        });
        
        this.app.get('/users/profile/trainer/:id', async (req, res) => {
            try {
                const trainerId = parseInt(req.params.id);
                let trainer = await this.userResource.getTrainerProfileDataById(trainerId);
        
                res.json({
                    trainer
                });
            } catch (error) {
                console.error('Error fetching data:', error);
                res.status(500).json({ error: 'An error occurred while fetching data' });
            }
        });

        this.app.get('/users/profile/admin/:id', async (req, res) => {
            try {
                const adminId = parseInt(req.params.id);

                let admin = await this.userResource.getAdminProfileDataById(adminId);
        
                res.json({
                    admin
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

        this.app.get('/classes/profile/client/:id', async (req, res) => {
            try {
                const clientId = parseInt(req.params.id);
                let clientClasses = await this.classResource.getClientClassesById(clientId);
        
                res.json({
                    clientClasses
                });
            } catch (error) {
                console.error('Error fetching data:', error);
                res.status(500).json({ error: 'An error occurred while fetching data' });
            }
        });

        this.app.get('/classes/profile/trainer/:id', async (req, res) => {
            try {
                const trainerId = parseInt(req.params.id);
                let trainerClasses = await this.classResource.getTrainerClassesById(trainerId);
        
                res.json({
                    trainerClasses
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

        this.app.get('/reviews', async (req, res) => {
            try {
                let reviews = await this.reviewResource.getReviews();
        
                res.json({
                    reviews
                });
            } catch (error) {
                console.error('Error fetching data:', error);
                res.status(500).json({ error: 'An error occurred while fetching data' });
            }
        });

        this.app.get('/messages', async (req, res) => {
            try {
                let messages = await this.resource.getMessages();
        
                res.json({
                    messages
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
                await this.userResource.updateUserSubscriptionStatus(newUser);
        
                res.json({ message: 'User added successfully' });
            } catch (error) {
                console.error('Error Posting data:', error);
                res.status(500).json({ error: 'An error occurred while posting data' });
            }
        });

        this.app.post('/class', async (req, res) => {
            try {
                const newClass = req.body;
                await this.classResource.addClass(newClass);
        
                res.json({ message: 'Class added successfully' });
            } catch (error) {
                console.error('Error Posting data:', error);
                res.status(500).json({ error: 'An error occurred while posting data' });
            }
        });

        this.app.post('/review', async (req, res) => {
            try {
                const newReview = req.body;
                await this.reviewResource.addReview(newReview);
        
                res.json({ message: 'Review added successfully' });
            } catch (error) {
                console.error('Error Posting data:', error);
                res.status(500).json({ error: 'An error occurred while posting data' });
            }
        });

        this.app.post('/message', async (req, res) => {
            try {
                const newMessage = req.body;
                await this.resource.addMessage(newMessage);
        
                res.json({ message: 'Message added successfully' });
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
        
                this.userResource.updateUserProfileData(updatedUser);
        
                res.json({ message: 'User updated successfully', user: updatedUser });
            } catch (error) {
                console.error('Error Posting data:', error);
                res.status(500).json({ error: 'An error occurred while updating user' });
            }
        });

        this.app.put('/admin/client/:id', (req, res) => {
            try {
                const userId = parseInt(req.params.id);
                const updatedUser = req.body;
                updatedUser.id = userId;
        
                this.userResource.updateClient(updatedUser);
        
                res.json({ message: 'User updated successfully', user: updatedUser });
            } catch (error) {
                console.error('Error Posting data:', error);
                res.status(500).json({ error: 'An error occurred while updating user' });
            }
        });

        this.app.put('/users/admin/:id', (req, res) => {
            try {
                const adminId = parseInt(req.params.id);
                const updatedAdmin = req.body;
                updatedAdmin.id = adminId;
        
                this.userResource.updateAdminProfileData(updatedAdmin);
        
                res.json({ message: 'User updated successfully', admin: updatedAdmin });
            } catch (error) {
                console.error('Error Posting data:', error);
                res.status(500).json({ error: 'An error occurred while updating admin' });
            }
        });

        this.app.put('/reset-email-password/users/:id', (req, res) => {
            try {
                const userId = parseInt(req.params.id);
                const updatedUser = req.body;
                updatedUser.id = userId;
        
                this.userResource.updateUserEmailPassword(updatedUser);
        
                res.json({ message: 'User updated successfully', user: updatedUser });
            } catch (error) {
                console.error('Error Posting data:', error);
                res.status(500).json({ error: 'An error occurred while updating user' });
            }
        });

        this.app.put('/classes/:id', async (req, res) => {
            try {
                const classId = parseInt(req.params.id);
                const updatedClass = req.body;
                updatedClass.id = classId;
        
                await this.classResource.updateClass(updatedClass);
        
                res.json({ message: 'Class updated successfully', class: updatedClass });
            } catch (error) {
                console.error('Error updating class:', error);
                res.status(500).json({ error: 'An error occurred while updating class' });
            }
        });
    }

    private setDeleteRoutes() {
        this.app.delete('/classes/:id', async (req, res) => {
            try {
                const classId = parseInt(req.params.id);
                await this.classResource.deleteClass(classId);
        
                res.json({ message: 'Class deleted successfully' });
            } catch (error) {
                console.error('Error deleting class:', error);
                res.status(500).json({ error: 'An error occurred while deleting class' });
            }
        });

        this.app.delete('/users/:id', async (req, res) => {
            try {
                const userId = parseInt(req.params.id);
                await this.userResource.deleteUser(userId);
        
                res.json({ message: 'User deleted successfully' });
            } catch (error) {
                console.error('Error deleting user:', error);
                res.status(500).json({ error: 'An error occurred while deleting user' });
            }
        });

        this.app.delete('/messages/:id', async (req, res) => {
            try {
                const messageId = parseInt(req.params.id);
                await this.resource.deleteMessage(messageId);
        
                res.json({ message: 'Message deleted successfully' });
            } catch (error) {
                console.error('Error deleting message:', error);
                res.status(500).json({ error: 'An error occurred while deleting message' });
            }
        });

        this.app.delete('/reviews/:id', async (req, res) => {
            try {
                const reviewId = parseInt(req.params.id);
                await this.reviewResource.deleteReview(reviewId);
        
                res.json({ message: 'Review deleted successfully' });
            } catch (error) {
                console.error('Error deleting review:', error);
                res.status(500).json({ error: 'An error occurred while deleting review' });
            }
        });
    }
}