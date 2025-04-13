/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from "express";
import Users from "../models/Users";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken";

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
  role: string
) => {
  try {
    const { name, lastname, email, password } = req.body;

    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      res.status(400).json({
        message: "Пользователь с таким email уже зарегистрирован",
        token: "",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Users({
      name,
      lastname,
      email,
      password: hashedPassword,
      role: role,
    });

    const token = generateToken(newUser._id);

    res.status(201).json({ message: "Регистрация успешна", token: token });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userList = await Users.find();
    res.json(userList);
  } catch (error) {
    next(error);
  }
};

export const getUserInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user.id;

    const user = await Users.findById(userId);

    if (!user) {
      res.status(404).json({ message: "Пользователь не найден" });
      return;
    }

    const userInfo = {
      name: user.name,
      lastname: user.lastname,
      email: user.email,
    };

    res.json(userInfo);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user.id;

    const user = await Users.findById(userId);
    if (!user) {
      res.status(404).json({ message: "Пользователь не найден" });
      return;
    }

    await Users.findByIdAndDelete(userId);
    res.status(200).json({ message: "Пользователь успешно удален" });
  } catch (error) {
    next(error);
  }
};

export const registerStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await registerUser(req, res, next, "student");
};

export const registerTeacher = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await registerUser(req, res, next, "teacher");
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });

    if (!user) {
      res.status(400).json({ message: "Неверный email или пароль", token: "" });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(400).json({ message: "Неверный email или пароль", token: "" });
      return;
    }

    const token = generateToken(user._id);
    res.status(200).json({ message: "Успешный вход", token: token });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, lastname, email, password, favorites } = req.body;

    const userId = (req as any).user.id;

    const user = await Users.findById(userId);

    if (!user) {
      res.status(404).json({
        message: "Пользователь не найден",
        token: "",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await Users.findByIdAndUpdate(userId, {
      name,
      lastname,
      email,
      password: hashedPassword,
      role: user.role,
      favorites: favorites,
    });

    res.status(200).json({ message: "Пользователь обновлен" });
  } catch (error) {
    next(error);
  }
};
