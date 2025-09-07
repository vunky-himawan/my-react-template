import z from "zod";

export const CreateOrUpdateRoleSchema = z.object({
  name: z.string().min(3).max(100).optional(),
  permissions: z.array(z.number()).optional(),
});

export type TCreateOrUpdateRole = z.infer<typeof CreateOrUpdateRoleSchema>;
