import { Request, Response, NextFunction } from "express";
import Comment from "../models/Comments";

interface AuthRequest extends Request {
  user?: { id: string };
}

export const createComment = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { lesson, text } = req.body;

    if (!req.user) {
      res.status(401).json({ message: "Пользовтель не найден." });
      return;
    }

    const comment = new Comment({
      user: req.user.id,
      lesson,
      text,
    });
    await comment.save();

    res.status(201).json({ comment });
  } catch (error) {
    next(error);
  }
};

export const getComments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const commentsList = await Comment.find();
    res.json({ commentsList });
  } catch (error) {
    next(error);
  }
};

export const updateComments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    const [user, lesson, text] = req.body;

    const comment = await Comment.findByIdAndUpdate(
      id,
      { user, lesson, text },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!comment) {
      res.status(404).json({ message: "Комментарий не найден" });
      return;
    }

    res.status(200).json({ comment });
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    await Comment.findByIdAndDelete(id);

    res.status(200).json({ message: "Комментарий удален" });
  } catch (error) {
    next(error);
  }
};