class Api {
  fetchData() {
    const promise = axios({
      url: "https://6752d35af3754fcea7b9be1e.mockapi.io/api/Products",
      method: "GET",
    });

    return promise;
  }

  deleteDataById(id) {
    const promise = axios({
      url: `https://6752d35af3754fcea7b9be1e.mockapi.io/api/Products/${id}`,
      method: "DELETE",
    });

    return promise;
  }

  addData(product) {
    const promise = axios({
      url: "https://6752d35af3754fcea7b9be1e.mockapi.io/api/Products",
      method: "POST",
      data: product,
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

  updateData(product) {
    const promise = axios({
      url: `https://6752d35af3754fcea7b9be1e.mockapi.io/api/Products/${product.id}`,
      method: "PUT",
      data: product,
    });

    return promise;
  }
}

export default new Api();
