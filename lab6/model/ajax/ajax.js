export class Ajax {
    post(url, callback) {
        let xhr = new XMLHttpRequest()
        xhr.open('POST', url);
        xhr.send();
    }

    get(url, callback) {
        let xhr = new XMLHttpRequest()
        xhr.open('GET', url);
        xhr.send();

        //if (!isNaN(callback)) {
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    const data = JSON.parse(xhr.response);
                    callback(data);
                }
            }
        //}
    }
    CUD(url) {
        let xhr = new XMLHttpRequest()
        xhr.open('GET', url);
        xhr.send();
    }
}
