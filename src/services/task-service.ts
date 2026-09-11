import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import type {
  createTaskSchemaInput,
  updateTaskSchemaInput,
} from "../schema/tasks-schema.js";

const adapter = new PrismaPg({ connectionString: process.env.DIRECT_URL });
export const prisma = new PrismaClient({ adapter });

export async function createTask(data: createTaskSchemaInput) {
  return await prisma.task.create({
    data: {
      title: data.title,
      description: data.description ?? null,
    },
  });
}

export async function listTasks() {
  return prisma.task.findMany({ where: { deletedAt: null } });
}

export async function getTaskById(id: string) {
  return prisma.task.findFirst({ where: { id, deletedAt: null } });
}

export async function updateTask(id: string, data: updateTaskSchemaInput) {
  return prisma.task.update({
    where: { id },
    data: {
      ...(data.title !== undefined ? { title: data.title } : {}),
      ...(data.description !== undefined
        ? { description: data.description }
        : {}),
    },
  });
}

export async function deleteTask(id: string) {
  return prisma.task.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
}

export async function listTaskTrashed() {
  return prisma.task.findMany({ where: { deletedAt: { not: null } } });
}

export async function getTaskByIdTrashed(id: string) {
  return prisma.task.findFirst({ where: { id, deletedAt: { not: null } } });
}

export async function restoreTask(id: string) {
  return prisma.task.update({
    where: { id },
    data: { deletedAt: null },
  });
}
