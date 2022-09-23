import express from "express";
import { addRecord, getAllRecord, searchRecord, searchRecordWithUser } from "../controllers/record";
import { JwtValidator } from "../helpers/validators";

export const router_record = express.Router();

router_record.post("/record", JwtValidator, addRecord);
router_record.get("/record", JwtValidator, getAllRecord);
router_record.get("/record/:id", JwtValidator, searchRecord);
router_record.get("/record_history/:zone_id/:id_watchman/:since/:until", JwtValidator, searchRecordWithUser);
