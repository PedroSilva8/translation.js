type Trans = {
    [key: symbol]: Trans
}

interface Translation {
    lang: string
    content: Trans
}

export default class TranslationJS {
    
    /**
     * List of translations
     */
    static translations : Translation[] = []
    /**
     * Selected Translation
     */
    static selectedTranslation = -1

    /**
     * Get Selected Translation or empty translation if none is selected
     * @returns Translation
     */
    static GetSelectedTrans = () : Translation => this.selectedTranslation == -1 ? { lang: "", content: {} } : this.translations[this.selectedTranslation]

    /**
     * Selectes a lang
     * @param lang name of translation
     * @returns index of selected translation
     */
    static SelectTrans = (lang: string) => this.selectedTranslation = this.translations.findIndex((e) => e.lang == lang)

    /**
     * Load translation
     * @param name name of translation
     * @param json object with translations
     * @param setCurrent if true sets the new theme as current theme, false by default
     */
    static LoadTranslation = (name: string, json: any, setCurrent = false) => {
        if (typeof json == "string")
            json = JSON.parse(json)
            
        if (setCurrent)
            this.selectedTranslation = this.translations.length

        this.translations.push({ lang: name, content: json })
    }

    static GetNested = (obj: Trans, ...args: string[]) => args.reduce<Record<string, Trans>>((obj, level) => obj && obj[level], obj)

    /**
     * Get Translation
     * @param value translation path
     * @returns translation or value if failed to find it
     */
    static T = (value: string) => {
        const v = this.GetNested(this.GetSelectedTrans().content, ...value.split('.'))
        if (v === undefined)
            return value;
        return v;
    }
}

/**
 * Get Translation
 * @param value translation path
 * @returns translation or value if failed to find it
 */
export const T = (value: string) => TranslationJS.T(value)