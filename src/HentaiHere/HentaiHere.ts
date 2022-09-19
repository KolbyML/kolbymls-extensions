import {
    Source,
    Manga,
    Chapter,
    ChapterDetails,
    HomeSection,
    SearchRequest,
    PagedResults,
    SourceInfo,
    ContentRating,
    TagType,
    Request,
    Response,
    TagSection
} from 'paperback-extensions-common'

import {
    parseChapterDetails,
    isLastPage,
    parseChapters,
    parseHomeSections,
    parseMangaDetails,
    parseViewMore,
    parseSearch,
    parseTags
} from './HentaiHereParser'

const HH_DOMAIN = 'https://hentaihere.com'

export const HentaiHereInfo: SourceInfo = {
    version: '2.1.0',
    name: 'HentaiHere',
    icon: 'icon.png',
    author: 'Netsky',
    authorWebsite: 'https://github.com/TheNetsky',
    description: 'Extension that pulls manga from HentaiHere',
    contentRating: ContentRating.ADULT,
    websiteBaseURL: HH_DOMAIN,
    sourceTags: [
        {
            text: '18+',
            type: TagType.YELLOW
        }
    ]
}

export class HentaiHere extends Source {
    requestManager = createRequestManager({
        requestsPerSecond: 4,
        requestTimeout: 15000,
        interceptor: {
            interceptRequest: async (request: Request): Promise<Request> => {

                request.headers = {
                    ...(request.headers ?? {}),
                    ...{
                        'referer': `${HH_DOMAIN}/`,
                        //@ts-ignore
                        'user-agent': await this.requestManager.getDefaultUserAgent()
                    }
                }

                return request
            },

            interceptResponse: async (response: Response): Promise<Response> => {
                return response
            }
        }
    })


    override getMangaShareUrl(mangaId: string): string { return `${HH_DOMAIN}/m/${mangaId}` }

    override async getMangaDetails(mangaId: string): Promise<Manga> {
        const request = createRequestObject({
            url: `${HH_DOMAIN}/m/${mangaId}`,
            method: 'GET'
        })

        const response = await this.requestManager.schedule(request, 1)
        this.CloudFlareError(response.status)
        const $ = this.cheerio.load(response.data)
        return parseMangaDetails($, mangaId)
    }

    override async getChapters(mangaId: string): Promise<Chapter[]> {
        const request = createRequestObject({
            url: `${HH_DOMAIN}/m/${mangaId}`,
            method: 'GET'
        })

        const response = await this.requestManager.schedule(request, 1)
        this.CloudFlareError(response.status)
        const $ = this.cheerio.load(response.data)
        return parseChapters($, mangaId)
    }

    override async getChapterDetails(mangaId: string, chapterId: string): Promise<ChapterDetails> {
        const request = createRequestObject({
            url: `${HH_DOMAIN}/m/${mangaId}/${chapterId}/1`,
            method: 'GET'
        })

        const response = await this.requestManager.schedule(request, 1)
        this.CloudFlareError(response.status)
        return parseChapterDetails(response.data, mangaId, chapterId)
    }

    override async getHomePageSections(sectionCallback: (section: HomeSection) => void): Promise<void> {
        const request = createRequestObject({
            url: HH_DOMAIN,
            method: 'GET'
        })

        const response = await this.requestManager.schedule(request, 1)
        this.CloudFlareError(response.status)
        const $ = this.cheerio.load(response.data)
        parseHomeSections($, sectionCallback)
    }

    override async getViewMoreItems(homepageSectionId: string, metadata: any): Promise<PagedResults> {
        const page: number = metadata?.page ?? 1
        let param = ''
        switch (homepageSectionId) {
            case 'newest':
                param = `/directory/newest?page=${page}`
                break
            case 'trending':
                param = `/directory/trending?page=${page}`
                break
            case 'staff_pick':
                param = `/directory/staff_pick?page=${page}`
                break
            default:
                throw new Error('Requested to getViewMoreItems for a section ID which doesn\'t exist')
        }

        const request = createRequestObject({
            url: HH_DOMAIN,
            method: 'GET',
            param
        })

        const response = await this.requestManager.schedule(request, 1)
        this.CloudFlareError(response.status)
        const $ = this.cheerio.load(response.data)

        const manga = parseViewMore($)
        metadata = !isLastPage($) ? { page: page + 1 } : undefined
        return createPagedResults({
            results: manga,
            metadata
        })
    }

    override async getSearchTags(): Promise<TagSection[]> {
        const request = createRequestObject({
            url: `${HH_DOMAIN}/tags/category`,
            method: 'GET'
        })

        const response = await this.requestManager.schedule(request, 1)
        const $ = this.cheerio.load(response.data)
        return parseTags($)
    }

    async getSearchResults(query: SearchRequest, metadata: any): Promise<PagedResults> {
        const page: number = metadata?.page ?? 1
        let request

        if (query.title) {
            request = createRequestObject({
                url: `${HH_DOMAIN}/search?s=`,
                method: 'GET',
                param: `${encodeURI(query.title)}&page=${page}`
            })
        } else {
            request = createRequestObject({
                url: `${HH_DOMAIN}`,
                method: 'GET',
                param: `/search/${query?.includedTags?.map((x: any) => x.id)[0]}/most-popular?page=${page}`
            })
        }

        const response = await this.requestManager.schedule(request, 1)
        const $ = this.cheerio.load(response.data)
        const manga = parseSearch($)
        metadata = !isLastPage($) ? { page: page + 1 } : undefined
        return createPagedResults({
            results: manga,
            metadata
        })
    }

    CloudFlareError(status: number): void {
        if (status == 503) {
            throw new Error('CLOUDFLARE BYPASS ERROR:\nPlease go to Settings > Sources > <The name of this source> and press Cloudflare Bypass')
        }
    }

    //@ts-ignore
    override async getCloudflareBypassRequestAsync(): Promise<Request> {
        return createRequestObject({
            url: HH_DOMAIN,
            method: 'GET',
            headers: {
                'referer': `${HH_DOMAIN}/`,
                //@ts-ignore
                'user-agent': await this.requestManager.getDefaultUserAgent()
            }
        })
    }
}