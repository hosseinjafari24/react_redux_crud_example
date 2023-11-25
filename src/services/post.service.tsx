import http from "../common/http-client";
import Post from "../models/post";

class PostService {
    getAll() {
	  return http.get("/posts");
    }
    
    get(id : number) {
	  return http.get(`/posts/${id}`);
    }
    
    create(data : Post) {
	  return http.post("/posts", data);
    }
    
    update(id : number = 1, data : Post) {
	  return http.put(`/posts/${id}`, data);
    }
    
    delete(id : number) {
	  return http.delete(`/posts/${id}`);
    }
    
    deleteAll() {
	  return http.delete(`/posts`);
    }
    
    findByTitle(title : string) {
	  return http.get(`/posts?title=${title}`);
    }
}

export default new PostService();
