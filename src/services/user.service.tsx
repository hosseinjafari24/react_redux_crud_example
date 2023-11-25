
import http from "../common/http-client";
import User from "../models/user";

class UserService {
    getAll() {
	  return http.get("/users");
    }
    
    get(id : number) {
	  return http.get(`/users/${id}`);
    }
    
    create(data : User) {
	  return http.post("/users", data);
    }
    
    update(id : number = 1, data : User) {
	  return http.put(`/users/${data.id}`, data);
    }
    
    delete(id : number) {
	  return http.delete(`/users/${id}`);
    }
}

export default new UserService();

