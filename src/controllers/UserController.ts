import { Request, Response } from "express";
import Users from "../models/Users";
import bcrypt from "bcrypt";
import { generateToken } from "../services/generateToken";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const userList = await Users.find();
    res.json(userList);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Ошибка при получении списка пользователй" });
  }
};

export const getUserInfo = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    const user = await Users.findById(id);

    if (!user) {
      res.status(404).json({ message: "Пользователь не найден" });
      return;
    }

    res.json({ name: user.name, lastname: user.lastname, email: user.mail });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при получении пользователя" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    const user = await Users.findById(id);
    if (!user) {
      res.status(404).json({ message: "Пользователь не найден" });
      return;
    }

    await Users.findByIdAndDelete(id);
    res.status(200).json({ message: "Пользователь успешно удален" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const registerStudent = async (req: Request, res: Response) => {
  try {
    const { name, lastname, mail, password } = req.body;

    const existingUser = await Users.findOne({ mail });
    if (existingUser) {
      res.status(400).json({ message: "Пользователь уже зарегистрирован" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newStudent = new Users({
      name,
      lastname,
      mail,
      password: hashedPassword,
      role: "student",
    });
    await newStudent.save();

    const token = generateToken(newStudent._id);

    res.status(201).json({
      message: "Регистрация успешна",
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при регистрации" });
  }
};

export const registerTeacher = async (req: Request, res: Response) => {
  try {
    const { name, lastname, mail, password } = req.body;

    const existingUser = await Users.findOne({ mail });
    if (existingUser) {
      res.status(400).json({ message: "Пользователь уже зарегистрирован" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newStudent = new Users({
      name,
      lastname,
      mail,
      password: hashedPassword,
      role: "teacher",
    });
    await newStudent.save();

    const token = generateToken(newStudent._id);

    res.status(201).json({
      message: "Регистрация успешна",
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при регистрации" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { mail, password } = req.body;
    const user = await Users.findOne({ mail });

    if (!user) {
      res.status(400).json({ message: "Неверный email или пароль" });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(400).json({ message: "Неверный email или пароль" });
      return;
    }

    const token = generateToken(user._id);

    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error });
  }
};
