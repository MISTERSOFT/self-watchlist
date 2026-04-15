import PasswordInput from '@/components/password-input'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useTranslations } from '@/hooks/use-translations'
import { Form, Link } from '@adonisjs/inertia/react'

export default function Login() {
  const { t } = useTranslations()

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Form route="session.store" className="flex flex-col gap-6">
          {({ errors }) => (
            <>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">{t('pages.signin.header')}</h1>
                <p className="text-muted-foreground text-sm text-balance">
                  {t('pages.signin.subheader')}
                </p>
              </div>
              <div className="grid gap-6">
                <Field data-invalid={errors.email ? 'true' : undefined}>
                  <FieldLabel htmlFor="email">{t('common.email')}</FieldLabel>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={t('common.email_placeholder')}
                    autoComplete="email"
                    aria-invalid={errors.email ? 'true' : 'false'}
                  />
                  <FieldError errors={[{ message: errors.email }]} />
                </Field>

                <Field data-invalid={errors.password ? 'true' : undefined}>
                  <div className="flex items-center">
                    <FieldLabel htmlFor="password">{t('common.password')}</FieldLabel>
                    <Link
                      href="/forgot-password"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                      as="a"
                    >
                      {t('pages.signin.forgot_password')}
                    </Link>
                  </div>
                  <PasswordInput
                    id="password"
                    name="password"
                    placeholder="******"
                    autoComplete="current-password"
                    aria-invalid={errors.password ? 'true' : 'false'}
                  />
                  <FieldError errors={[{ message: errors.password }]} />
                </Field>

                <Button type="submit" className="w-full">
                  {t('pages.signin.submit')}
                </Button>
              </div>
              <div className="text-center text-sm">
                {t('pages.signin.no_account')}{' '}
                <Link route="new_account.create" className="underline underline-offset-4">
                  {t('pages.signin.register')}
                </Link>
              </div>
            </>
          )}
        </Form>

        {/* <Form route="session.store">
          {({ errors }) => (
            <>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="username"
                  data-invalid={errors.email ? 'true' : undefined}
                />
                {errors.email && <div>{errors.email}</div>}
              </div>

              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="current-password"
                />
                {errors.password ? <span>{errors.password}</span> : ''}
              </div>

              <div>
                <button type="submit" className="button">
                  Login
                </button>
              </div>
            </>
          )}
        </Form> */}
      </div>
    </div>
  )
}
