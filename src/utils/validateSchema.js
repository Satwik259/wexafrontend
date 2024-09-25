import { z } from "zod";

const registerSchema = z.object({
  username: z.string().min(6).max(20),
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .max(20)
    .regex(/^[a-zA-Z0-9]+$/),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .max(20)
    .regex(/^[a-zA-Z0-9]+$/),
});

export { registerSchema, loginSchema };
