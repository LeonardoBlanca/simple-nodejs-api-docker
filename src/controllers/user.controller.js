import bcrypt from "bcrypt";
import { userValidation } from "../validations/user.validation";
import { createUser, deleteUser, getAll, getByID, updateUser } from "../repositories/user.repository";

export const create = async (req, res) => {
  try {
    await userValidation.validate(req.body, { abortEarly: false })   

    const hashPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashPassword;

    const user = await createUser(req.body);
    res.status(200).send(user);
  } catch (error) {
    if (error.name === 'ValidationError') {
        res.status(400).json({ errors: error.errors }); 
      } else if (error.name === 'PrismaClientValidationError') {
        res.status(400).json({ error: 'Database error' }); // Simple example
      } else {
        console.error("Unexpected Error:", error); 
        res.status(500).send("Something went wrong");
      }
  }
};

export const get = async (req, res) => {
    try {
        const users = await getAll();
        res.status(200).send(users);
    } catch (error) {
        res.status(400).send(error);
    }
}

export const getId = async (req, res) => {
  try {
    const user = await getByID(Number(req.params.id));
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
}

export const update = async (req, res) => {
  try {
    const user = await updateUser(Number(req.params.id), req.body);
    console.log(user);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
}

export const remove = async (req, res) => {
  try {
    await deleteUser(Number(req.params.id));
    res.status(200).send();
  } catch (error) {
    res.status(400).send(error);
  }
}