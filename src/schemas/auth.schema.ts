import z from 'zod';

export const signinSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});
export type SigninSchema = z.infer<typeof signinSchema>;
