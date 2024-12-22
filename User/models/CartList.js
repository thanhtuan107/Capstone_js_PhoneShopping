class cartList {
  constructor() {
    this.arr = [];
  }

  addCart(cart) {
    this.arr.push(cart);
  }
  /**
   *  0. Tạo biến index = -1
   *  1. Duyệt qua từng phần tử trong mảng arr
   *    1.1. food = arr[i]
   *    1.2. Nếu id (user xóa) trùng với food.id
   *        => Đúng: gán i cho index
   *        => break;
   *  2. Trả index
   */
  findIndexCart(id) {
    let index = -1;
    for (let i = 0; i < this.arr.length; i++) {
      const cart = this.arr[i];
      if (cart.id === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  removeCart(id) {
    // Tìm vị trí của cart cần xóa
    const index = this.findIndexCart(id);
    console.log(index);

    // Xóa cart khỏi mảng
    if (index !== 0) {
      this.arr.splice(index, 1);
    }
  }
}

export default cartList;
