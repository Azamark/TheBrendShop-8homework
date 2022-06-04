export const apiModule = {
    state: () => ({

    }),
    getters: {

    },
    mutations: {

    },
    actions: {
        GET_JSON({ satet, commit }, url = '') {
            return fetch(url)
                .then(result => result.json())
                .catch(e => console.log(e))
        },
        POST_JSON({ satet, commit }, data) {
            return fetch('/api/cart', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(result => result.json())
                .catch(error => console.log(error))
        },
        PUT_JSON({ satet, commit }, data) {
            return fetch(`/api/cart/${data.id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data.quantity)
            }).then(result => result.json())
                .catch(error => console.log(error))
        },
        DELETE_JSON({ satet, commit }, data) {
            return fetch(`/api/cart/${data.id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                },
            }).then(result => result.json())
                .catch(error => console.log(error))
        },
        CLEAR_JSON({ satet, commit }, url = '/api/cart/') {
            return fetch(url, {
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