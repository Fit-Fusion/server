import App from './App.js';
import Environment from './Environment.js';
import Router from './Router.js';

const PORT = Environment.getExpressHost();
const app = new App();

const router = new Router(app.getApp());
router.setRoutes();

app.listen(PORT);