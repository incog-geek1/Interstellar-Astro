declare module "edu" {
  type Config = {
    auth: {
      challenge: boolean;
      users: {
        [key: string]: string;
      };
    };
  };
}
