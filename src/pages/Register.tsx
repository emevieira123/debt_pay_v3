import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { RegisterSchema, RegisterForm } from '@/types'
import { useAuthStore } from '@/store/authStore'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export function Register() {
  const [isLoading, setIsLoading] = useState(false)
  const { register: registerUser } = useAuthStore()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(RegisterSchema),
  })

  const onSubmit = async (data: RegisterForm) => {
    setIsLoading(true)
    try {
      const success = await registerUser(data.name, data.email, data.password)
      if (success) {
        navigate('/dashboard')
      }
    } catch (error) {
      console.error('Registration failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="bg-zinc-900 border-zinc-700">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center gap-3 mb-8">
              <img src="/assets/logo.svg" alt="logo" className="w-32 h-32" />
            </div>
            <h2 className="text-xl font-semibold text-white">Cadastro</h2>
            <p className="text-sm text-zinc-400">
              Crie sua conta para começar
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">
                  Nome
                </Label>
                <Input
                  id="name"
                  placeholder="Informe seu nome"
                  className="bg-zinc-800 border-zinc-600 text-white placeholder:text-zinc-400"
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
                  className="bg-zinc-800 border-zinc-600 text-white placeholder:text-zinc-400"
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
                <Input
                  id="password"
                  type="password"
                  placeholder="Informe sua senha"
                  className="bg-zinc-800 border-zinc-600 text-white placeholder:text-zinc-400"
                  {...register('password')}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                disabled={isLoading}
              >
                {isLoading ? 'Carregando...' : 'CONFIRMAR'}
              </Button>
            </form>

            <div className="mt-6">
              <Link
                to="/login"
                className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
