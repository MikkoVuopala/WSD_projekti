import { Router } from "../deps.js";
import * as loginController from "./controllers/loginController.js";
import * as regController from "./controllers/registerController.js";
import { showFrontPage } from "./controllers/indexController.js";

const router = new Router();

//all get / post routes

router.get('/auth/login', loginController.showLoginForm);
router.post('/auth/login', loginController.postLoginForm);

router.get('/auth/registration', regController.showRegistrationForm);
router.post('/auth/registration', regController.postRegistrationForm);

router.post('/auth/logout', );

router.get('/behavior/reporting', );
router.post('/behavior/reporting', );

router.get('/behavior/summary', );

router.get('/', showFrontPage);

export { router };