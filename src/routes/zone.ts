import express from 'express'
import { addPoint, addWatchman, createZone, deletePoint, deleteZone, getAllZones, searchRecordZone, searchZone, zoneNames } from '../controllers/zone';
import { JwtValidator } from '../helpers/validators';

export const route_zone = express.Router(); 

route_zone.post("/zone", JwtValidator, createZone);
route_zone.get("/zone", JwtValidator, getAllZones);
route_zone.get("/zone/:id", JwtValidator, searchZone);
route_zone.delete("/zone/:id", JwtValidator, deleteZone);
route_zone.get("/zone_names", JwtValidator, zoneNames);

//-------------Points--------------//
route_zone.delete("/point/:id/:id_point", JwtValidator, deletePoint);
route_zone.put("/point/:id", JwtValidator, addPoint);

//-------------Zone----------------//
route_zone.put("/watchman/:id/:id_watchman", JwtValidator, addWatchman)
route_zone.get("/record_zone/:id", JwtValidator, searchRecordZone);