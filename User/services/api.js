class Api {
  fetchData() {
    const promise = axios({
      url: "https://6752d35af3754fcea7b9be1e.mockapi.io/api/Products",
      method: "GET",
    });
    return promise;
  }

  getDataById(id) {
    const promise = axios({
      url: `https://6752d35af3754fcea7b9be1e.mockapi.io/api/Products/${id}`,
      method: "GET",
    });
    return promise;
  }

  addData(product) {
    const promise = axios({
      url: `https://6752d35af3754fcea7b9be1e.mockapi.io/api/Products`,
      method: "POST",
      data: product,
    });
    return promise;
  }
}
export default new Api();
