import "next-auth";
declare module "next-auth" {
  interface Session {
    user: {
      uid: string;
      email: string;
    };
  }
}
