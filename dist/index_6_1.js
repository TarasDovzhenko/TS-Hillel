"use strict";
const appTranslations = {
    en: "Toster",
    ua: "Тостер",
    es: "Tosterus",
    uk: undefined,
};
const optionalAppTranslations = {
    en: "Toster",
    ua: "Тостер",
    default: "My toster",
};
const lang = "en";
const translation = appTranslations["de"];
console.log(appTranslations[lang]);
console.log(appTranslations["de"]);
if (translation) {
    console.log(translation.toUpperCase());
}
