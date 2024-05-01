import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import Resource from './resource/Resource.js';
import { DbUser } from './abstracts/Interfaces.js';

const app = express();
const PORT = process.env.PORT || 5555;
const resource = new Resource();


app.use(bodyParser.json());
app.use(cors());

let users: DbUser[] = [];

app.get('/', async (req, res) => {
    try {
        let users = await resource.getUsers();
        let totalNumberOfYears = 10;
        let areasOfConcentration = await resource.getAreasOfConcentration();
        let subscriptions = await resource.getSubscriptions();
        let reviews = await resource.getReviews();

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

app.get('/users/:id', async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        let user = await resource.getUserById(userId);

        res.json({
            user
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'An error occurred while fetching data' });
    }
});

app.get('/users/client-profile/:id', async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        let user = await resource.getUserProfileDataById(userId);

        res.json({
            user
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'An error occurred while fetching data' });
    }
});

// improve
app.get('/users/email/:email', async (req, res) => {
    try {
        const userEmail = req.params.email;
        let user = await resource.getUserByEmail(userEmail);

        res.json({
            user
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'An error occurred while fetching data' });
    }
});

app.post('/user', async (req, res) => {
    try {
        const newUser = req.body;
        await resource.addUser(newUser);

        res.json({ message: 'User added successfully' });
    } catch (error) {
        console.error('Error Posting data:', error);
        res.status(500).json({ error: 'An error occurred while posting data' });
    }
});

app.get('/classes/:id', async (req, res) => {
    try {
        const classId = parseInt(req.params.id);
        let classe = await resource.getClassById(classId);

        res.json({
            classe
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'An error occurred while fetching data' });
    }
});

app.get('/classes/client-profile/:id', async (req, res) => {
    try {
        const classId = parseInt(req.params.id);
        let classes = await resource.getClassesById(classId);

        res.json({
            classes
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'An error occurred while fetching data' });
    }
});

app.get('/classes', async (req, res) => {
    try {
        let classes = await resource.getClasses();

        res.json({
            classes
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'An error occurred while fetching data' });
    }
});


// ---- //

app.post('/users', (req, res) => {
    const newUser = req.body;

    users.push(newUser);
    res.json(newUser);
});

app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const updatedUser = req.body;

    for (let i = 0; i < users.length; i++) {
        if (users[i].id === userId) {
            users[i] = { ...users[i], ...updatedUser };
            break;
        }
    }

    res.json(updatedUser);
});

app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    users = users.filter(user => user.id !== userId);
    res.json({ message: 'User deleted successfully' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
