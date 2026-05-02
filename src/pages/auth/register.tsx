import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRegister } from '@/hooks/use-auth'
import { registerSchema, type Register as RegisterType } from '@/schemas/auth-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { KeyRound, Mail, UserRound } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export default function Register() {
  const { t } = useTranslation()
  const { mutate: register, isPending } = useRegister()

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirm_password: ''
    }
  })

  const onSubmit = (data: RegisterType) => {
    register(data)
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat p-4"
      style={{ backgroundImage: "url('/img/login-bg.png')" }}
    >
      {/* Dark overlay */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Register Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="rounded-2xl border border-white/10 bg-white/5 px-8 py-10 shadow-2xl backdrop-blur-2xl">
          {/* Logo */}
          <div className="mb-6 flex justify-center">
            <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-primary shadow-lg shadow-primary/20">
              <img src="/img/logo/logo.jpeg" alt={t('public.brandName')} className="h-24 w-24 object-contain" />
            </div>
          </div>

          {/* Title */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold tracking-wide text-white">{t('public.brandName').toUpperCase()}</h1>
            <h2 className="text-2xl font-bold tracking-wide text-white">{t('auth.register.title').toUpperCase()}</h2>
            <p className="mt-2 text-sm text-gray-400">{t('auth.register.subtitle')}</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              variant="dark"
              type="text"
              placeholder={t('auth.register.namePlaceholder')}
              icon={<UserRound size={18} />}
              error={errors.name?.message}
              autoComplete="name"
              {...formRegister('name')}
            />

            <Input
              variant="dark"
              type="email"
              placeholder={t('auth.register.emailPlaceholder')}
              icon={<Mail size={18} />}
              error={errors.email?.message}
              autoComplete="email"
              {...formRegister('email')}
            />

            <Input
              variant="dark"
              type="password"
              placeholder={t('auth.register.passwordPlaceholder')}
              icon={<KeyRound size={18} />}
              error={errors.password?.message}
              autoComplete="new-password"
              {...formRegister('password')}
            />

            <Input
              variant="dark"
              type="password"
              placeholder={t('auth.register.confirmPasswordPlaceholder')}
              icon={<KeyRound size={18} />}
              error={errors.confirm_password?.message}
              autoComplete="new-password"
              {...formRegister('confirm_password')}
            />

            <div className="pt-2">
              <Button type="submit" variant="primary" size="lg" isLoading={isPending} className="w-full">
                {t('auth.register.submitButton')}
              </Button>
            </div>
          </form>

          {/* Login link */}
          <div className="mt-5 text-center">
            <Link to="/auth/login" className="text-sm text-gray-400 transition-colors hover:text-primary">
              {t('auth.register.loginLink')}
            </Link>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">{t('auth.register.copyright')}</p>
            <p className="mt-0.5 text-xs text-gray-600">{t('auth.register.version')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
