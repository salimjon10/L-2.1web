import { Request, Response, NextFunction } from "express";
import Enrollment from "../models/Enrollment";
import Lesson from "../models/Lessons";

interface AuthRequest extends Request {
  user?: { id: string };
}

export const createEnrollment = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Пользовтель не найден." });
      return;
    }

    const { course, allLessons } = req.body;

    if (allLessons.length === 0) {
      res.status(401).json({ message: "Список уроков не может быть пустым." });
      return;
    }

    const enrollment = new Enrollment({
      user: req.user.id,
      course,
      allLessons,
    });
    await enrollment.save();

    res.status(201).json({ enrollment });
  } catch (error) {
    next(error);
  }
};

export const completeLesson = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { enrollementId, lessonId } = req.params;

    const enrollment = await Enrollment.findById(enrollementId);
    const lesson = await Lesson.findById(lessonId);

    if (!enrollment || !lesson) {
      res.status(404).json({ message: "Запись или урок не найдены." });
      return;
    }

    if (!lesson || lesson.course.toString() != enrollment.course.toString()) {
      res.status(404).json({
        message: "урок не найден или не соответствует записанному курсу.",
      });
      return;
    }

    if (
      !enrollment.allLessons.includes(lesson.id) ||
      enrollment.completedLessons.includes(lesson.id)
    ) {
      res.status(401).json({
        message: "урок не обязательный или уже выполнен.",
      });
      return;
    }

    const progress =
      (enrollment.completedLessons.length + 1) / enrollment.allLessons.length;

    enrollment.completedLessons.push(lesson.id);
    enrollment.progress = progress;

    await enrollment.save();

    res.status(200).json({ enrollment });
  } catch (error) {
    next(error);
  }
};

export const uncompleteLesson = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { enrollementId, lessonId } = req.params;

    const enrollment = await Enrollment.findById(enrollementId);
    const lesson = await Lesson.findById(lessonId);

    if (!enrollment || !lesson) {
      res.status(404).json({ message: "Запись или урок не найдены." });
      return;
    }

    if (!enrollment.completedLessons.includes(lesson.id)) {
      res.status(401).json({
        message: "Урок не выполнен.",
      });
      return;
    }

    const progress =
      (enrollment.completedLessons.length - 1) / enrollment.allLessons.length;

    enrollment.completedLessons.splice(lesson.id, 1);
    enrollment.progress = progress;

    await enrollment.save();

    res.status(200).json({ enrollment });
  } catch (error) {
    next(error);
  }
};

export const enrollmentProgress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { enrollementId } = req.params;

    const enrollment = await Enrollment.findById(enrollementId);

    if (!enrollment) {
      res.status(404).json({
        message: "Запись не найдена",
      });
      return;
    }

    res.status(200).json({ progress: enrollment.progress });
  } catch (error) {
    next(error);
  }
};

export const enrollmentUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { courseId } = req.params;

    const users = await Enrollment.find({ course: courseId }, "user").populate("user");

    res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};
