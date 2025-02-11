export default defineEventHandler((event) => {
  console.log("Hello, world!");

  return {
    hello: "world",
  };
});
