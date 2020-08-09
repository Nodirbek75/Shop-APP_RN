export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

export const deleteProduct = (id) => {
  return {
    type: DELETE_PRODUCT,
    productId: id,
  };
};

export const createProduct = (title, imgUrl, description, price) => {
  return {
    type: CREATE_PRODUCT,
    productDetails: {
      title,
      imgUrl,
      description,
      price,
    },
  };
};

export const updateProduct = (productId, title, imgUrl, description) => {
  return {
    type: UPDATE_PRODUCT,
    productDetails: {
      productId,
      title,
      imgUrl,
      description,
    },
  };
};
