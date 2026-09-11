import fastify from "fastify";
import { taskRoutes } from "./routes/task-routes.js";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "@fastify/type-provider-zod";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);

app.setSerializerCompiler(serializerCompiler);

app.register(taskRoutes);

app.listen({ port: 3333 }).then(() => {
  console.log("Servidor esta rodando!");
});
