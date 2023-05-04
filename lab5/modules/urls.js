import {accessToken, version} from "./consts.js";
import {ajax} from "./ajax.js"

class Urls {
    constructor() {
        this.url = 'https://api.vk.com/method'
        this.commonInfo = `access_token=${accessToken}&v=${version}`
    }

    getUserInfo(userId) {
        return `${this.url}/users.get?user_ids=${userId}&fields=bdate&${this.commonInfo}`;
    }

    async getGroupMembers(groupId) {
        let data = await ajax.post(`${this.url}/groups.getMembers?group_id=${groupId}&fields=photo_400_orig&${this.commonInfo}`);
        return data;
    }
    async getUser(groupId) {
        let data = await ajax.post(groupId);
        return data;
    }
}

export const urls = new Urls()