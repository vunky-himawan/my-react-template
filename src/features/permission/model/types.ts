import z from "zod";

export const UpdatePermissionSchema = z.object({
  description: z.string().optional(),
  name: z.string().optional(),
});

export type TUpdatePermissionSchema = z.infer<typeof UpdatePermissionSchema>;
