import express from 'express';
import { messagesPage, addMessage, registerToken } from '../controllers';
import { modifyMessage, performAsyncAction } from '../middleware';

const indexRouter = express.Router();
indexRouter.get('/messages', messagesPage);
indexRouter.post('/messages', modifyMessage, performAsyncAction, addMessage);
indexRouter.post('/registerToken', registerToken);

export default indexRouter;
