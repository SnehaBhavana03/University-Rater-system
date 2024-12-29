import authRouter from "./auth-router.js";
import bookmarkRouter from "./bookmark-router.js";
import chatbotRouter from "./chatbot-router.js";
import questionsRouter from "./questions-router.js";
import ratingsRouter from "./ratings-router.js";
import universityRouter from "./university-router.js";
import userRouter from "./user-router.js";

const router = (app) => {
  app.use("/api/auth", authRouter);
  app.use("/api/universities", universityRouter);
  app.use("/api/questions", questionsRouter);
  app.use("/api/ratings", ratingsRouter);
  app.use("/api/bookmark", bookmarkRouter);
  app.use("/api/user", userRouter);
  app.use("/api/chatbot", chatbotRouter);
};

export default router;
