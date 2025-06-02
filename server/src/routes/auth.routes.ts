import { Request, Response } from "express";
import express from "express";

const router = express.Router();

router.get("/login", (req: Request, res: Response) => {});
router.get("/logout", (req: Request, res: Response) => {});
router.get("/register", (req: Request, res: Response) => {});
router.get("/verify", (req: Request, res: Response) => {});
router.get("/forgot-password", (req: Request, res: Response) => {});
router.get("/reset-password", (req: Request, res: Response) => {});

