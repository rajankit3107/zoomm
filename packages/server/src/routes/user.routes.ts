import { Router } from 'express';

const router = Router();

router.route('/register');
router.route('/login');
router.route('/add-to-activity');
router.route('/get-all-activity');

export default router;
