class Fetch {
  async _request(url, data = {}, method = 'GET') {
    const response = await fetch(url, {
      method: method
    })
    const result = await response.json()
    return result
  }
  get(url, data = {}) {
    return this._request(url, data)
  }
  post() {

  }
}

export default new Fetch()