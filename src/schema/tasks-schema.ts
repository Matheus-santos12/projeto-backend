import z from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10).max(100).optional(),
});

export const taskParamsSchema = z.object({
  id: z.uuid(),
});

export const updateTaskSchema = z
  .object({
    title: z.string().min(8).optional(),
    description: z.string().min(10).max(100).optional(),
  })
  .refine((data) => data.title || data.description, {
    message: "É necessário informar pelo menos um campo para atualização",
  });

export type createTaskSchemaInput = z.infer<typeof createTaskSchema>;
export type TaskParamsInput = z.infer<typeof taskParamsSchema>;
export type updateTaskSchemaInput = z.infer<typeof updateTaskSchema>;
