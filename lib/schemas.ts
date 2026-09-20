import { z } from 'zod';

export const TeacherLoginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type TeacherLoginFormValues = z.infer<typeof TeacherLoginSchema>;

export const ParentRegisterSchema = z.object({
  kidName: z.string().min(2, 'Please enter kid name').max(50),
  kidId: z.string().min(1, 'Please enter kid ID').max(30),
  kidAge: z.coerce.number().min(2, 'Age must be between 2 and 8').max(8, 'Age must be between 2 and 8'),
  kidGender: z.enum(['boy', 'girl'], {
    errorMap: () => ({ message: 'Please select gender' }),
  }),
});

export type ParentRegisterFormValues = z.infer<typeof ParentRegisterSchema>;

export const VideoCompletionSchema = z.object({
  topicId: z.string(),
  grade: z.enum(['lkg', 'ukg', 'first', 'activities', 'explore']),
  reportedDuration: z.number().min(0),
  childId: z.string().optional(),
});

export const GameCompletionSchema = z.object({
  sessionToken: z.string().min(1),
  topicId: z.string(),
  grade: z.enum(['lkg', 'ukg', 'first', 'activities', 'explore']),
  childId: z.string().optional(),
});
