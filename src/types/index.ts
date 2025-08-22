import { z } from 'zod'

export const RegisterSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
})

export const LoginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
})

export const DebtSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  totalAmount: z.number(),
  paidAmount: z.number(),
  dueDate: z.string(),
  status: z.enum(['pending', 'paid', 'overdue']),
  installments: z.number(),
  paidInstallments: z.number(),
})

export const PaymentSchema = z.object({
  id: z.string(),
  debtId: z.string(),
  amount: z.number(),
  date: z.string(),
  description: z.string(),
})

export type User = {
  id: string
  name: string
  email: string
}

export type Debt = z.infer<typeof DebtSchema>
export type Payment = z.infer<typeof PaymentSchema>
export type RegisterForm = z.infer<typeof RegisterSchema>
export type LoginForm = z.infer<typeof LoginSchema>
