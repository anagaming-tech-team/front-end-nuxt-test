import swaggerJsdoc, { Options } from "swagger-jsdoc";
import path from "path";

const options: Options = {
  definition: {
    openapi: "3.0.0",
    info: { title: "API Desafio Vue", version: "1.0.0" },
    servers: [{ url: "http://localhost:3333/api" }],
    components: {
      /* … your schemas & security … */
    },
    security: [{ bearerAuth: [] }],
  },

  // <- include both TS _and_ JS in case you run either directly or from dist
  apis: [
    path.resolve(__dirname, "routes", "*.ts"),
    path.resolve(__dirname, "routes", "*.js"),
  ],
};

export default swaggerJsdoc(options);
