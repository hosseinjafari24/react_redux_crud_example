import { Component } from "react";
import { connect, useSelector } from "react-redux";
import { retrievePosts } from "../../slices/posts";
import { Link } from "react-router-dom";
import Post from "../../models/post";

class PostsList extends Component<any,any> {

    
    constructor(props:any) {
	  super(props);
	  
	  this.state = {
		currentPost: null,
		currentIndex: -1,
		searchTitle: "",
	  };
    }
    componentDidMount() {
	  this.props.retrievePosts();
    }
    
    onChangeSearchTitle(e:any) {
	  const searchTitle = e.target.value;
	  
	  this.setState({
		searchTitle: searchTitle,
	  });
    }
    
    refreshData() {
	  this.setState({
		currentPost: null,
		currentIndex: -1,
	  });
    }
    
    setActivePost(post : Post, index : number) {
	  this.setState({
		currentPost: post,
		currentIndex: index,
	  });
    }
    
    render() {
	  const { searchTitle, currentPost, currentIndex } = this.state;
	  const { posts } = this.props;
	  
	  return(
		  <div className="list row">
			<div className="col-md-9">
			    <div className="input-group mb-3">
				  <input
					  type="text"
					  className="form-control"
					  placeholder="Search by title"
					  value={searchTitle}
					  onChange={this.onChangeSearchTitle}
				  />
				  <div className="input-group-append">
					<button className="btn btn-outline-secondary" type="button">
					    Search
					</button>
				  </div>
			    </div>
			</div>
			<div className="col-md-8">
			    <h4>Posts List</h4>
			    
			    <ul className="list-group">
				  {posts &&
					  posts.map((post:Post, index:number) => (
						  <li
							  className={
								  "list-group-item " + (index === currentIndex ? "active" : "")
							  }
							  onClick={() => this.setActivePost(post, index)}
							  key={index}>
							{post.title}
						  </li>
					  ))}
			    </ul>
			    
			    <button className="m-3 btn btn-sm btn-danger">
				  Remove All
			    </button>
			</div>
			<div className="col-md-4">
			    {currentPost ? (
				    <div>
					  <h4>Post</h4>
					  <div>
						<label>
						    <strong>Title:</strong>
						</label>{" "}
						{currentPost.title}
					  </div>
					  <div>
						<label>
						    <strong>Description:</strong>
						</label>{" "}
						{currentPost.body}
					  </div>
					  
					  <Link to={"/posts/" + currentPost.id} className="btn btn-sm btn-warning">Edit</Link>
				    </div>
			    ) : (
				    <div>
					  <br />
					  <p>Please click on a Post...</p>
				    </div>
			    )}
			</div>
		  </div>
	  );
    };
}
const mapStateToProps = (state:any) => {
    return {
	  posts: state.posts
    };
}
export default connect(mapStateToProps, { retrievePosts })(PostsList);
