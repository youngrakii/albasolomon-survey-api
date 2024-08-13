import express, { response } from "express";
import { prisma } from "../utils/index.js";

const router = express.Router();

//설문 응답 저장
router.post("/responses", async (req, res) => {
  try {
    const {
      corporationType,
      employeeNumber,
      question1Answer,
      question2Answer,
      question3Answer,
      question4Answer,
      question5Answer,
      question6Answer,
      question7Answer,
      question8Answer,
      question9Answer,
      question10Answer,
      question11Answer,
      question12Answer,
    } = req.body;

    if (
      !corporationType ||
      !employeeNumber ||
      !question1Answer ||
      !question2Answer ||
      !question3Answer ||
      !question6Answer ||
      !question7Answer ||
      !question9Answer ||
      !question11Answer
    ) {
      return res.status(400).json({ message: "필수문항에 답변해주세요." });
    }

    const response = await prisma.surveyResponses.create({
      data: {
        corporationType,
        employeeNumber,
        question1Answer,
        question2Answer,
        question3Answer,
        question4Answer,
        question5Answer,
        question6Answer,
        question7Answer,
        question8Answer,
        question9Answer,
        question10Answer,
        question11Answer,
        question12Answer,
      },
    });

    return res.status(201).json({
      succes: true,
      message: "답변이 등록되었습니다.",
      data: response,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

//설문 응답 전체 조회(pagenation)
router.get("/responses", async (req, res) => {
  try {
    const page = req.query.page ?? 1;
    const order = req.query.order ?? "desc"; //desc,asc
    const responses = await prisma.surveyResponses.findMany({
      skip: (+page - 1) * 5,
      take: 5,
      orderBy: [
        {
          responseId: order,
        },
      ],
    });
    return res.status(200).json({ data: responses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

export default router;