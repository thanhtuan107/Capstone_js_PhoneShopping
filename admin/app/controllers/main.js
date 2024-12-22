import api from '../services/api.js';
import Product from '../models/Product.js';
import {
  validateName,
  validatePrice,
  validateScreen,
  validateBackCamera,
  validateFrontCamera,
  validateImage,
  validateDescription,
  validateType
} from '../utils/validation.js';

const getEleid = (id) => document.getElementById(id);

const renderProduct = (data) => {
    let content = "";

    data.forEach((product,i) => {
        content += `
            <tr>
                <td>${i + 1}</td>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.screen}</td>
                <td>${product.backCamera}</td>
                <td>${product.frontCamera}</td>
                <td>
                    <img src="${product.img}" width="60" alt="${product.name}" />
                </td>
                <td>${product.desc}</td>
                <td>${product.type}</td>
                <td>
                    <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="handleEdit('${product.id}')">Edit</button>
                    <button class="btn btn-danger" onclick="handleDelete('${product.id}')">Delete</button>
                </td>
            </tr>`
    });

    getEleid('tblDanhSachSP').innerHTML = content;
}

const getListProduct = (searchTerm = "", sortOrder = "") => {
  const promise = api.fetchData();

  promise
    .then((result) => {
      let data = result.data;

      if (searchTerm) {
        data = data.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (sortOrder) {
        data.sort((a, b) => {
          if (sortOrder === "asc") return a.price - b.price;
          if (sortOrder === "desc") return b.price - a.price;
        });
      }

      renderProduct(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

document.getElementById("searchInput").addEventListener("input", (e) => {
  const searchTerm = e.target.value;
  getListProduct(searchTerm);
});

const sortProducts = (order) => {
  getListProduct("", order);
};
window.sortProducts = sortProducts;

const validateProduct = (name, price, screen, backCamera, frontCamera, img, desc, type) => {
  if (!name || !price || !screen || !backCamera || !frontCamera || !img || !desc || !type) {
    alert("All fields are required!");
    return false;
  }
  if (isNaN(price) || price <= 0) {
    alert("Price must be a positive number!");
    return false;
  }
  return true;
};

const validateModalForm = () => {
  const name = getEleid('TenSP').value;
  const price = getEleid('GiaSP').value;
  const screen = getEleid('ManHinhSP').value;
  const backCamera = getEleid('CameraSauSP').value;
  const frontCamera = getEleid('CameraTruocSP').value;
  const img = getEleid('HinhSP').value;
  const desc = getEleid('MoTa').value;
  const type = getEleid('LoaiSP').value;
  const validTypes = ["Samsung", "Iphone"];

  let isValid = true;

  const nameError = validateName(name);
  if (nameError) {
    getEleid('TenSPError').innerText = nameError;
    getEleid('TenSPError').style.display = 'block';
    isValid = false;
  } else {
    getEleid('TenSPError').style.display = 'none';
  }

  const priceError = validatePrice(price);
  if (priceError) {
    getEleid('GiaSPError').innerText = priceError;
    getEleid('GiaSPError').style.display = 'block';
    isValid = false;
  } else {
    getEleid('GiaSPError').style.display = 'none';
  }

  const screenError = validateScreen(screen);
  if (screenError) {
    getEleid('ManHinhSPError').innerText = screenError;
    getEleid('ManHinhSPError').style.display = 'block';
    isValid = false;
  } else {
    getEleid('ManHinhSPError').style.display = 'none';
  }

  const backCameraError = validateBackCamera(backCamera);
  if (backCameraError) {
    getEleid('CameraSauSPError').innerText = backCameraError;
    getEleid('CameraSauSPError').style.display = 'block';
    isValid = false;
  } else {
    getEleid('CameraSauSPError').style.display = 'none';
  }

  const frontCameraError = validateFrontCamera(frontCamera);
  if (frontCameraError) {
    getEleid('CameraTruocSPError').innerText = frontCameraError;
    getEleid('CameraTruocSPError').style.display = 'block';
    isValid = false;
  } else {
    getEleid('CameraTruocSPError').style.display = 'none';
  }

  const imgError = validateImage(img);
  if (imgError) {
    getEleid('HinhSPError').innerText = imgError;
    getEleid('HinhSPError').style.display = 'block';
    isValid = false;
  } else {
    getEleid('HinhSPError').style.display = 'none';
  }

  const descError = validateDescription(desc);
  if (descError) {
    getEleid('MoTaError').innerText = descError;
    getEleid('MoTaError').style.display = 'block';
    isValid = false;
  } else {
    getEleid('MoTaError').style.display = 'none';
  }

  const typeError = validateType(type, validTypes);
  if (typeError) {
    getEleid('LoaiSPError').innerText = typeError;
    getEleid('LoaiSPError').style.display = 'block';
    isValid = false;
  } else {
    getEleid('LoaiSPError').style.display = 'none';
  }

  return isValid;
};

const handleDelete = (id) => {
   const promise =  api.deleteDataById(id);
   promise
        .then((result) => {
            console.log(result.data)
            alert(`Delete ${result.data.id} success!!`);
            //renderProduct(result.data);
            getListProduct();
        })
        .catch((error) => {
            console.log(error);
        });
}
window.handleDelete = handleDelete;

getListProduct();

getEleid('btnThemSP').addEventListener('click', () => {
    //update tiltle modal
    document.getElementsByClassName('modal-title')[0].innerHTML = "Add Product";
    // create button "Add Product" => footer modal
    const btnAdd = document.getElementsByClassName('modal-footer')[0].innerHTML = `
        <button class="btn btn-success" onclick="handleAdd()">Add</button>
    `;
});

const clearModalInputs = () => {
  getEleid('TenSP').value = '';
  getEleid('GiaSP').value = '';
  getEleid('ManHinhSP').value = '';
  getEleid('CameraSauSP').value = '';
  getEleid('CameraTruocSP').value = '';
  getEleid('HinhSP').value = '';
  getEleid('MoTa').value = '';
  getEleid('LoaiSP').value = '';
};

const handleAdd = () => {
  if (!validateModalForm()) return;

  //dom toi cac the input lay value   
  const name = getEleid('TenSP').value;
  const price = getEleid('GiaSP').value;
  const screen = getEleid('ManHinhSP').value;
  const backCamera = getEleid('CameraSauSP').value;
  const frontCamera = getEleid('CameraTruocSP').value;
  const img = getEleid('HinhSP').value;
  const desc = getEleid('MoTa').value;
  const type = getEleid('LoaiSP').value;

  if (!validateProduct(name, price, screen, backCamera, frontCamera, img, desc, type)) return;

  // tao ra object moi
  const product = new Product("", name, price, screen, backCamera, frontCamera, img, desc, type);
  
  // call api add product
  const promise = api.addData(product);
  promise
      .then((result) => {
          console.log(result.data)
          alert(`Add ${result.data.name} success!!`);
          getListProduct();
          clearModalInputs();
          document.getElementsByClassName('close')[0].click();
      })
      .catch((error) => {
          console.log(error);
      });
};
window.handleAdd = handleAdd;

const handleEdit = (id) => {
//update title modal
 document.getElementsByClassName('modal-title')[0].innerHTML = "Edit Product";

 // create button "Update" => footer modal
    const btnUpdate = document.getElementsByClassName('modal-footer')[0].innerHTML = `
        <button class="btn btn-success" onclick="handleUpdate('${id}')">Update</button>
    `;
// call api get product by id
    const promise = api.getDataById(id);
    promise
        .then((result) => {
            const {data} = result;
            //dom toi cac the input gan value
            getEleid('TenSP').value = data.name;
            getEleid('GiaSP').value = data.price;
            getEleid('ManHinhSP').value = data.screen;
            getEleid('CameraSauSP').value = data.backCamera;
            getEleid('CameraTruocSP').value = data.frontCamera;
            getEleid('HinhSP').value = data.img;
            getEleid('MoTa').value = data.desc;
            getEleid('LoaiSP').value = data.type;

            //close modal
            document.getElementsByClassName('close')[0].click();
        })
        .catch((error) => {
            console.log(error);
        });       
}
window.handleEdit = handleEdit;

const handleUpdate = (id) => {
  if (!validateModalForm()) return;

  const name = getEleid('TenSP').value;
  const price = getEleid('GiaSP').value;
  const screen = getEleid('ManHinhSP').value;
  const backCamera = getEleid('CameraSauSP').value;
  const frontCamera = getEleid('CameraTruocSP').value;
  const img = getEleid('HinhSP').value;
  const desc = getEleid('MoTa').value;
  const type = getEleid('LoaiSP').value;

  if (!validateProduct(name, price, screen, backCamera, frontCamera, img, desc, type)) return;

  // tao ra object moi
  const product = new Product(id, name, price, screen, backCamera, frontCamera, img, desc, type);
  
  // call api add product
  const promise = api.updateData(product);
  promise
      .then((result) => {
          console.log(result.data)
          alert(`Update ${result.data.name} success!!`);
          getListProduct();
          clearModalInputs();
          document.getElementsByClassName('close')[0].click();
      })
      .catch((error) => {
          console.log(error);
      });
}
window.handleUpdate = handleUpdate;