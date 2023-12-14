const express = require("express");
const controller = require("./controller");

const router = express.Router();

const COOKIE_NAME = "auth-lab-session";

/**
 * @swagger
 * /session:
 *   get:
 *     summary: Retrieves the session information
 *     tags:
 *       - Session
 *     responses:
 *       200:
 *         description: The session information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Session'
 *       401:
 *         description: Unauthorized
 *     security:
 *       - bearerAuth: []
 */
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

/**
 * @swagger
 * /signIn:
 *   post:
 *     summary: Creates a new session if credentials are correct
 *     tags:
 *       - Authentication
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: The session was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Session'
 *       401:
 *         description: Unauthorized
 *     security:
 *       - bearerAuth: []
 */
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

/**
 * @swagger
 * /signOut:
 *   post:
 *     summary: Ends the session and clears the session cookie
 *     tags:
 *       - Authentication
 *     responses:
 *       204:
 *         description: The session was successfully ended
 *       401:
 *         description: Unauthorized
 *     security:
 *       - bearerAuth: []
 */
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
