import { Router } from "../deps.js";
import * as userController from "./controllers/userController.js";
import * as userService from "../services/userService.js";
import { showFrontPage } from "./controllers/indexController.js";
import { showMorningReport, showEveningReport } from "./controllers/reportController.js";
import { postMorningReport, postEveningReport } from "../services/reportService.js";

const router = new Router();

//all get / post routes

router.get('/auth/login', userController.showLoginForm);
router.post('/auth/login', userService.postLoginForm);

router.get('/auth/registration', userController.showRegistrationForm);
router.post('/auth/registration', userService.postRegistrationForm);

router.post('/auth/logout', );

router.get('/behavior/reporting', userController.showBehaviorPage);
router.post('/behavior/reporting', );

router.get('/behavior/reporting/morning', showMorningReport);
router.post('/behavior/reporting/morning', postMorningReport);

router.get('/behavior/reporting/evening', showEveningReport);
router.post('/behavior/reporting/evening', postEveningReport);

router.get('/behavior/summary', );

router.get('/', showFrontPage);

export { router };