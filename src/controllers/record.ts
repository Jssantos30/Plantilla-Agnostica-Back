import { Request, Response } from "express";
import { sumDate } from "../helpers/global";
import { record_model } from "../models/record";

export const addRecord = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    new record_model(req.body).save((error) => {
      if (error) res.json(error);
      else res.json("s");
    });
  } catch (error) {
    res.json({ msg: error });
  }
};

export const getAllRecord = async (req: Request, res: Response) => {
  try {
    const data = await record_model.find();
    res.json(data);
  } catch (error) {
    res.json({ msg: error });
  }
};

export const searchRecord = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await record_model.find({ zone_id: id });
    data ? res.json(data) : res.json({ A: "No fount" });
  } catch (error) {
    res.json(error);
  }
};

export const searchRecordWithUser = async (req: Request, res: Response) => {
  try {
    const { id_watchman, zone_id, since, until } = req.params;
    if (id_watchman == "**") {
      console.log("ok :) 1");
      const data = await record_model.find({
        $and: [
          { zone_id: zone_id },
          {
            date: {
              $gte: since,
              $lt: sumDate(until),
            },
          },
        ],
      });
      if (data.length == 0) res.json({ A: "No fount" });
      else res.json(data);
    } else {
      console.log("ok :) 2");
      const data = await record_model.find({
        $and: [
          { zone_id: zone_id },
          { id_watchman: id_watchman },
          {
            date: {
              $gte: since,
              $lt: sumDate(until),
            },
          },
        ],
      });
      if (data.length == 0) res.json({ A: "No fount" });
      else res.json(data);
    }
  } catch (error) {
    res.json({ msg: error });
  }
};
