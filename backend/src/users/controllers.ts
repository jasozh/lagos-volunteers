import { Prisma } from "@prisma/client";
import { Request, Response } from "express";

// We are using one connection to prisma client to prevent multiple connections
import prisma from "../../prisma/seed";

/**
 * Finds all users in DB
 * @returns promise with all users or error
 */

// Note that the status code being sent with responses.
const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Sign up a new user. User details are passed in request body
 * @returns promise with user or error
 */

const createNewUser = async (req: Request, res: Response) => {
  try {
    const result = await prisma.user.create({
      data: {
        ...req.body,
      },
    });

    res.status(201).json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export default {
  getUsers,
  createNewUser,
};
