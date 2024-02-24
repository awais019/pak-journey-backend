import { Request, Response } from "express";

export default (req: Request, res: Response) => {
  return res.send("Server loaded successfully!");
};
