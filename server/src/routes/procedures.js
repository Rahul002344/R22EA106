import { Router } from "express";
import Procedure from "../models/Procedure.js";

const router = Router();

router.get("/", async (_req, res) => {
  const items = await Procedure.find().sort({ name: 1 });
  res.json(items);
});

// Dev-only seed
router.get("/seed", async (req, res) => {
  if ((process.env.NODE_ENV || "development") !== "development") {
    return res.status(403).json({ error: "Seeding disabled" });
  }
  const existing = await Procedure.countDocuments();
  if (existing > 0) return res.json({ ok: true, seeded: false, count: existing });
  const data = [
    { name: "Cataract Surgery", code: "PROC-CT-001", baseCost: 35000 },
    { name: "Knee Replacement", code: "PROC-KN-002", baseCost: 180000 },
    { name: "Root Canal", code: "PROC-DN-003", baseCost: 8000 },
    { name: "Appendectomy", code: "PROC-GS-004", baseCost: 70000 }
  ];
  await Procedure.insertMany(data);
  res.json({ ok: true, seeded: true, count: data.length });
});

export default router;
