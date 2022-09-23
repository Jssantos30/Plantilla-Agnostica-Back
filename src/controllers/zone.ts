import { Request, Response } from "express";
import { qrGenerator } from "../helpers/global";
import { zone_model } from "../models/zone";
import { users_model } from "../models/users";

export const createZone = async (req: Request, res: Response) => {
  try {
    new zone_model(req.body).save((error) => {
      if (error) res.json({ msg: error });
      else res.json({ S: "success" });
    });
  } catch (error) {
    res.json({ A: "No fount", error });
    console.error(error);
  }
};

export const getAllZones = async (req: Request, res: Response) => {
  try {
    const data = await zone_model.find();
    res.json(data);
  } catch (error) {
    res.json({ A: "No fount", error });
    console.error(error);
  }
};

export const searchZone = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await zone_model.findOne({ _id: id }).populate("users", "-_id -zones");
    res.json(data);
  } catch (error) {
    res.json({ A: "No fount", error });
    console.error(error);
  }
};

export const searchRecordZone = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await zone_model
      .aggregate([
        {
          $lookup: {
            from: "records",
            localField: "_id",
            foreignField: "zone_id",
            as: "record",
          },
        },
      ])
      .match({ _id: id });
    res.json(data);
  } catch (error) {
    res.json({ A: "No fount", error });
    console.error(error);
  }
};

export const addPoint = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const document = await zone_model.findOne({ _id: id });
    let exist = false;
    if (document != null) {
      let countPoints = 0;
      countPoints = document?.point.length;
      for (let i = 0; i < countPoints; i++) {
        if (document?.point[i].point_name === req.body.point_name) {
          exist = true;
          break;
        }
      }
    }
    if (exist == false) {
      const name = req.body.point_name;
      const datos = {
        id,
        adress: document?.adress,
        name_point: name,
      };
      const qr = await qrGenerator(datos);
      const point = {
        point_name: name,
        qr,
      };
      const data = await zone_model.updateOne({ _id: id }, { $push: { point: point } }, { runValidators: true });
      exist = false;
      res.json({ S: "success" });
    } else {
      if (document) res.json({ A: "point exist" });
      else res.json({ E: "No fount" });
    }
  } catch (error) {
    res.json({ A: "No fount", error });
    console.error(error);
  }
};

export const deleteZone = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await zone_model.deleteOne({ _id: id });
    if (data.deletedCount > 0) res.json({ S: "success" });
    else res.json({ msg: data });
  } catch (error) {
    console.error(error);
    res.json({ msg: error });
  }
};

export const deletePoint = async (req: Request, res: Response) => {
  try {
    const { id, id_point } = req.params;
    console.log(id, id_point);
    const zone = await zone_model.findOne({ _id: id });
    if (zone) {
      const data = await zone_model.updateOne({ _id: id }, { $pull: { point: { _id: id_point } } });
      if (data.modifiedCount > 0) res.json({ S: "delete" });
      else res.json({ A: "incorrect id point" });
    } else {
      res.json({ N1: "no fount" });
    }
  } catch (error) {
    console.error(error);
    res.json({ msg: error });
  }
};

export const zoneNames = async (req: Request, res: Response) => {
  try {
    const data = await zone_model.find({}, { adress: 1 });
    res.json(data);
  } catch (error) {
    res.json({ msg: error });
  }
};

export const addWatchman = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { id_watchman } = req.params;
    const watchman = await users_model.findOne({ _id: id_watchman });
    if (watchman == null) res.json("no fount");
    else if (watchman?.level_user === "WATCHMAN") {
      const watchman_id = {
        watchman_id: watchman?._id,
      };
      const data = await zone_model.updateOne(
        { _id: id },
        { $push: { watchman: watchman_id } },
        { runValidators: true }
      );
      res.json(data);
    } else {
      res.json("admin");
    }
  } catch (error) {
    res.json({ msg: error });
  }
};

const aggZoneToWatchman = async function (id_watchman: any, id_zone: any) {
  const data = await users_model.updateOne({ _id: id_watchman }, { $push: {} });
};
