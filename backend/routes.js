const express = require("express");
const controller = require("./controller");

const router = express.Router();

const COOKIE_NAME = "auth-lab-session";

// This request will check session status
router.get("/session", (req, res) => {
  const sessionCookie = req.cookies[COOKIE_NAME];

  if (!sessionCookie) {
    res.status(401).send("Unauthorized");
    return;
  }

  const session = controller.getSession(sessionCookie.id);

  if (session) res.send(session.user);
  else res.status(401).send("Unauthorized");
});

// This request will create a new session if credentials are correct
router.post("/signIn", (req, res) => {
  const { username, password } = req.body;
  const session = controller.createSession(username, password);

  if (!session) {
    res.status(401).send("Unauthorized");
    return;
  }

  res
    .status(200)
    .cookie(COOKIE_NAME, session, {
      domain: req.hostname,
      httpOnly: true,
      sameSite: "strict"
    })
    .send(session.user);
});

// This request will remove the session
router.post("/signOut", (req, res) => {
  const sessionCookie = req.cookies[COOKIE_NAME];

  if (!sessionCookie) {
    res.status(401).send("Unauthorized");
    return;
  }

  controller.removeSession(sessionCookie.id);

  res.status(204).clearCookie(COOKIE_NAME).send();
});

module.exports = router;
