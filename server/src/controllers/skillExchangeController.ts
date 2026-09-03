import { Request, Response } from 'express';
import { 
  readSkillExchanges, 
  createSkillExchange, 
  bookExchangeSession 
} from '../services/skillExchangeService.js';

export const getSkillExchanges = (_req: Request, res: Response): void => {
  try {
    const exchanges = readSkillExchanges();
    res.status(200).json({
      status: 'success',
      count: exchanges.length,
      data: exchanges
    });
  } catch (error: any) {
    console.error('Error in getSkillExchanges:', error);
    res.status(500).json({
      status: 'error',
      message: error?.message || 'Failed to fetch skill exchanges'
    });
  }
};

export const postSkillExchange = (req: Request, res: Response): void => {
  try {
    const { type, title, author, authorRole, category, tags, rate, rateUnit, description, availability, sessionDuration } = req.body;

    if (!title || !author) {
      res.status(400).json({
        status: 'error',
        message: 'Title and Author are required'
      });
      return;
    }

    const newItem = createSkillExchange({
      type: type || 'offer',
      title,
      author,
      authorRole: authorRole || 'Student Builder',
      authorAvatar: author.substring(0, 2).toUpperCase(),
      category: category || 'Web Development',
      tags: Array.isArray(tags) ? tags : ['Skills', 'Pairing'],
      rate: Number(rate) || 20,
      rateUnit: rateUnit || (type === 'request' ? 'SC Reward' : 'SC / session'),
      description: description || 'Peer knowledge sharing session.',
      availability: availability || 'Available Now',
      sessionDuration: sessionDuration || '45 mins'
    });

    res.status(201).json({
      status: 'success',
      data: newItem
    });
  } catch (error: any) {
    console.error('Error in postSkillExchange:', error);
    res.status(500).json({
      status: 'error',
      message: error?.message || 'Failed to create skill exchange listing'
    });
  }
};

export const bookSession = (req: Request, res: Response): void => {
  try {
    const { exchangeId, learnerName, scheduledTime } = req.body;

    if (!exchangeId) {
      res.status(400).json({
        status: 'error',
        message: 'exchangeId is required'
      });
      return;
    }

    const receipt = bookExchangeSession(exchangeId, learnerName, scheduledTime);

    res.status(200).json({
      status: 'success',
      receipt
    });
  } catch (error: any) {
    console.error('Error in bookSession:', error);
    res.status(500).json({
      status: 'error',
      message: error?.message || 'Failed to book session'
    });
  }
};
