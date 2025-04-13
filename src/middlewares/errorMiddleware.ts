import { Request, Response, NextFunction } from "express";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (error: string, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    res.status(500).json({ message: "Что то пошло не так.", error: error });
}
