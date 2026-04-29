import { mockDataTeam } from "./mockData";

const STORAGE_KEY = "uiz_users_data";

/**
 * Re-index users with sequential IDs: 1, 2, 3, ...
 */
const reindex = (users) => users.map((u, i) => ({ ...u, id: i + 1 }));

/**
 * Load users from localStorage. Falls back to mockDataTeam on first load.
 * Always re-indexes IDs to ensure they are sequential.
 */
export const loadUsers = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Re-index to fix any gaps
      const indexed = reindex(parsed);
      saveUsers(indexed);
      return indexed;
    }
  } catch (e) {
    console.warn("Failed to load users from localStorage:", e);
  }
  // First time — seed from mock data and persist
  const seeded = reindex(mockDataTeam);
  saveUsers(seeded);
  return seeded;
};

/**
 * Save users array to localStorage.
 */
export const saveUsers = (users) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  } catch (e) {
    console.warn("Failed to save users to localStorage:", e);
  }
};

/**
 * Add a single user and persist. Returns the updated users array.
 * New user gets the next sequential ID.
 */
export const addUser = (userData) => {
  const users = loadUsers();
  const newUser = { id: users.length + 1, ...userData };
  const updated = [...users, newUser];
  saveUsers(updated);
  return { users: updated, newUser };
};

/**
 * Reset localStorage — re-seed from mockData.
 */
export const resetUsers = () => {
  const seeded = reindex(mockDataTeam);
  saveUsers(seeded);
  return seeded;
};
