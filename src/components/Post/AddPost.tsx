import { Component } from "react";
import { connect } from "react-redux";
import { createPost } from "../../slices/posts";
import Post from "../../models/post";

class AddPost extends Component<any,any> {
    constructor(props:any) {
	  super(props);
	  this.onChangeTitle = this.onChangeTitle.bind(this);
	  this.onChangeDescription = this.onChangeDescription.bind(this);
	  this.savePost = this.savePost.bind(this);
	  this.newPost = this.newPost.bind(this);
	  
	  this.state = {
		id: null,
		title: "",
		body: "",
		userId: null
	  };
    }
    
    onChangeTitle(e : any) : void {
	  this.setState({
		title : e.target.value,
	  });
    }
    
    onChangeDescription(e : any) : void {
	  this.setState({
		body : e.target.value,
	  });
    }
   
    savePost() {
	  const { title, body } = this.state;
	  
	   this.props
		  .createPost({ title, body })
		  .unwrap()
		  .then((data:Post) => {
			this.setState({
			    id: data.id,
			    title: data.title,
			    body : data.body,
			    userId: data.userId
			});
			console.log(data);
		  })
		  .catch((e:any) => {
			console.log(e);
		  });
    }
  
    newPost() {
	  this.setState({
		id: null,
		title: "",
		body: "",
		userId: null
	  });
    }

    render() {
	  return(
		  <div className="submit-form">
			{this.state.submitted ? (
				<div>
				    <h4>You submitted successfully!</h4>
				    <button className="btn btn-success" onClick={this.newPost}>
					  Add
				    </button>
				</div>
			) : (
				<div>
				    <div className="form-group">
					  <label htmlFor="title">Title</label>
					  <input
						  type="text"
						  className="form-control"
						  id="title"
						  required
						  value={this.state.title}
						  onChange={this.onChangeTitle}
						  name="title"
					  />
				    </div>
				    
				    <div className="form-group">
					  <label htmlFor="description">Description</label>
					  <input
						  type="text"
						  className="form-control"
						  id="description"
						  required
						  value={this.state.description}
						  onChange={this.onChangeDescription}
						  name="description"
					  />
				    </div>
				    
				    <button onClick={this.savePost} className="btn btn-success">
					  Submit
				    </button>
				</div>
			)}
		  </div>
	  )
    };
}

export default connect(null, { createPost })(AddPost);
