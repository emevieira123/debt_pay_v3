import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { RegisterSchema, RegisterForm } from '@/types'
import { useNavigate, Link } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import type { AxiosError } from 'axios'
import { Eye, EyeOff } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { registerService } from '@/services/auth'

export function Register() {
  const [isLoading, setIsLoading] = useState(false)
  const { isAuthenticated } = useAuthStore()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard')
    }
  }, [isAuthenticated, navigate])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(RegisterSchema),
  })

  const { mutateAsync: mutateRegister, isPending } = useMutation({
    mutationFn: async (form: RegisterForm) => {
      const payload = {
        email: form.email,
        senha: form.password,
        nome: form.name,
        usuarioGithub: form.usuarioGithub || undefined,
      }
      await registerService(payload)
    },
    onSuccess: () => {
      toast.success('Cadastro realizado com sucesso! Faça login para continuar.')
      navigate('/login')
    },
    onError: (err: AxiosError<{ message?: string }>) => {
      const message = err.response?.data?.message || 'Falha no cadastro'
      toast.error(message)
    },
  })

  const onSubmit = async (data: RegisterForm) => {
    setIsLoading(true)
    try {
      await mutateRegister(data)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="bg-zinc-900 border-zinc-700">
          <CardHeader className="space-y-0">
            <div className="flex items-center justify-center mb-2">
              <img src="/assets/logo.svg" alt="logo" className="w-16 h-16" />
            </div>
            <h2 className="text-xl font-semibold text-white">Cadastro</h2>
            <p className="text-sm text-zinc-400">
              Crie sua conta para começar
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">
                  Nome
                </Label>
                <Input
                  id="name"
                  placeholder="Informe seu nome"
                  className="bg-zinc-800 border-zinc-600 text-white placeholder:text-zinc-400 h-12"
                  {...register('name')}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  E-mail
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Informe seu e-mail"
                  className="bg-zinc-800 border-zinc-600 text-white placeholder:text-zinc-400 h-12"
                  {...register('email')}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  Senha
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Informe sua senha"
                    className="bg-zinc-800 border-zinc-600 text-white placeholder:text-zinc-400 pr-10 h-12"
                    {...register('password')}
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? 'Esconder senha' : 'Mostrar senha'}
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute inset-y-0 right-2 flex items-center text-zinc-400 hover:text-zinc-200 h-12"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-white">
                  Confirmar Senha
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Repita sua senha"
                    className="bg-zinc-800 border-zinc-600 text-white placeholder:text-zinc-400 pr-10 h-12"
                    {...register('confirmPassword')}
                  />
                  <button
                    type="button"
                    aria-label={showConfirmPassword ? 'Esconder senha' : 'Mostrar senha'}
                    onClick={() => setShowConfirmPassword((v) => !v)}
                    className="absolute inset-y-0 right-2 flex items-center text-zinc-400 hover:text-zinc-200"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="usuarioGithub" className="text-white">
                  Usuário GitHub (opcional)
                </Label>
                <Input
                  id="usuarioGithub"
                  type="text"
                  placeholder="seu-usuario"
                  className="bg-zinc-800 border-zinc-600 text-white placeholder:text-zinc-400 h-12"
                  {...register('usuarioGithub')}
                />
                {errors.usuarioGithub && (
                  <p className="text-sm text-red-500">{errors.usuarioGithub.message}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white h-12"
                disabled={isLoading || isPending}
              >
                {isLoading || isPending ? 'SALVANDO...' : 'CONFIRMAR'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-zinc-400">
                Já tem conta?{' '}
                <Link
                  to="/login"
                  className="text-orange-500 hover:text-orange-400 transition-colors"
                >
                  Logar-se
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
