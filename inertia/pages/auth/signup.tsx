import PasswordInput from '@/components/password-input'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Form, Link } from '@adonisjs/inertia/react'
import { useTranslation } from 'react-i18next'

export default function Signup() {
  const { t } = useTranslation('signup')

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Form route="new_account.store" className="flex flex-col gap-6">
          {({ errors }) => (
            <>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">{t('header')}</h1>
                <p className="text-muted-foreground text-sm text-balance">{t('subheader')}</p>
              </div>
              <div className="grid gap-6">
                <Field data-invalid={errors.fullName ? 'true' : undefined}>
                  <FieldLabel htmlFor="fullName">
                    {t('fields.fullName', { ns: 'common' })}
                  </FieldLabel>
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    aria-invalid={errors.fullName ? 'true' : 'false'}
                  />
                  <FieldError errors={[{ message: errors.fullName }]} />
                </Field>

                <Field data-invalid={errors.email ? 'true' : undefined}>
                  <FieldLabel htmlFor="email">{t('fields.email', { ns: 'common' })}</FieldLabel>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={t('fields.email_placeholder', { ns: 'common' })}
                    autoComplete="email"
                    aria-invalid={errors.email ? 'true' : 'false'}
                  />
                  <FieldError errors={[{ message: errors.email }]} />
                </Field>

                <Field data-invalid={errors.password ? 'true' : undefined}>
                  <FieldLabel htmlFor="password">
                    {t('fields.password', { ns: 'common' })}
                  </FieldLabel>
                  <PasswordInput
                    id="password"
                    name="password"
                    autoComplete="new-password"
                    aria-invalid={errors.password ? 'true' : 'false'}
                  />
                  <FieldError errors={[{ message: errors.password }]} />
                </Field>

                <Field data-invalid={errors.passwordConfirmation ? 'true' : undefined}>
                  <FieldLabel htmlFor="passwordConfirmation">
                    {t('fields.passwordConfirmation', { ns: 'common' })}
                  </FieldLabel>
                  <PasswordInput
                    id="passwordConfirmation"
                    name="passwordConfirmation"
                    autoComplete="new-password"
                    aria-invalid={errors.passwordConfirmation ? 'true' : 'false'}
                  />
                  <FieldError errors={[{ message: errors.passwordConfirmation }]} />
                </Field>

                <Button type="submit" className="w-full">
                  {t('submit')}
                </Button>
              </div>
              <div className="text-center text-sm">
                {t('have_an_account')}{' '}
                <Link route="session.create" className="underline underline-offset-4">
                  {t('login_here')}
                </Link>
              </div>
            </>
          )}
        </Form>
      </div>
    </div>
  )
}
