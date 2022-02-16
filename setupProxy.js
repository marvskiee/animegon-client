const proxy = require("http-proxy-middleware");
module.exports = (app) => {
  app.use(
    proxy("/test", {
      target: "https://marvsflix-anime.herokuapp.com ",
      changeOrigin: true,
    })
  );
};
