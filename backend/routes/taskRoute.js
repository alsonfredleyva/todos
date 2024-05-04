import express from 'express';
import {
  addTask,
  getTask,
  removeTask,
  updateTask,
} from '../controllers/taskController.js';
import requireAuth from '../middleware/requireAuth.js';
const router = express.Router();

router.post('/addTask', requireAuth, addTask);
router.get('/getTask', requireAuth, getTask);
router.delete('/removeTask', requireAuth, removeTask);
router.post('/updatetask', requireAuth, updateTask);

export default router;
