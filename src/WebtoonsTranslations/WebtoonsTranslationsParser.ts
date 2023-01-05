import {
    Chapter,
    LanguageCode,
    ChapterDetails,
    HomeSection,
    Manga,
    MangaStatus,
    MangaTile,
    HomeSectionType,
    SearchRequest,
} from 'paperback-extensions-common'

const COVER_BASE_URL = 'https://mwebtoon-phinf.pstatic.net'
export class Parser {

    parseMangaDetails($: CheerioStatic,mangaId: string): Manga {
        const title = $('meta[property="og:title"]').attr('content')
        const desc = $('meta[property="og:description"]').attr('content')
        const image = $('meta[property="og:image"]').attr('content')
        const status = MangaStatus.UNKNOWN
        const author = $('meta[property="com-linewebtoon:webtoon:author"]').attr('content')

        return createManga({
            id: mangaId,
            titles: [(title ?? '')],
            image: image ?? '',
            author: author,
            status,
            desc: desc,
        })
    }

    parseChapters(json_data: any, mangaId: string, languageCode: string): Chapter[] {
        const chapters: Chapter[] = []
        const langCode = this.parseLanguageCode(languageCode)

        json_data.result.episodes.forEach((element: { translateCompleted: boolean; episodeNo: number; title: string; updateYmdt: number | Date }) => {
            if (element.translateCompleted) {
                const id = String(element.episodeNo)
                const chapNum = Number(id)
                const name = element.title
                const time = new Date(element.updateYmdt)

                chapters.push(createChapter({
                    id,
                    mangaId,
                    chapNum: isNaN(chapNum) ? 0 : chapNum,
                    langCode,
                    name: name,
                    time
                }))
            }
        })

        return chapters
    }

    parseLanguageCode(languageCode: string): LanguageCode {
        switch (languageCode) {
            case 'ENG':
                return LanguageCode.ENGLISH
            case 'BUL':
                return LanguageCode.BULGARIAN
            case 'CES':
                return LanguageCode.CZECH
            case 'DAN':
                return LanguageCode.DANISH
            case 'DEU':
                return LanguageCode.GERMAN
            case 'GRE':
                return LanguageCode.GREEK
            case 'HIN':
                return LanguageCode.INDIAN
            case 'IND':
                return LanguageCode.INDONESIAN
            case 'ITA':
                return LanguageCode.ITALIAN
            case 'JPN':
                return LanguageCode.JAPANESE
            case 'LIT':
                return LanguageCode.LITHUANIAN
            case 'MON':
                return LanguageCode.MONGOLIAN
            case 'MAY':
                return LanguageCode.MALAY
            case 'NLD':
                return LanguageCode.DUTCH
            case 'POL':
                return LanguageCode.POLISH
            case 'POR':
                return LanguageCode.PORTUGUESE
            case 'RON':
                return LanguageCode.ROMANIAN
            case 'RUS':
                return LanguageCode.RUSSIAN
            case 'THA':
                return LanguageCode.THAI
            case 'TUR':
                return LanguageCode.TURKISH
            case 'UKR':
                return LanguageCode.UKRAINIAN
            case 'VIE':
                return LanguageCode.VIETNAMESE
            case 'CMN':
                return LanguageCode.CHINEESE
            case 'CMT':
                return LanguageCode.CHINEESE_HONGKONG
            default:
                return LanguageCode.ENGLISH
        }
    }

    parseChapterDetails(json_data: any, mangaId: string, id: string): ChapterDetails {
        const pages: string[] = []

        json_data.result.imageInfo.forEach((element: { imageUrl: string }) => {
            pages.push(element.imageUrl)
        })

        return createChapterDetails({
            id,
            mangaId,
            pages,
            longStrip: true,
        })
    }

    parseSearchResults(json_data: any, query: SearchRequest): MangaTile[] {
        const results: MangaTile[] = []
        json_data.result.titleList.forEach((element: { representTitle: string; titleNo: number; teamVersion: number; writeAuthorName: string; thumbnailIPadUrl: string; thumbnailMobileUrl: string }) => {
            const keywords = (query.title  ?? '').split(/(\s+)/)
            keywords.forEach(keyword => {
                if (element.representTitle.toLowerCase().includes(keyword.toLowerCase())) {
                    const title = element.representTitle
                    const idNumber = element.titleNo
                    const teamVersion = element.teamVersion ?? 0
                    const id = `${idNumber}-${teamVersion}`
                    const subtitle = element.writeAuthorName

                    const image = element.thumbnailIPadUrl ?? element.thumbnailMobileUrl ?? ''
                    results.push(createMangaTile({
                        id: id,
                        image: (COVER_BASE_URL+image) ?? 'https://i.imgur.com/GYUxEX8.png',
                        title: createIconText({ text: title }),
                        subtitleText: createIconText({ text: subtitle })
                    }))
                }
            })
        })

        return results
    }

    parseHomeSections(json_data: any, sectionCallback: (section: HomeSection) => void): void {
        const showSection = createHomeSection({
            id: 'comics',
            title: 'Comics',
            type: HomeSectionType.singleRowNormal,
            view_more: true
        })

        const popularArray: MangaTile[] | undefined = []
        json_data.result.titleList.forEach((element: { representTitle: string; titleNo: number; teamVersion: number; writeAuthorName: string; thumbnailIPadUrl: string; thumbnailMobileUrl: string }) => {
            const title = element.representTitle
            const idNumber = element.titleNo
            const teamVersion = element.teamVersion ?? 0
            const id = `${idNumber}-${teamVersion}`
            const subtitle = element.writeAuthorName

            const image = element.thumbnailIPadUrl ?? element.thumbnailMobileUrl ?? ''
            popularArray.push(createMangaTile({
                id: id,
                image: (COVER_BASE_URL+image) ?? 'https://i.imgur.com/GYUxEX8.png',
                title: createIconText({ text: title }),
                subtitleText: createIconText({ text: subtitle })
            }))
        })

        showSection.items = popularArray
        sectionCallback(showSection)
    }

    parseViewMore = (json_data: any): MangaTile[] => {
        const mangas: MangaTile[] = []

        json_data.result.titleList.forEach((element: { representTitle: any; titleNo: any; teamVersion: number; writeAuthorName: any; thumbnailIPadUrl: any; thumbnailMobileUrl: any }) => {
            const title = element.representTitle
            const idNumber = element.titleNo
            const teamVersion = element.teamVersion ?? 0
            const id = `${idNumber}-${teamVersion}`
            const subtitle = element.writeAuthorName

            const image = element.thumbnailIPadUrl ?? element.thumbnailMobileUrl ?? ''
            mangas.push(createMangaTile({
                id: id,
                image: (COVER_BASE_URL+image) ?? 'https://i.imgur.com/GYUxEX8.png',
                title: createIconText({ text: title }),
                subtitleText: createIconText({ text: subtitle })
            }))
        })

        return mangas
    }
}
