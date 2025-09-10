import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { LoginSchema, LoginForm } from '@/types'
import { useAuthStore } from '@/store/authStore'
import { useNavigate, Link } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Eye, EyeOff } from 'lucide-react'
import { AxiosError } from 'axios'

type ResponseError = {
  response: {
    data: {
      message: string,
      error: string,
      status: number,
    }
  },
}

export function Login() {
  const [isLoading, setIsLoading] = useState(false)
  const { login, isAuthenticated } = useAuthStore()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

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
  } = useForm<LoginForm>({
    resolver: zodResolver(LoginSchema),
  })

  const { mutateAsync: mutateLogin, isPending } = useMutation({
    mutationFn: async (form: LoginForm) => {
      const ok = await login(form.email, form.password)
      return ok
    },
    onSuccess: () => {
      navigate('/dashboard')
    },
    onError: (err: AxiosError & ResponseError) => {
      const message = err?.response?.data?.message || 'Falha na autenticação'
      toast.error(message)
    },
  })

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true)
    try {
      await mutateLogin(data)
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
              <img src="/assets/logo.svg" alt="logo" className="w-24 h-24" />
            </div>
            <h2 className="text-xl font-semibold text-white">LOGIN</h2>
            <p className="text-sm text-zinc-400">
              Entre para acessar sua conta
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                    className="absolute inset-y-0 right-2 flex items-center text-zinc-400 hover:text-zinc-200"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white h-12"
                disabled={isLoading || isPending}
              >
                {isLoading || isPending ? 'ENTRANDO...' : 'ENTRAR'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-zinc-400">
                Não tem uma conta?{' '}
                <Link
                  to="/register"
                  className="text-orange-500 hover:text-orange-400 transition-colors"
                >
                  Cadastre-se
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
