/* eslint-disable @typescript-eslint/no-explicit-any */
const SERVER =
  process.env.NODE_ENV === 'production' ? 'https://cookie-tutorial-api.gomistore.com' : 'http://localhost:8080';

interface Config {
  auth: {
    login(): string;
    me(): string;
  };
}

const config: Config = {
  auth: {
    login: (): any => `${SERVER}/user/login`,
    me: (): any => `${SERVER}/user/me`,
  },
};

export default config;
