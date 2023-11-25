import { Component } from "react";
import { connect } from "react-redux";
import { updatePost, deletePost } from "../../slices/posts";
import PostService from "../../services/post.service";
import { withRouter } from '../../common/with-router';

class Post extends Component<any,any> {
    constructor(props:any) {
	  super(props);
	  this.onChangeTitle = this.onChangeTitle.bind(this);
	  this.onChangeDescription = this.onChangeDescription.bind(this);
	  this.getPost = this.getPost.bind(this);
	  this.updateContent = this.updateContent.bind(this);
	  this.removePost = this.removePost.bind(this);
	  
	  this.state = {
		currentPost: {
		    id: null,
		    title: "",
		    body: "",
		    userId: null,
		},
		message: "",
	  };
    }
    componentDidMount() {
	  this.getPost(this.props.router.params.id);
    }
    onChangeTitle(e:any) {
	  const title = e.target.value;
	  
	  this.setState(function (prevState:any) {
		return {
		    currentPost: {
			  ...prevState.currentPost,
			  title: title,
		    },
		};
	  });
    }
    onChangeDescription(e:any) {
	  const body = e.target.value;
	  
	  this.setState((prevState:any) => ({
		currentPost: {
		    ...prevState.currentPost,
		    body: body,
		},
	  }));
    }
    getPost(id:number) {
	  PostService.get(id)
		  .then((response:any) => {
			this.setState({
			    currentPost: response.data,
			});
			console.log(response.data);
		  })
		  .catch((e) => {
			console.log(e);
		  });
    }
    
    updateContent() {
	  this.props
		  .updatePost({ id: this.state.currentPost.id, data: this.state.currentPost })
		  .unwrap()
		  .then((reponse:any) => {
			console.log(reponse);
			
			this.setState({ message: "The post was updated successfully!" });
		  })
		  .catch((e:any) => {
			console.log(e);
		  });
    }
    removePost() {
	  this.props
		  .deletePost({ id: this.state.currentPost.id })
		  .then(() => {
			this.props.router.navigate('/posts');
		  })
		  .catch((e:any) => {
			console.log(e);
		  });
    }
    render() {
	  const { currentPost } = this.state;
	  
	  return(
		  <div>
			{currentPost ? (
				<div className="edit-form">
				    <h4>Post</h4>
				    <form>
					  <div className="form-group">
						<label htmlFor="title">Title</label>
						<input
							type="text"
							className="form-control"
							id="title"
							value={currentPost.title}
							onChange={this.onChangeTitle}
						/>
					  </div>
					  <div className="form-group">
						<label htmlFor="description">Description</label>
						<input
							type="text"
							className="form-control"
							id="description"
							value={currentPost.body}
							onChange={this.onChangeDescription}
						/>
					  </div>
				    </form>
				    
				    <button className="btn btn-danger btn-sm mr-2"
					    onClick={this.removePost}>
					  Delete
				    </button>
				    
				    <button type="submit" className="btn btn-primary btn-sm"
					    onClick={this.updateContent}>
					  Update
				    </button>
				    <p>{this.state.message}</p>
				</div>
			) : (
				<div>
				    <br />
				    <p>Please click on a Post...</p>
				</div>
			)}
		  </div>
	  );
    };
}

export default connect(null, { updatePost, deletePost })(withRouter(Post));


