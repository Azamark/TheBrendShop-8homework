export const apiModule = {
    actions: {
        GET_JSON({ satet, commit }, url = '') {
            return fetch(url)
                .then(result => result.json())
                .catch(e => console.log(e))
        },
        POST_JSON({ satet, commit }, data) {
            console.log(data)
            return fetch(data.url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data.data)
            }).then(result => result.json())
                .catch(error => console.log(error))
        },
        PUT_JSON({ satet, commit }, data) {
            return fetch(data.url + `${data.id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data.data)
            }).then(result => result.json())
                .catch(error => console.log(error))
        },
        DELETE_JSON({ satet, commit }, data) {
            return fetch(data.url + `${data.id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                },
            }).then(result => result.json())
                .catch(error => console.log(error))
        },
        CLEAR_JSON({ satet, commit }, data) {
            return fetch(data.url, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                },
            }).then(result => result.json())
                .catch(error => console.log(error))
        }
    },
    namespaced: true
}