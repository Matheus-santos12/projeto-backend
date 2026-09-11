import type { FastifyReply, FastifyRequest } from "fastify";
import { createTaskSchema, updateTaskSchema } from "../schema/tasks-schema.js";
import {
  createTask,
  deleteTask,
  getTaskById,
  getTaskByIdTrashed,
  listTasks,
  listTaskTrashed,
  restoreTask,
  updateTask,
} from "../services/task-service.js";

export async function createTaskHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const data = createTaskSchema.parse(request.body);
  await createTask(data);
  reply.status(201).send({ message: "Tarefa criada com sucesso!" });
}

export async function listTasksHandler(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  const tasks = await listTasks();
  reply.status(200).send(tasks);
}

export async function getTaskByIdHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  const { id } = request.params;
  const task = await getTaskById(id);

  if (!task) {
    reply.status(404).send({ message: "Tarefa não existe!" });
    return;
  }

  reply.status(200).send(task);
}

export async function updateTaskHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  const task = await getTaskById(request.params.id);
  const taskupdate = updateTaskSchema.parse(request.body);

  if (!task) {
    reply.status(404).send({ message: "Tarefa não existe!" });
    return;
  }
  await updateTask(task.id, taskupdate);

  reply.status(200).send({ message: "Tarefa atualizada com sucesso!" });
}

export async function deleteTaskHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  const task = await getTaskById(request.params.id);

  if (!task) {
    reply.status(404).send({ message: "Tarefa não existe" });
    return;
  }
  await deleteTask(task.id);

  reply.status(200).send({ message: "Tarefa movida para a lixeira" });
}

export async function listTaskTrashedHadler(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  const task = await listTaskTrashed();
  reply.status(200).send(task);
}

export async function restoreTaskHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  const { id } = request.params;
  const task = await getTaskByIdTrashed(id);

  if (!task || !task.deletedAt) {
    reply
      .status(404)
      .send({ message: "Tarefa não existe ou não está na lixeira" });
    return;
  }

  await restoreTask(id);

  reply.status(200).send({ message: "Tarefa restaurada com sucesso!" });
}
