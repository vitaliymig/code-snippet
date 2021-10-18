import axios from "axios";


const api = axios.create({
    baseURL: '//localhost:1234/snippets',
    headers: {'content-type': 'application/json;charset=utf-8'}
})


api.interceptors.response.use(function (response) {

    return [null, response.data];
  }, function (error) {
    
    return [error, null];
});
  

export function getSnippets() {
    return api.get()
}
export function getSnippet(id) {
    return api.get(id)
}
export function saveSnippet(snippet) {
    return api.post('', snippet)
}
export function deleteSnippet(id, snippet) {
    return api.delete(id, snippet)
}
export function updateSnippet(id,snippetUpdate) {
    return api.patch(id, snippetUpdate)
}