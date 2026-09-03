import { Request, Response } from 'express';

export const getHealth = (_req: Request, res: Response): void => {
  res.status(200).json({
    status: 'success',
    message: 'BharatSkill Nexus API is running'
  });
};
