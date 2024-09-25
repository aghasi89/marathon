import { IShare } from "../../types/types";

const generateSharePath = (payload: IShare) => {
    const { type, id, lang, username, feedTypeId} = payload;    
    switch (type) {
        case 'article':
            return `https://marathon.me/ru/feed/combination/${feedTypeId}`
        case 'package':
            return `https://marathon.me/ru/feed/coach-package/${feedTypeId}`
        case 'live':
            return `https://marathon.me/ru/feed/coach-live/${feedTypeId}`
        case 'workout':
            return `https://marathon.me/ru/training/${id}`
        case 'recipe':
            return `https://marathon.me/ru/feed/ingridient/${id}`
        case 'profile':
            return `https://marathon.me/${lang}/profile/${username}`
        default:
            return ''
    }
}
export default generateSharePath