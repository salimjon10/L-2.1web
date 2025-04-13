import { Request, Response, NextFunction } from "express";
import Tags from "../models/Tags";

export const createTag = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { tag } = req.body;

    const newTag = new Tags({
      tag,
    });
    await newTag.save();

    res.status(201).json({
      message: "Тег создан",
      course: newTag,
    });
  } catch (error) {
    next(error);
  }
};

export const getTags = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tags = await Tags.find();

    res.status(201).json({ message: "Список тегов получен.", tags });
  } catch (error) {
    next(error);
  }
};

export const deleteTag = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const tag = await Tags.findById(id);

    if (!tag) {
      res.status(403).json({ message: "id тега не найдено" });
      return;
    }

    await Tags.findByIdAndDelete(id);

    res.status(201).json({ message: "Тег успешно удален" });
  } catch (error) {
    next(error);
  }
};
