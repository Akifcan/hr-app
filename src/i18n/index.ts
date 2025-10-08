import { I18n } from "i18n-js";
import translations from "./translations.json"

const i18n = new I18n(translations)

i18n.defaultLocale = 'tr'
i18n.locale = 'tr'

i18n.onChange(() => {
  console.log("I18n has changed!");
})

export default i18n