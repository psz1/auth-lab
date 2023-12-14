const { users } = require("./db");

let sessions = [];

/**
 * Retrieves a session by its ID.
 *
 * @param {string} sessionId - The ID of the session to retrieve.
 * @returns {Object} The session object if found, otherwise undefined.
 */
const getSession = sessionId => {
  return sessions.find(session => session.id === sessionId);
};

/**
 * Creates a new session for the given user.
 * 
 * @param {string} username - The username of the user to create a session for.
 * @param {string} password - The password of the user to create a session for.
 * @returns {Object} The session object if the user was found, otherwise null.
 */
const createSession = (username, password) => {
  const user = users.find(
    user => user.username === username && user.password === password
  );

  if (!user) return null;

  const now = new Date();

  const newSession = {
    id: `${user.username}-${now.getTime()}-${user.id + Math.random()}`,
    user: {
      id: user.id,
      name: user.name,
      username: user.username
    },
    signInAt: now.toISOString()
  };

  sessions.push(newSession);

  return newSession;
};

/**
 * Removes a session by its ID.
 * 
 * @param {string} sessionId - The ID of the session to remove.
 * @returns {boolean} True if the session was found and removed, otherwise false.
 */
const removeSession = sessionId => {
  const newSessions = sessions.filter(session => session.id !== sessionId);
  sessions = newSessions;
  return true;
};

module.exports = {
  getSession,
  createSession,
  removeSession
};
