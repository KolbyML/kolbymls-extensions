(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Sources = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
"use strict";
/**
 * Request objects hold information for a particular source (see sources for example)
 * This allows us to to use a generic api to make the calls against any source
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlEncodeObject = exports.convertTime = exports.Source = void 0;
class Source {
    constructor(cheerio) {
        this.cheerio = cheerio;
    }
    /**
     * @deprecated use {@link Source.getSearchResults getSearchResults} instead
     */
    searchRequest(query, metadata) {
        return this.getSearchResults(query, metadata);
    }
    /**
     * @deprecated use {@link Source.getSearchTags} instead
     */
    getTags() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            return (_a = this.getSearchTags) === null || _a === void 0 ? void 0 : _a.call(this);
        });
    }
}
exports.Source = Source;
// Many sites use '[x] time ago' - Figured it would be good to handle these cases in general
function convertTime(timeAgo) {
    var _a;
    let time;
    let trimmed = Number(((_a = /\d*/.exec(timeAgo)) !== null && _a !== void 0 ? _a : [])[0]);
    trimmed = (trimmed == 0 && timeAgo.includes('a')) ? 1 : trimmed;
    if (timeAgo.includes('minutes')) {
        time = new Date(Date.now() - trimmed * 60000);
    }
    else if (timeAgo.includes('hours')) {
        time = new Date(Date.now() - trimmed * 3600000);
    }
    else if (timeAgo.includes('days')) {
        time = new Date(Date.now() - trimmed * 86400000);
    }
    else if (timeAgo.includes('year') || timeAgo.includes('years')) {
        time = new Date(Date.now() - trimmed * 31556952000);
    }
    else {
        time = new Date(Date.now());
    }
    return time;
}
exports.convertTime = convertTime;
/**
 * When a function requires a POST body, it always should be defined as a JsonObject
 * and then passed through this function to ensure that it's encoded properly.
 * @param obj
 */
function urlEncodeObject(obj) {
    let ret = {};
    for (const entry of Object.entries(obj)) {
        ret[encodeURIComponent(entry[0])] = encodeURIComponent(entry[1]);
    }
    return ret;
}
exports.urlEncodeObject = urlEncodeObject;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tracker = void 0;
class Tracker {
    constructor(cheerio) {
        this.cheerio = cheerio;
    }
}
exports.Tracker = Tracker;

},{}],4:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./Source"), exports);
__exportStar(require("./Tracker"), exports);

},{"./Source":2,"./Tracker":3}],5:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./base"), exports);
__exportStar(require("./models"), exports);
__exportStar(require("./APIWrapper"), exports);

},{"./APIWrapper":1,"./base":4,"./models":47}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],7:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],8:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],9:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],10:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],11:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],12:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],13:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],14:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],15:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],16:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],17:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],18:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],19:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],20:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],21:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],22:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],23:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],24:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./Button"), exports);
__exportStar(require("./Form"), exports);
__exportStar(require("./Header"), exports);
__exportStar(require("./InputField"), exports);
__exportStar(require("./Label"), exports);
__exportStar(require("./Link"), exports);
__exportStar(require("./MultilineLabel"), exports);
__exportStar(require("./NavigationButton"), exports);
__exportStar(require("./OAuthButton"), exports);
__exportStar(require("./Section"), exports);
__exportStar(require("./Select"), exports);
__exportStar(require("./Switch"), exports);
__exportStar(require("./WebViewButton"), exports);
__exportStar(require("./FormRow"), exports);
__exportStar(require("./Stepper"), exports);

},{"./Button":9,"./Form":10,"./FormRow":11,"./Header":12,"./InputField":13,"./Label":14,"./Link":15,"./MultilineLabel":16,"./NavigationButton":17,"./OAuthButton":18,"./Section":19,"./Select":20,"./Stepper":21,"./Switch":22,"./WebViewButton":23}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeSectionType = void 0;
var HomeSectionType;
(function (HomeSectionType) {
    HomeSectionType["singleRowNormal"] = "singleRowNormal";
    HomeSectionType["singleRowLarge"] = "singleRowLarge";
    HomeSectionType["doubleRow"] = "doubleRow";
    HomeSectionType["featured"] = "featured";
})(HomeSectionType = exports.HomeSectionType || (exports.HomeSectionType = {}));

},{}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageCode = void 0;
var LanguageCode;
(function (LanguageCode) {
    LanguageCode["UNKNOWN"] = "_unknown";
    LanguageCode["BENGALI"] = "bd";
    LanguageCode["BULGARIAN"] = "bg";
    LanguageCode["BRAZILIAN"] = "br";
    LanguageCode["CHINEESE"] = "cn";
    LanguageCode["CZECH"] = "cz";
    LanguageCode["GERMAN"] = "de";
    LanguageCode["DANISH"] = "dk";
    LanguageCode["ENGLISH"] = "gb";
    LanguageCode["SPANISH"] = "es";
    LanguageCode["FINNISH"] = "fi";
    LanguageCode["FRENCH"] = "fr";
    LanguageCode["WELSH"] = "gb";
    LanguageCode["GREEK"] = "gr";
    LanguageCode["CHINEESE_HONGKONG"] = "hk";
    LanguageCode["HUNGARIAN"] = "hu";
    LanguageCode["INDONESIAN"] = "id";
    LanguageCode["ISRELI"] = "il";
    LanguageCode["INDIAN"] = "in";
    LanguageCode["IRAN"] = "ir";
    LanguageCode["ITALIAN"] = "it";
    LanguageCode["JAPANESE"] = "jp";
    LanguageCode["KOREAN"] = "kr";
    LanguageCode["LITHUANIAN"] = "lt";
    LanguageCode["MONGOLIAN"] = "mn";
    LanguageCode["MEXIAN"] = "mx";
    LanguageCode["MALAY"] = "my";
    LanguageCode["DUTCH"] = "nl";
    LanguageCode["NORWEGIAN"] = "no";
    LanguageCode["PHILIPPINE"] = "ph";
    LanguageCode["POLISH"] = "pl";
    LanguageCode["PORTUGUESE"] = "pt";
    LanguageCode["ROMANIAN"] = "ro";
    LanguageCode["RUSSIAN"] = "ru";
    LanguageCode["SANSKRIT"] = "sa";
    LanguageCode["SAMI"] = "si";
    LanguageCode["THAI"] = "th";
    LanguageCode["TURKISH"] = "tr";
    LanguageCode["UKRAINIAN"] = "ua";
    LanguageCode["VIETNAMESE"] = "vn";
})(LanguageCode = exports.LanguageCode || (exports.LanguageCode = {}));

},{}],27:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MangaStatus = void 0;
var MangaStatus;
(function (MangaStatus) {
    MangaStatus[MangaStatus["ONGOING"] = 1] = "ONGOING";
    MangaStatus[MangaStatus["COMPLETED"] = 0] = "COMPLETED";
    MangaStatus[MangaStatus["UNKNOWN"] = 2] = "UNKNOWN";
    MangaStatus[MangaStatus["ABANDONED"] = 3] = "ABANDONED";
    MangaStatus[MangaStatus["HIATUS"] = 4] = "HIATUS";
})(MangaStatus = exports.MangaStatus || (exports.MangaStatus = {}));

},{}],28:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],29:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],30:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],31:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],32:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],33:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],34:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],35:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],36:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],37:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],38:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchOperator = void 0;
var SearchOperator;
(function (SearchOperator) {
    SearchOperator["AND"] = "AND";
    SearchOperator["OR"] = "OR";
})(SearchOperator = exports.SearchOperator || (exports.SearchOperator = {}));

},{}],39:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentRating = void 0;
/**
 * A content rating to be attributed to each source.
 */
var ContentRating;
(function (ContentRating) {
    ContentRating["EVERYONE"] = "EVERYONE";
    ContentRating["MATURE"] = "MATURE";
    ContentRating["ADULT"] = "ADULT";
})(ContentRating = exports.ContentRating || (exports.ContentRating = {}));

},{}],40:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],41:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],42:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagType = void 0;
/**
 * An enumerator which {@link SourceTags} uses to define the color of the tag rendered on the website.
 * Five types are available: blue, green, grey, yellow and red, the default one is blue.
 * Common colors are red for (Broken), yellow for (+18), grey for (Country-Proof)
 */
var TagType;
(function (TagType) {
    TagType["BLUE"] = "default";
    TagType["GREEN"] = "success";
    TagType["GREY"] = "info";
    TagType["YELLOW"] = "warning";
    TagType["RED"] = "danger";
})(TagType = exports.TagType || (exports.TagType = {}));

},{}],43:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],44:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],45:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],46:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],47:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./Chapter"), exports);
__exportStar(require("./ChapterDetails"), exports);
__exportStar(require("./HomeSection"), exports);
__exportStar(require("./Manga"), exports);
__exportStar(require("./MangaTile"), exports);
__exportStar(require("./RequestObject"), exports);
__exportStar(require("./SearchRequest"), exports);
__exportStar(require("./TagSection"), exports);
__exportStar(require("./SourceTag"), exports);
__exportStar(require("./Languages"), exports);
__exportStar(require("./Constants"), exports);
__exportStar(require("./MangaUpdate"), exports);
__exportStar(require("./PagedResults"), exports);
__exportStar(require("./ResponseObject"), exports);
__exportStar(require("./RequestManager"), exports);
__exportStar(require("./RequestHeaders"), exports);
__exportStar(require("./SourceInfo"), exports);
__exportStar(require("./SourceStateManager"), exports);
__exportStar(require("./RequestInterceptor"), exports);
__exportStar(require("./DynamicUI"), exports);
__exportStar(require("./TrackedManga"), exports);
__exportStar(require("./SourceManga"), exports);
__exportStar(require("./TrackedMangaChapterReadAction"), exports);
__exportStar(require("./TrackerActionQueue"), exports);
__exportStar(require("./SearchField"), exports);
__exportStar(require("./RawData"), exports);

},{"./Chapter":6,"./ChapterDetails":7,"./Constants":8,"./DynamicUI":24,"./HomeSection":25,"./Languages":26,"./Manga":27,"./MangaTile":28,"./MangaUpdate":29,"./PagedResults":30,"./RawData":31,"./RequestHeaders":32,"./RequestInterceptor":33,"./RequestManager":34,"./RequestObject":35,"./ResponseObject":36,"./SearchField":37,"./SearchRequest":38,"./SourceInfo":39,"./SourceManga":40,"./SourceStateManager":41,"./SourceTag":42,"./TagSection":43,"./TrackedManga":44,"./TrackedMangaChapterReadAction":45,"./TrackerActionQueue":46}],48:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebtoonsTranslations = exports.WebtoonsTranslationsInfo = void 0;
const paperback_extensions_common_1 = require("paperback-extensions-common");
const WebtoonsTranslationsSettings_1 = require("./WebtoonsTranslationsSettings");
const WebtoonsTranslationsParser_1 = require("./WebtoonsTranslationsParser");
const WEBTOONS_DOMAIN = 'https://webtoons.com/';
const WEBTOONS_TRANSLATE_DOMAIN = 'https://translate.webtoons.com/';
const BASE_API = 'https://global.apis.naver.com';
const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.124 Safari/537.36 Edg/102.0.1245.44';
const MOBILE_BASE_URL = 'https://m.webtoons.com';
const PAGE_SIZE = 24;
exports.WebtoonsTranslationsInfo = {
    author: 'Kolby ML',
    description: 'Extension that pulls translated comics from Webtoons',
    icon: 'logo.png',
    name: 'Webtoons Translations',
    version: '3.0.2',
    authorWebsite: 'http://github.com/KolbyML',
    websiteBaseURL: WEBTOONS_TRANSLATE_DOMAIN,
    contentRating: paperback_extensions_common_1.ContentRating.EVERYONE,
    sourceTags: [
        {
            text: 'Multi-Language',
            type: paperback_extensions_common_1.TagType.GREEN
        }
    ],
};
class WebtoonsTranslations extends paperback_extensions_common_1.Source {
    constructor() {
        super(...arguments);
        this.parser = new WebtoonsTranslationsParser_1.Parser();
        this.stateManager = createSourceStateManager({});
        this.requestManager = createRequestManager({
            requestsPerSecond: 3,
            requestTimeout: 15000,
            interceptor: {
                interceptRequest: async (request) => {
                    request.headers = {
                        ...(request.headers ?? {}),
                        ...{
                            'user-agent': userAgent,
                            'referer': `${WEBTOONS_DOMAIN}/`,
                            'cookie': 'pagGDPR=true;'
                        }
                    };
                    return request;
                },
                interceptResponse: async (response) => {
                    return response;
                }
            }
        });
    }
    getMangaShareUrl(mangaId) { return `${WEBTOONS_DOMAIN}/en/${mangaId}`; }
    async getMangaDetails(mangaId) {
        const lang = await (0, WebtoonsTranslationsSettings_1.getLanguages)(this.stateManager);
        const [titleID, teamVersion] = mangaId.split('-');
        const id = `/translate/episodeList?titleNo=${titleID}&teamVersion=${teamVersion}`;
        const request = createRequestObject({
            url: `${MOBILE_BASE_URL}${id}&languageCode=${lang[0]}`,
            method: 'GET'
        });
        const response = await this.requestManager.schedule(request, 3);
        const $ = this.cheerio.load(response.data);
        return this.parser.parseMangaDetails($, mangaId);
    }
    async getChapters(mangaId) {
        const lang = await (0, WebtoonsTranslationsSettings_1.getLanguages)(this.stateManager);
        const [titleID, teamVersion] = mangaId.split('-');
        const request = createRequestObject({
            url: `${BASE_API}/lineWebtoon/ctrans/translatedEpisodes_jsonp.json?titleNo=${titleID}&languageCode=${lang[0]}&offset=0&limit=10000&teamVersion=${teamVersion}`,
            method: 'GET',
        });
        const data = await this.requestManager.schedule(request, 1);
        const json_data = (typeof data.data == 'string') ? JSON.parse(data.data) : data.data;
        return this.parser.parseChapters(json_data, mangaId, lang[0] ?? 'en');
    }
    async getChapterDetails(mangaId, chapterId) {
        const lang = await (0, WebtoonsTranslationsSettings_1.getLanguages)(this.stateManager);
        const [titleID, teamVersion] = mangaId.split('-');
        const request = createRequestObject({
            url: `${BASE_API}/lineWebtoon/ctrans/translatedEpisodeDetail_jsonp.json?titleNo=${titleID}&episodeNo=${chapterId}&languageCode=${lang[0]}&teamVersion=${teamVersion}`,
            method: 'GET',
        });
        const data = await this.requestManager.schedule(request, 1);
        const json_data = (typeof data.data == 'string') ? JSON.parse(data.data) : data.data;
        return this.parser.parseChapterDetails(json_data, mangaId, chapterId);
    }
    async getHomePageSections(sectionCallback) {
        const lang = await (0, WebtoonsTranslationsSettings_1.getLanguages)(this.stateManager);
        const request = createRequestObject({
            url: `${BASE_API}/lineWebtoon/ctrans/translatedWebtoons_jsonp.json?orderType=UPDATE&offset=0&size=${PAGE_SIZE}&languageCode=${lang[0]}`,
            method: 'GET'
        });
        const data = await this.requestManager.schedule(request, 1);
        const json_data = (typeof data.data == 'string') ? JSON.parse(data.data) : data.data;
        return this.parser.parseHomeSections(json_data, sectionCallback);
    }
    async getViewMoreItems(homepageSectionId, metadata) {
        const lang = await (0, WebtoonsTranslationsSettings_1.getLanguages)(this.stateManager);
        const page = metadata?.page ?? 1;
        let url = '';
        switch (homepageSectionId) {
            case 'comics':
                url = `${BASE_API}/lineWebtoon/ctrans/translatedWebtoons_jsonp.json?orderType=UPDATE&offset=${(page - 1) * PAGE_SIZE}&size=${PAGE_SIZE}&languageCode=${lang[0]}`;
                break;
            default:
                throw new Error(`Invalid homeSectionId | ${homepageSectionId}`);
        }
        const request = createRequestObject({
            url: `${url}`,
            method: 'GET',
        });
        const data = await this.requestManager.schedule(request, 1);
        const json_data = (typeof data.data == 'string') ? JSON.parse(data.data) : data.data;
        const manga = this.parser.parseViewMore(json_data);
        metadata = (json_data.result.titleList.length == 24) ? { page: page + 1 } : undefined;
        return createPagedResults({
            results: manga,
            metadata
        });
    }
    async getSearchResults(query, metadata) {
        const page = metadata?.page ?? 1;
        if (page == -1)
            return createPagedResults({ results: [], metadata: { page: -1 } });
        const lang = await (0, WebtoonsTranslationsSettings_1.getLanguages)(this.stateManager);
        const request = createRequestObject({
            url: `${BASE_API}/lineWebtoon/ctrans/translatedWebtoons_jsonp.json?orderType=UPDATE&offset=${(page - 1) * 200}&size=200&languageCode=${lang[0]}`,
            method: 'GET'
        });
        const data = await this.requestManager.schedule(request, 3);
        const json_data = (typeof data.data == 'string') ? JSON.parse(data.data) : data.data;
        const manga = this.parser.parseSearchResults(json_data, query);
        return createPagedResults({
            results: manga,
        });
    }
    async getSourceMenu() {
        return Promise.resolve(createSection({
            id: 'main',
            header: 'Source Settings',
            rows: async () => [
                await (0, WebtoonsTranslationsSettings_1.contentSettings)(this.stateManager),
            ]
        }));
    }
}
exports.WebtoonsTranslations = WebtoonsTranslations;

},{"./WebtoonsTranslationsParser":49,"./WebtoonsTranslationsSettings":50,"paperback-extensions-common":5}],49:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
const paperback_extensions_common_1 = require("paperback-extensions-common");
const COVER_BASE_URL = 'https://mwebtoon-phinf.pstatic.net';
class Parser {
    constructor() {
        this.parseViewMore = (json_data) => {
            const mangas = [];
            json_data.result.titleList.forEach((element) => {
                const title = element.representTitle;
                const idNumber = element.titleNo;
                const teamVersion = element.teamVersion ?? 0;
                const id = `${idNumber}-${teamVersion}`;
                const subtitle = element.writeAuthorName;
                const image = element.thumbnailIPadUrl ?? element.thumbnailMobileUrl ?? '';
                mangas.push(createMangaTile({
                    id: id,
                    image: (COVER_BASE_URL + image) ?? 'https://i.imgur.com/GYUxEX8.png',
                    title: createIconText({ text: title }),
                    subtitleText: createIconText({ text: subtitle })
                }));
            });
            return mangas;
        };
    }
    parseMangaDetails($, mangaId) {
        const title = $('meta[property="og:title"]').attr('content');
        const desc = $('meta[property="og:description"]').attr('content');
        const image = $('meta[property="og:image"]').attr('content');
        const status = paperback_extensions_common_1.MangaStatus.UNKNOWN;
        const author = $('meta[property="com-linewebtoon:webtoon:author"]').attr('content');
        return createManga({
            id: mangaId,
            titles: [(title ?? '')],
            image: image ?? '',
            author: author,
            status,
            desc: desc,
        });
    }
    parseChapters(json_data, mangaId, languageCode) {
        const chapters = [];
        const langCode = this.parseLanguageCode(languageCode);
        json_data.result.episodes.forEach((element) => {
            if (element.translateCompleted) {
                const id = String(element.episodeNo);
                const chapNum = Number(id);
                const name = element.title;
                const time = new Date(element.updateYmdt);
                chapters.push(createChapter({
                    id,
                    mangaId,
                    chapNum: isNaN(chapNum) ? 0 : chapNum,
                    langCode,
                    name: name,
                    time
                }));
            }
        });
        return chapters;
    }
    parseLanguageCode(languageCode) {
        switch (languageCode) {
            case 'ENG':
                return paperback_extensions_common_1.LanguageCode.ENGLISH;
            case 'BUL':
                return paperback_extensions_common_1.LanguageCode.BULGARIAN;
            case 'CES':
                return paperback_extensions_common_1.LanguageCode.CZECH;
            case 'DAN':
                return paperback_extensions_common_1.LanguageCode.DANISH;
            case 'DEU':
                return paperback_extensions_common_1.LanguageCode.GERMAN;
            case 'GRE':
                return paperback_extensions_common_1.LanguageCode.GREEK;
            case 'HIN':
                return paperback_extensions_common_1.LanguageCode.INDIAN;
            case 'IND':
                return paperback_extensions_common_1.LanguageCode.INDONESIAN;
            case 'ITA':
                return paperback_extensions_common_1.LanguageCode.ITALIAN;
            case 'JPN':
                return paperback_extensions_common_1.LanguageCode.JAPANESE;
            case 'LIT':
                return paperback_extensions_common_1.LanguageCode.LITHUANIAN;
            case 'MON':
                return paperback_extensions_common_1.LanguageCode.MONGOLIAN;
            case 'MAY':
                return paperback_extensions_common_1.LanguageCode.MALAY;
            case 'NLD':
                return paperback_extensions_common_1.LanguageCode.DUTCH;
            case 'POL':
                return paperback_extensions_common_1.LanguageCode.POLISH;
            case 'POR':
                return paperback_extensions_common_1.LanguageCode.PORTUGUESE;
            case 'RON':
                return paperback_extensions_common_1.LanguageCode.ROMANIAN;
            case 'RUS':
                return paperback_extensions_common_1.LanguageCode.RUSSIAN;
            case 'THA':
                return paperback_extensions_common_1.LanguageCode.THAI;
            case 'TUR':
                return paperback_extensions_common_1.LanguageCode.TURKISH;
            case 'UKR':
                return paperback_extensions_common_1.LanguageCode.UKRAINIAN;
            case 'VIE':
                return paperback_extensions_common_1.LanguageCode.VIETNAMESE;
            case 'CMN':
                return paperback_extensions_common_1.LanguageCode.CHINEESE;
            case 'CMT':
                return paperback_extensions_common_1.LanguageCode.CHINEESE_HONGKONG;
            default:
                return paperback_extensions_common_1.LanguageCode.ENGLISH;
        }
    }
    parseChapterDetails(json_data, mangaId, id) {
        const pages = [];
        json_data.result.imageInfo.forEach((element) => {
            pages.push(element.imageUrl);
        });
        return createChapterDetails({
            id,
            mangaId,
            pages,
            longStrip: true,
        });
    }
    parseSearchResults(json_data, query) {
        const results = [];
        json_data.result.titleList.forEach((element) => {
            const keywords = (query.title ?? '').split(/(\s+)/);
            keywords.forEach(keyword => {
                if (element.representTitle.toLowerCase().includes(keyword.toLowerCase())) {
                    const title = element.representTitle;
                    const idNumber = element.titleNo;
                    const teamVersion = element.teamVersion ?? 0;
                    const id = `${idNumber}-${teamVersion}`;
                    const subtitle = element.writeAuthorName;
                    const image = element.thumbnailIPadUrl ?? element.thumbnailMobileUrl ?? '';
                    results.push(createMangaTile({
                        id: id,
                        image: (COVER_BASE_URL + image) ?? 'https://i.imgur.com/GYUxEX8.png',
                        title: createIconText({ text: title }),
                        subtitleText: createIconText({ text: subtitle })
                    }));
                }
            });
        });
        return results;
    }
    parseHomeSections(json_data, sectionCallback) {
        const showSection = createHomeSection({
            id: 'comics',
            title: 'Comics',
            type: paperback_extensions_common_1.HomeSectionType.singleRowNormal,
            view_more: true
        });
        const popularArray = [];
        json_data.result.titleList.forEach((element) => {
            const title = element.representTitle;
            const idNumber = element.titleNo;
            const teamVersion = element.teamVersion ?? 0;
            const id = `${idNumber}-${teamVersion}`;
            const subtitle = element.writeAuthorName;
            const image = element.thumbnailIPadUrl ?? element.thumbnailMobileUrl ?? '';
            popularArray.push(createMangaTile({
                id: id,
                image: (COVER_BASE_URL + image) ?? 'https://i.imgur.com/GYUxEX8.png',
                title: createIconText({ text: title }),
                subtitleText: createIconText({ text: subtitle })
            }));
        });
        showSection.items = popularArray;
        sectionCallback(showSection);
    }
}
exports.Parser = Parser;

},{"paperback-extensions-common":5}],50:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentSettings = exports.getLanguages = exports.WebtoonsLanguages = void 0;
class WebtoonsLanguagesClass {
    constructor() {
        this.Languages = [
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
        ];
        // Sorts the languages based on name
        this.Languages = this.Languages.sort((a, b) => a.name > b.name ? 1 : -1);
    }
    getLanguageCodeList() {
        return this.Languages.map(Language => Language.LanguageCode);
    }
    getName(LanguageCode) {
        return this.Languages.filter(Language => Language.LanguageCode == LanguageCode)[0]?.name ?? 'Unknown';
    }
    getPBCode(LanguageCode) {
        return this.Languages.filter(Language => Language.LanguageCode == LanguageCode)[0]?.PBCode ?? '_unknown';
    }
    getDefault() {
        return this.Languages.filter(Language => Language.default).map(Language => Language.LanguageCode);
    }
}
exports.WebtoonsLanguages = new WebtoonsLanguagesClass();
const getLanguages = async (stateManager) => {
    return await stateManager.retrieve('language') ?? exports.WebtoonsLanguages.getDefault();
};
exports.getLanguages = getLanguages;
const contentSettings = (stateManager) => {
    return createNavigationButton({
        id: 'content_settings',
        value: '',
        label: 'Content Settings',
        form: createForm({
            onSubmit: async (values) => {
                return Promise.all([
                    stateManager.store('language', values.language),
                ]).then();
            },
            validate: () => {
                return Promise.resolve(true);
            },
            sections: () => {
                return Promise.resolve([
                    createSection({
                        id: 'content',
                        footer: 'Please choose the language that you would like to view translated Webtoons in.',
                        rows: () => {
                            return Promise.all([
                                (0, exports.getLanguages)(stateManager),
                            ]).then(async (values) => {
                                return [
                                    createSelect({
                                        id: 'language',
                                        label: 'Language',
                                        options: exports.WebtoonsLanguages.getLanguageCodeList(),
                                        displayLabel: option => exports.WebtoonsLanguages.getName(option),
                                        value: values[0],
                                        allowsMultiselect: false,
                                        minimumOptionCount: 1,
                                    }),
                                ];
                            });
                        }
                    })
                ]);
            }
        })
    });
};
exports.contentSettings = contentSettings;

},{}]},{},[48])(48)
});
