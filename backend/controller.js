const { users } = require("./db");

let sessions = [];

const getSession = sessionId => {
  return sessions.find(session => session.id === sessionId);
};

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
