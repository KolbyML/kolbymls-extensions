import {
    SourceStateManager,
    NavigationButton
} from 'paperback-extensions-common'

interface Language {
    name: string,
    LanguageCode: string,
    PBCode: string,
    default?: boolean
}

class WebtoonsLanguagesClass {
    Languages: Language[] = [
        {
            // Bulgarian
            name: 'български',
            LanguageCode: 'BUL',
            PBCode: 'bg',
        },
        {
            // Czech
            name: 'čeština',
            LanguageCode: 'CES',
            PBCode: 'cz',
        },
        {
            // Danish
            name: 'dansk',
            LanguageCode: 'DAN',
            PBCode: 'dk',
        },
        {
            // German
            name: 'Deutsch',
            LanguageCode: 'DEU',
            PBCode: 'de'
        },
        {
            // Greek
            name: 'ελληνικά',
            LanguageCode: 'GRE',
            PBCode: 'gr',
        },
        {
            // Hindi
            name: 'Hindi',
            LanguageCode: 'HIN',
            PBCode: 'in',
        },
        {
            // Indonesian
            name: 'Indonesia',
            LanguageCode: 'IND',
            PBCode: 'id',
        },
        {
            // Italian
            name: 'italiano',
            LanguageCode: 'ITA',
            PBCode: 'it',
        },
        {
            // Japanese
            name: '日本語',
            LanguageCode: 'JPN',
            PBCode: 'jp',
        },
        {
            // Lithuanian
            name: 'lietuvių kalba',
            LanguageCode: 'LIT',
            PBCode: 'lt',
        },
        {
            // Mongolian
            name: 'Mongol',
            LanguageCode: 'MON',
            PBCode: 'mn',
        },
        {
            // Malay
            name: 'Bahasa Melayu',
            LanguageCode: 'MAY',
            PBCode: 'my',
        },
        {
            // Dutch
            name: 'Nederlands',
            LanguageCode: 'NLD',
            PBCode: 'nl',
        },
        {
            // Polish
            name: 'polski',
            LanguageCode: 'POL',
            PBCode: 'pl',
        },
        {
            // Portuguese
            name: 'português',
            LanguageCode: 'POR',
            PBCode: 'pt',
        },
        {
            // Romanian
            name: 'Romanian',
            LanguageCode: 'RON',
            PBCode: 'ro',
        },
        {
            // Russia
            name: 'русский язык',
            LanguageCode: 'RUS',
            PBCode: 'ru',
        },
        {
            // Thai
            name: 'ไทย',
            LanguageCode: 'BUL',
            PBCode: 'th',
        },
        {
            // Turkish
            name: 'Türkçe',
            LanguageCode: 'TUR',
            PBCode: 'tr',
        },
        {
            // Ukrainian
            name: 'українська мова',
            LanguageCode: 'UKR',
            PBCode: 'ua',
        },
        {
            // Vietnamese
            name: 'Tiếng Việt',
            LanguageCode: 'VIE',
            PBCode: 'vn',
        },
        {
            // Chinese (Simplified)
            name: '中文 (简体字)',
            LanguageCode: 'CMN',
            PBCode: 'cn',
        },
        {
            // Chinese (Traditional)
            name: '中文 (繁體字)',
            LanguageCode: 'CMT',
            PBCode: 'hk',
        },
        {
            // English
            name: 'English',
            LanguageCode: 'ENG',
            PBCode: 'gb',
            default: true
        },
    ]

    constructor() {
        // Sorts the languages based on name
        this.Languages = this.Languages.sort((a, b) => a.name > b.name ? 1 : -1)
    }

    getLanguageCodeList(): string[] {
        return this.Languages.map(Language => Language.LanguageCode)
    }

    getName(LanguageCode: string): string {
        return this.Languages.filter(Language => Language.LanguageCode == LanguageCode)[0]?.name ?? 'Unknown'
    }

    getPBCode(LanguageCode: string): string {
        return this.Languages.filter(Language => Language.LanguageCode == LanguageCode)[0]?.PBCode ?? '_unknown'
    }

    getDefault(): string[] {
        return this.Languages.filter(Language => Language.default).map(Language => Language.LanguageCode)
    }
}

export const WebtoonsLanguages = new WebtoonsLanguagesClass()

export const getLanguages = async (stateManager: SourceStateManager): Promise<string[]> => {
    return (await stateManager.retrieve('language') as string[]) ?? WebtoonsLanguages.getDefault()
}

export const contentSettings = (stateManager: SourceStateManager): NavigationButton => {
    return createNavigationButton({
        id: 'content_settings',
        value: '',
        label: 'Content Settings',
        form: createForm({
            onSubmit: async (values: any) => {
                return Promise.all([
                    stateManager.store('language', values.language),
                ]).then()
            },
            validate: () => {
                return Promise.resolve(true)
            },
            sections: () => {
                return Promise.resolve([
                    createSection({
                        id: 'content',
                        footer: 'Please choose the language that you would like to view translated Webtoons in.',
                        rows: () => {
                            return Promise.all([
                                getLanguages(stateManager),
                            ]).then(async values => {
                                return [
                                    createSelect({
                                        id: 'language',
                                        label: 'Language',
                                        options: WebtoonsLanguages.getLanguageCodeList(),
                                        displayLabel: option => WebtoonsLanguages.getName(option),
                                        value: values[0],
                                        allowsMultiselect: false,
                                        minimumOptionCount: 1,
                                    }),
                                ]
                            })
                        }
                    })
                ])
            }
        })
    })
}