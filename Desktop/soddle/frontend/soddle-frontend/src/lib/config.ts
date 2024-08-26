export const appConfig = {
  baseUrl:
    process.env.NODE_ENV === "production"
      ? "https://demo.soddle.io"
      : "http://localhost:3000",
};
