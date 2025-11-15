import { Router } from 'express';
import { login, register } from '../controllers/user.controller';

const router = Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/add-to-activity');
router.route('/get-all-activity');

export default router;
