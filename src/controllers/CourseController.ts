import { Request, Response, NextFunction } from "express";
import Course, { ICourse } from "../models/Courses";
import { FilterQuery } from "mongoose";
import slugify from "slugify";

export const createCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      title,
      description,
      price,
      category,
      image,
      level,
      published,
      author,
    } = req.body;

    const newCourse = new Course({
      title,
      slug: slugify(description),
      description,
      price,
      image,
      category,
      level,
      published,
      author,
    });
    await newCourse.save();

    res.status(201).json({
      message: "Курс добавлен",
      course: newCourse,
    });
  } catch (error) {
    next(error);
  }
};

export const getCourses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, category, level, sort, page = 1, limit = 10 } = req.body;

    const filter: FilterQuery<ICourse> = {};
    if (title) {
      filter.title = { $regex: title, $options: "i" };
    }
    if (category) {
      filter.category = category;
    }
    if (level) {
      filter.level = level;
    }

    const skip = (page - 1) * limit;

    const courseList = await Course.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    res.status(201).json({ message: "Список курсов получен.", courseList });
  } catch (error) {
    next(error);
  }
};

export const getCourseById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(403).json({ message: "Не указан id курса." });
    }
    const course = await Course.findById(id);

    if (!course) {
      res.status(404).json({ message: "Курс не найден." });
    }

    res.status(201).json({ message: "Курс получен.", course });
  } catch (error) {
    next(error);
  }
};

export const updateCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    if (!id) {
      res.status(403).json({ message: "Не указан id курса." });
    }

    const course = await Course.findById(id);

    if (!course) {
      res.status(404).json({ message: "Курс не найден." });
    }

    const {
      title,
      description,
      price,
      category,
      image,
      level,
      published,
      author,
    } = req.body;

    const newCourse = await Course.findByIdAndUpdate(id, {
      title,
      description,
      slug: slugify(description),
      price,
      category,
      image,
      level,
      published,
      author,
    });

    res.status(201).json({
      message: "Курс изменен.",
      newCourse,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(403).json({ message: "Не указан id курса." });
    }

    const course = await Course.findById(id);
    if (!course) {
      res.status(404).json({ message: "Не удалось найти курс." });
      return;
    }

    await Course.findByIdAndDelete(id);
    res.status(201).json({ message: "Курс успешно удален." });
  } catch (error) {
    next(error);
  }
};
