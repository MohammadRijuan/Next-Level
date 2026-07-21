import type { Request } from "express";
import { pool } from "../../db";
import type { Iuser } from "./user.interface";

const createUserIntoDb = async (payload: Iuser) => {
  const { name, email, password, age } = payload;

  const result = await pool.query(
    `INSERT INTO USERS(name,email,password,age) VALUES($1,$2,$3,$4)
    RETURNING * `,
    [name, email, password, age],
  );

  return result;
};

// get all user from db

const getAllUserFromDb = async () => {
  const result = await pool.query(`SELECT * FROM USERS`);
  return result;
};

// get single user
const getSingleUserFromDb = async (id: string) => {
  const result = await pool.query(
    `
    SELECT * FROM USERS WHERE id=$1`,
    [id],
  );
  return result;
};

// update a user

const updateUserFromDb = async (payload: Iuser, id: string) => {
  const { name, password, age, is_Active } = payload;

  // COALESCE() is a PostgreSQL function that returns the first non-NULL value

  const result = await pool.query(
    `
  UPDATE users
  SET
    name = COALESCE($1, name),
    password = COALESCE($2, password),
    age = COALESCE($3, age),
    is_active = COALESCE($4, is_active)
  WHERE id = $5
  RETURNING *;
  `,
    [name, password, age, is_Active, id],
  );
  return result;
};

// delete user from db

const deleteUserFromDb = async(id :string) => {
  const result = await pool.query(
    `
      DELETE FROM users
      WHERE id = $1
      RETURNING *;
      `,
    [id],
  );

  return result
};

export const userService = {
  createUserIntoDb,
  getAllUserFromDb,
  getSingleUserFromDb,
  updateUserFromDb,
  deleteUserFromDb
};
