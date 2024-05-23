import App from './App.js';
import Environment from './Environment.js';
import Router from './Router.js';

const PORT = Environment.getExpressHost();
const app = new App();
const expressInstance = app.getApp();

const router = new Router(expressInstance);
router.setRoutes();

app.listen(PORT);