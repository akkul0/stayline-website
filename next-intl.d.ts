// Intentionally no `next-intl` module augmentation.
//
// We pass the locale through as `string` (that's how Next types dynamic-segment
// `params`), and several reusable components call useTranslations() with a
// dynamic namespace. Declaring AppConfig.Locale/Messages here would force the
// `"tr" | "en"` union and a typed message tree onto every next-intl call, which
// conflicts with Next's PageProps and the dynamic namespaces.
export {};
