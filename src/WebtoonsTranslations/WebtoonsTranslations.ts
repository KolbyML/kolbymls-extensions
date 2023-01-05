import {
    Source,
    Chapter,
    ChapterDetails,
    HomeSection,
    SearchRequest,
    PagedResults,
    SourceInfo,
    ContentRating,
    Request,
    Response,
    TagType,
    Section,
    Manga,
} from 'paperback-extensions-common'

import {
    contentSettings,
    getLanguages
} from './WebtoonsTranslationsSettings'

import { Parser } from './WebtoonsTranslationsParser'


const WEBTOONS_DOMAIN = 'https://webtoons.com/'
const WEBTOONS_TRANSLATE_DOMAIN = 'https://translate.webtoons.com/'
const BASE_API = 'https://global.apis.naver.com'
const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.124 Safari/537.36 Edg/102.0.1245.44'
const MOBILE_BASE_URL = 'https://m.webtoons.com'

const PAGE_SIZE = 24

export const WebtoonsTranslationsInfo: SourceInfo = {
    author: 'Kolby ML',
    description: 'Extension that pulls translated comics from Webtoons Translations',
    icon: 'logo.png',
    name: 'Webtoons Translations',
    version: '1.0.0',
    authorWebsite: 'http://github.com/KolbyML',
    websiteBaseURL: WEBTOONS_TRANSLATE_DOMAIN,
    contentRating: ContentRating.EVERYONE,
    sourceTags: [
        {
            text: 'Multi-Language',
            type: TagType.GREEN
        }
    ],
}

export class WebtoonsTranslations extends Source {
    parser = new Parser()

    stateManager = createSourceStateManager({})

    requestManager = createRequestManager({
        requestsPerSecond: 3,
        requestTimeout: 15000,
        interceptor: {
            interceptRequest: async (request: Request): Promise<Request> => {
                request.headers = {
                    ...(request.headers ?? {}),
                    ...{
                        'user-agent': userAgent,
                        'referer': `${WEBTOONS_DOMAIN}/`,
                        'cookie': 'pagGDPR=true;'
                    }
                }

                return request
            },

            interceptResponse: async (response: Response): Promise<Response> => {
                return response
            }
        }
    })

    override async getMangaDetails(mangaId: string): Promise<Manga> {
        const lang = await getLanguages(this.stateManager)
        const [titleID, teamVersion] = mangaId.split('-')
        const id = `/translate/episodeList?titleNo=${titleID}&teamVersion=${teamVersion}`

        const request = createRequestObject({
            url: `${MOBILE_BASE_URL}${id}&languageCode=${lang[0]}`,
            method: 'GET'
        })

        const response = await this.requestManager.schedule(request, 3)
        const $ = this.cheerio.load(response.data)
        return this.parser.parseMangaDetails($, mangaId)
    }

    override async getChapters(mangaId: string): Promise<Chapter[]> {
        const lang = await getLanguages(this.stateManager)
        const [titleID, teamVersion] = mangaId.split('-')
        const request = createRequestObject({
            url: `${BASE_API}/lineWebtoon/ctrans/translatedEpisodes_jsonp.json?titleNo=${titleID}&languageCode=${lang[0]}&offset=0&limit=10000&teamVersion=${teamVersion}`,
            method: 'GET',
        })

        const data = await this.requestManager.schedule(request, 1)
        const json_data = (typeof data.data == 'string') ? JSON.parse(data.data) : data.data
        return this.parser.parseChapters(json_data, mangaId, lang[0] ?? 'en')
    }

    override async getChapterDetails(mangaId: string, chapterId: string): Promise<ChapterDetails> {
        const lang = await getLanguages(this.stateManager)
        const [titleID, teamVersion] = mangaId.split('-')
        const request = createRequestObject({
            url: `${BASE_API}/lineWebtoon/ctrans/translatedEpisodeDetail_jsonp.json?titleNo=${titleID}&episodeNo=${chapterId}&languageCode=${lang[0]}&teamVersion=${teamVersion}`,
            method: 'GET',
        })

        const data = await this.requestManager.schedule(request, 1)
        const json_data = (typeof data.data == 'string') ? JSON.parse(data.data) : data.data
        return this.parser.parseChapterDetails(json_data, mangaId, chapterId)
    }

    override async getHomePageSections(sectionCallback: (section: HomeSection) => void): Promise<void> {
        const lang = await getLanguages(this.stateManager)
        const request = createRequestObject({
            url: `${BASE_API}/lineWebtoon/ctrans/translatedWebtoons_jsonp.json?orderType=UPDATE&offset=0&size=${PAGE_SIZE}&languageCode=${lang[0]}`,
            method: 'GET'
        })

        const data = await this.requestManager.schedule(request, 1)
        const json_data = (typeof data.data == 'string') ? JSON.parse(data.data) : data.data
        return this.parser.parseHomeSections(json_data, sectionCallback)
    }

    override async getViewMoreItems(homepageSectionId: string, metadata: any): Promise<PagedResults> {
        const lang = await getLanguages(this.stateManager)
        const page: number = metadata?.page ?? 1
        let url = ''
        switch (homepageSectionId) {
            case 'comics':
                url = `${BASE_API}/lineWebtoon/ctrans/translatedWebtoons_jsonp.json?orderType=UPDATE&offset=${(page - 1) * PAGE_SIZE}&size=${PAGE_SIZE}&languageCode=${lang[0]}`
                break
            default:
                throw new Error(`Invalid homeSectionId | ${homepageSectionId}`)
        }

        const request = createRequestObject({
            url: `${url}`,
            method: 'GET',
        })

        const data = await this.requestManager.schedule(request, 1)
        const json_data = (typeof data.data == 'string') ? JSON.parse(data.data) : data.data

        const manga = this.parser.parseViewMore(json_data)
        metadata = (json_data.result.titleList.length == 24) ? { page: page + 1 } : undefined
        return createPagedResults({
            results: manga,
            metadata
        })
    }

    override async getSearchResults(query: SearchRequest, metadata: any): Promise<PagedResults> {
        const page = metadata?.page ?? 1
        if (page == -1) return createPagedResults({ results: [], metadata: { page: -1 } })

        const lang = await getLanguages(this.stateManager)
        const request = createRequestObject({
            url: `${BASE_API}/lineWebtoon/ctrans/translatedWebtoons_jsonp.json?orderType=UPDATE&offset=${(page - 1) * 200}&size=200&languageCode=${lang[0]}`,
            method: 'GET'
        })

        const data = await this.requestManager.schedule(request, 3)
        const json_data = (typeof data.data == 'string') ? JSON.parse(data.data) : data.data
        const manga = this.parser.parseSearchResults(json_data, query)

        return createPagedResults({
            results: manga,
        })

    }

    override async getSourceMenu(): Promise<Section> {
        return Promise.resolve(createSection({
            id: 'main',
            header: 'Source Settings',
            rows: async () => [
                await contentSettings(this.stateManager),
            ]
        }))
    }
}