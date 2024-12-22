class ProductList {
  constructor() {
    this.arr = [];
  }

  addProduct(product) {
    this.arr.push(product);
  }

  filterProduct(type) {
    if (type === "all") {
      return this.arr;
    } else {
      let result = [];
      for (let i = 0; i < this.arr.length; i++) {
        const products = this.arr[i];
        if (products.type === type) {
          result.push(products);
        }
      }
      return result;
    }
  }
}
export default ProductList;
