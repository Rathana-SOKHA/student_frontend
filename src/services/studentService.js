import api from "./api";

export default {
  getAll() {
    return api.get("/students");
  },

  getOne(id) {
    return api.get(`/students/${id}`);
  },

  create(data) {
    return api.post("/students", data);
  },

  update(id, data) {
    return api.put(`/students/${id}`, data);
  },

  delete(id) {
    return api.delete(`/students/${id}`);
  },
};