import type { Config } from "edu";
const config: Config = {
  auth: {
    challenge: false, // Set to true if you want to enable password protection.
    users: {
      // You can add multiple users by doing username: 'password'.
      interstellar: "password",
    },
  },
};
export default config;
