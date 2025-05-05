import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  error: string,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  console.error(error);
  res.status(500).json({ message: "Что то пошло не так." });
};
