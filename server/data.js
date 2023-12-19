const ROLE = {
  ADMIN: "admin",
  BASIC: "basic",
};

module.exports = {
  ROLE: ROLE,
  users: [
    { id: 1, role: ROLE.ADMIN },
    { id: 2, role: ROLE.BASIC },
  ],
  projects: [
    { id: 1, userId: 1 },
    { id: 2, userId: 2 },
  ],
};
