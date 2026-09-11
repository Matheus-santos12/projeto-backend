import type { FastifyInstance } from "fastify";
import {
  createTaskHandler,
  deleteTaskHandler,
  getTaskByIdHandler,
  listTasksHandler,
  listTaskTrashedHadler,
  restoreTaskHandler,
  updateTaskHandler,
} from "../controllers/task-controller.js";

import {
  createTaskSchema,
  taskParamsSchema,
  updateTaskSchema,
} from "../schema/tasks-schema.js";
import { listTaskTrashed } from "../services/task-service.js";

export async function taskRoutes(app: FastifyInstance) {
  app.post("/tasks", {
    schema: { body: createTaskSchema },
    handler: createTaskHandler,
  });

  app.get("/tasks", {
    handler: listTasksHandler,
  });

  app.get("/tasks/:id", {
    schema: { params: taskParamsSchema },
    handler: getTaskByIdHandler,
  });

  app.get("/tasks/trash", {
    handler: listTaskTrashedHadler,
  });

  app.patch("/tasks/:id/restore", {
    schema: { params: taskParamsSchema },
    handler: restoreTaskHandler,
  });

  app.patch("/tasks/:id", {
    schema: { params: taskParamsSchema, body: updateTaskSchema },
    handler: updateTaskHandler,
  });

  app.delete("/tasks/:id", {
    schema: { params: taskParamsSchema },
    handler: deleteTaskHandler,
  });
}
