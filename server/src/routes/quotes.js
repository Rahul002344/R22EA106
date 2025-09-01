import { Router } from "express";
import { body, validationResult } from "express-validator";
import { auth } from "../middleware/auth.js";
import Procedure from "../models/Procedure.js";
import Quote from "../models/Quote.js";
import { computeEmi } from "../utils/emi.js";

const router = Router();

router.post("/",
  auth,
  body("procedureId").isString().notEmpty(),
  body("amount").isFloat({ gt: 0 }),
  body("tenureMonths").isInt({ gt: 0 }),
  body("interestRate").isFloat({ min: 0 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { procedureId, amount, tenureMonths, interestRate } = req.body;
    const procedure = await Procedure.findById(procedureId);
    if (!procedure) return res.status(404).json({ error: "Procedure not found" });

    const { emi, schedule } = computeEmi({ principal: amount, annualRate: interestRate, months: tenureMonths });
    const quote = await Quote.create({
      userId: req.user.id,
      procedureId,
      amount,
      tenureMonths,
      interestRate,
      emi,
      schedule
    });
    res.status(201).json(quote);
  }
);

router.get("/", auth, async (req, res) => {
  const items = await Quote.find({ userId: req.user.id }).sort({ createdAt: -1 }).populate("procedureId", "name code");
  res.json(items);
});

router.get("/:id", auth, async (req, res) => {
  const item = await Quote.findOne({ _id: req.params.id, userId: req.user.id }).populate("procedureId", "name code");
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

export default router;
