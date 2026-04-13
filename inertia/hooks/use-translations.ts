type I18nNamespace = string //keyof SharedProps['translations']

export function useTranslations(defaultNamespace: I18nNamespace = 'translations') {
  return {
    // NO-OP
    t: (key: string) => key,
  }
}
