import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

import { DashboardLayout } from '@/components/Layout/DashboardLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Separator } from '@/components/ui/separator'

import { useAuthStore } from '@/store/authStore'
import { ProfileSchema, PasswordSchema, ProfileForm, PasswordForm } from '@/types'

export function Settings() {
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()
  const [isProfileLoading, setProfileLoading] = useState(false)
  const [isPasswordLoading, setPasswordLoading] = useState(false)

  const profileForm = useForm<ProfileForm>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
    },
  })

  const passwordForm = useForm<PasswordForm>({
    resolver: zodResolver(PasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  })

  const onProfileSubmit = (data: ProfileForm) => {
    setProfileLoading(true)
    console.log('Updating profile:', data)
    // Simulação de chamada de API
    setTimeout(() => {
      toast.success('Perfil atualizado com sucesso!')
      setProfileLoading(false)
    }, 1000)
  }

  const onPasswordSubmit = (data: PasswordForm) => {
    setPasswordLoading(true)
    console.log('Updating password:', data)
    // Simulação de chamada de API
    setTimeout(() => {
      toast.success('Senha alterada com sucesso!')
      passwordForm.reset()
      setPasswordLoading(false)
    }, 1000)
  }

  const handleDeleteAccount = () => {
    logout()
    toast.info('Sua conta foi excluída.')
    navigate('/login')
  }

  return (
    <DashboardLayout title="Configurações" description="Gerencie suas informações e preferências">
      <div className="p-4 md:p-6 space-y-8 max-w-4xl mx-auto">
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {/* Profile Information */}
          <Card className="bg-zinc-900 border-zinc-700">
            <CardHeader>
              <CardTitle className="text-white">Informações do Perfil</CardTitle>
              <CardDescription className="text-zinc-400">Atualize os dados da sua conta.</CardDescription>
            </CardHeader>
            <Form {...profileForm}>
              <form onSubmit={profileForm.handleSubmit(onProfileSubmit)}>
                <CardContent className="space-y-4">
                  <FormField
                    control={profileForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Nome</FormLabel>
                        <FormControl>
                          <Input placeholder="Seu nome" {...field} className="bg-zinc-800 border-zinc-600 text-white" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={profileForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">E-mail</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Seu e-mail" disabled {...field} className="bg-zinc-800 border-zinc-600 text-white" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter className="border-t border-zinc-700 px-6 py-4">
                  <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white" disabled={isProfileLoading}>
                    {isProfileLoading ? 'Salvando...' : 'Salvar Alterações'}
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>

          {/* Change Password */}
          <Card className="bg-zinc-900 border-zinc-700">
            <CardHeader>
              <CardTitle className="text-white">Alterar Senha</CardTitle>
              <CardDescription className="text-zinc-400">Escolha uma nova senha forte.</CardDescription>
            </CardHeader>
            <Form {...passwordForm}>
              <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}>
                <CardContent className="space-y-4">
                  <FormField
                    control={passwordForm.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Nova Senha</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} className="bg-zinc-800 border-zinc-600 text-white" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={passwordForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Confirmar Nova Senha</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} className="bg-zinc-800 border-zinc-600 text-white" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter className="border-t border-zinc-700 px-6 py-4">
                  <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white" disabled={isPasswordLoading}>
                    {isPasswordLoading ? 'Alterando...' : 'Alterar Senha'}
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </div>

        {/* Danger Zone */}
        <Card className="bg-zinc-900 border-zinc-700 border-red-500/50">
          <CardHeader className='pb-2'>
            <CardTitle className="text-red-400">Zona de Perigo</CardTitle>
            <CardDescription className="text-zinc-400">Ações irreversíveis. Tenha cuidado.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Separator className="bg-zinc-700" />
            <div>
              <h3 className="text-white font-semibold">Excluir Conta</h3>
              <p className="text-zinc-400 text-sm mt-1">Esta ação é permanente e não pode ser desfeita.</p>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="mt-2">Excluir Minha Conta</Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-zinc-900 border-zinc-700">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-white">Você tem certeza absoluta?</AlertDialogTitle>
                    <AlertDialogDescription className="text-zinc-400">
                      Essa ação não pode ser desfeita. Isso excluirá permanentemente sua conta e removerá seus dados de nossos servidores.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="text-white border-zinc-600 hover:bg-zinc-800 hover:text-white">Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteAccount} className="bg-red-600 hover:bg-red-700 text-white">Sim, excluir conta</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
