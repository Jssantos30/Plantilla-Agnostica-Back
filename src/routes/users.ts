import express from "express";
import {
  addZoneTouser,
  createUser,
  deleteUser,
  editUser,
  editUserNoPassword,
  getAllUsers,
  login,
  passwordValidator,
  searchUser,
} from "../controllers/users";
import { JwtValidator } from "../helpers/validators";

export const router_users = express.Router();

router_users.post("/users", JwtValidator, createUser);
router_users.get("/users", JwtValidator, getAllUsers);
router_users.get("/users/:id", JwtValidator, searchUser);
router_users.delete("/users/:id", JwtValidator, deleteUser);
router_users.put("/users/:id/:password", JwtValidator, editUser);
router_users.put("/users/:id", JwtValidator, editUserNoPassword);
router_users.get("/login", login);
router_users.get("/passsword/:document/:password", JwtValidator, passwordValidator);

//-----------zone--------------------//

router_users.put("/aggZone/:id/:id_zone", JwtValidator, addZoneTouser)
