import { Request, Response } from "express";
import { generarJwt } from "../helpers/jwtGenerator";
import { users_model } from "../models/users";

export const createUser = async (req: Request, res: Response) => {
  try {
    new users_model(req.body).save((error) => {
      if (error) {
        res.json({ msg: error });
      } else {
        res.json({ S: "Saved" });
      }
    });
  } catch (error) {}
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const data = await users_model.find({}, { password: 0 });
    res.json(data);
  } catch (error) {
    res.json({ msg: error });
  }
};

export const searchUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await users_model.findById({ _id: id }, { password: 0 }).populate("zones", "-_id -watchman");
    res.json(data);
  } catch (error) {
    console.error(error);
    res.json({ msg: error });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await users_model.deleteOne({ document: id });
    res.json(data);
  } catch (error) {
    res.json({ msg: error });
  }
};

export const editUser = async (req: Request, res: Response) => {
  try {
    const { id, pass } = req.params;
    const { level_user, name, lastnames, document, phone_number, last_name, password, state } = req.body;
    const data = await users_model.updateOne(
      { $and: [{ document: id, pass: pass }] },
      {
        $set: {
          document: document,
          last_name: last_name,
          phone_number: phone_number,
          lever_user: level_user,
          name: name,
          lastnames: lastnames,
          password: password,
          state: state,
        },
      },
      { runValidators: true }
    );
    res.json({ S: "put user" });
  } catch (error) {
    console.error(error);
    res.json({ msg: error });
  }
};
export const editUserNoPassword = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { level_user, name, document, phone_number, last_name, state, zones } = req.body;
    const data = await users_model.updateOne(
      { _id: id },
      {
        $set: {
          document: document,
          last_name: last_name,
          phone_number: phone_number,
          lever_user: level_user,
          name: name,
          state: state,
          zones: zones,
        },
      },
      { runValidators: true }
    );
    res.json({ S: "put user" });
  } catch (error) {
    res.json({ msg: error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { document, password } = req.query;
    const data = await users_model.findOne(
      {
        $and: [{ document: document }, { password: password }],
      },
      { password: 0 }
    );
    if (data) {
      const token = await generarJwt(data.id);
      res.json({ data, token });
    } else res.json({ msg: "No fount" });
  } catch (error) {
    res.json({ msg: error });
  }
};

export const passwordValidator = async (req: Request, res: Response) => {
  try {
    const { document, password } = req.params;

    const data = await users_model.findOne({
      $and: [{ document: document }, { password: password }],
    });

    if (data) res.json({ S: "good" });
    else res.json({ msg: "no fount" }).status(400);
  } catch (error) {
    res.json({ msg: error });
  }
};

export const addZoneTouser = async (req: Request, res: Response) => {
  try {
    const { id, id_zone } = req.params;
    const data = await users_model.findByIdAndUpdate(
      id,
      { $addToSet: { zones: id_zone } },
      { new: true, useFindAndModify: false }
    );
    res.json(data);
  } catch (error) {
    res.json({ msg: error });
  }
};
