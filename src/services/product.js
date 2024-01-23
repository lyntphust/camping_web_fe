import api from "./baseApi";
import apiImg from "./baseApiImg";
const productApi = {
  getListProducts() {
    return api.get("/product");
  },
  getProduct(id) {
    return api.get(`/product/${id}`);
  },
  getListProductsByCategory(categoryId) {
    return api.get(`/products/${categoryId}`);
  },
  postProduct(data) {
    return apiImg.post("/product", data);
  },
  updateProduct(id, param) {
    return apiImg.put(`/product/${id}`, param);
  },
  deleteProduct(id) {
    return api.delete(`/product/${id}`);
  },
};

export default productApi;
