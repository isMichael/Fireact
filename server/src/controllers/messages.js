import Model from '../models/model';
import { sendNotificationToClient } from '../notify';

const messagesModel = new Model('messages');
const tokensModel = new Model('tokens');

export const messagesPage = async (req, res) => {
  try {
    const data = await messagesModel.select('name, message');
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};

export const addMessage = async (req, res) => {
  const { name, message, token } = req.body;
  const columns = 'name, message';
  const values = `'${name}', '${message}'`;
  try {
    const data = await messagesModel.insertWithReturn(columns, values);
    const tks = await tokensModel.select('token');
    const tokens = [tks.rows];
    const notificationData = {
      title: 'New message',
      body: message,
    };
    sendNotificationToClient(tokens, notificationData);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    const tks = await tokensModel.select('token');
    res.status(200).json({ messages: err.stack, res: tks.rows });
  }
};

export const registerToken = async (req, res) => {
  const { token } = req.body;
  const columns = 'token';
  const values = `'${token}'`;
  try {
    const data = await tokensModel.insertWithReturn(columns, values);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};
