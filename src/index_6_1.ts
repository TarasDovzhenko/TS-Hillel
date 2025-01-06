type Translations = {
    [key: string]: string | undefined;
};

type OptionalTranslations = Translations & {
    default?: string;
};

const appTranslations: Translations = {
    en: "Toster",
    ua: "Тостер",
    es: "Tosterus",
    uk: undefined,
};

const optionalAppTranslations: OptionalTranslations = {
    en: "Toster",
    ua: "Тостер",
    default: "My toster",
};

const lang = "en";

const translation: string | undefined = appTranslations["de"];

console.log(appTranslations[lang]);
console.log(appTranslations["de"]);
if (translation) {
    console.log(translation.toUpperCase());
}
