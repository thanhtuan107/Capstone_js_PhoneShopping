const validateName = (name) => {
  if (!name || name.length > 100) {
    return "Tên sản phẩm không hợp lệ! Tối đa 100 ký tự.";
  }
  return "";
};

const validatePrice = (price) => {
  if (!price || isNaN(price) || price <= 0) {
    return "Giá không hợp lệ! Phải là số và lớn hơn 0.";
  }
  return "";
};

const validateScreen = (screen) => {
  if (!screen || screen.length > 50) {
    return "Màn hình không hợp lệ! Tối đa 50 ký tự.";
  }
  return "";
};

const validateBackCamera = (backCamera) => {
  if (!backCamera || backCamera.length > 50) {
    return "Camera sau không hợp lệ! Tối đa 50 ký tự.";
  }
  return "";
};

const validateFrontCamera = (frontCamera) => {
  if (!frontCamera || frontCamera.length > 50) {
    return "Camera trước không hợp lệ! Tối đa 50 ký tự.";
  }
  return "";
};

const validateImage = (img) => {
  const urlPattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg))$/i;
  const filePattern = /\.(png|jpg|jpeg)$/i;
  if (!img || (!urlPattern.test(img) && !filePattern.test(img))) {
    return "Hình ảnh không hợp lệ! Gán link ảnh hoặc file định dạng hình ảnh (.png, .jpg, .jpeg).";
  }
  return "";
};

const validateDescription = (desc) => {
  if (desc.length > 500) {
    return "Mô tả không hợp lệ! Tối đa 500 ký tự.";
  }
  return "";
};

const validateType = (type, validTypes) => {
  if (!type || !validTypes.includes(type)) {
    return "Loại không hợp lệ!";
  }
  return "";
};

export {
  validateName,
  validatePrice,
  validateScreen,
  validateBackCamera,
  validateFrontCamera,
  validateImage,
  validateDescription,
  validateType
};
