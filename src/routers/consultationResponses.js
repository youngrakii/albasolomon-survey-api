import express, { response } from "express";
import { prisma } from "../utils/index.js";

const router = express.Router();

// Create a new consultation
router.post("/consultations", async (req, res) => {
  try {
    const { name, contact, email, timeSlot, message } = req.body;

    // Validate required fields
    if (!name || !contact) {
      return res.status(400).json({
        success: false,
        message: "필수문항에 답변해주세요. (성함과 연락처는 필수 입력 사항입니다)",
      });
    }

    if (!["NINETOTEN", "TENTOELEVEN", "ELEVENTOTWELVE", "TWELVETOTHIRTEEN", "THIRTEENTOFIFTEEN", "FOURTEENTOFIFTEEN", "FIFTEENTOSIXTEEN"].includes(timeSlot)) {
      return res.status(400).json({
        success: false,
        message: "올바른 시간대를 선택해주세요.",
      });
    }

    const consultation = await prisma.consultationResponses.create({
      data: { name, contact, email, timeSlot, message },
    });
    res.status(201).json({
      success: true,
      message: "상담 신청이 완료되었습니다.",
      data: consultation,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

//Get all consultations
router.get("/consultations", async (_req, res) => {
  try {
    const consultations = await prisma.consultationResponses.findMany();
    res.status(200).json(consultations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

export default router;
