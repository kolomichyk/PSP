class Ajax {
    async post(url) {
        let response = await fetch(url, {
            method: "POST"
        })

        let data = await response.json();

        return data;
    }
}

export const ajax = new Ajax();