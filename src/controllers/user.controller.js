import bcrypt from "bcrypt"
import { createUser } from "../repositories/user.repository";

export const create = async (req, res) => {
    try {
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashPassword;
        const user = await createUser(req.body);
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
}