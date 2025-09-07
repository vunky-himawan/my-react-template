import z from "zod";

export const UpdatePermissionSchema = z.object({
  description: z.string().max(255).optional(),
});

export type TUpdatePermissionSchema = z.infer<typeof UpdatePermissionSchema>;
