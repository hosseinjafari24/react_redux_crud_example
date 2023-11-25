import React, { Component } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { deleteUser, retrieveUsers } from "../../actions/user.action";
import User from "../../models/user";

import "bootstrap-icons/font/bootstrap-icons.min.css";

class UsersList extends Component<any , any> {
    constructor(props : any) {
	  super(props);
	  this.removeUser = this.removeUser.bind(this);
    }
    
    componentDidMount() {
	  this.props.retrieveUsers();
    }
    
    removeUser(user : User):void {
	  this.props.deleteUser(user.id)
		  .then(() => {
			this.props.router.navigate('/users');
		  }).catch((e:any) => {
			console.log(e);
		  });
    }
    
    render() {
	  const { users } = this.props;
	  return (
		  <>
			<div className="container">
			    <div className="row">
				  <div className="col-lg-12">
					<Link to={"/users/new"} className="btn btn-outline-success" data-cy="create-user-link">Add User</Link>
				  </div>
			    </div>
			    
			    <div className="row mt-3">
				  <div className="col-lg-12">
					<table className="table table-bordered">
					    <thead>
					    <tr>
						  <th>Row</th>
						  <th>Name</th>
						  <th>Username</th>
						  <th>Email</th>
						  <th>Website</th>
						  <th>Actions</th>
					    </tr>
					    </thead>
					    <tbody>
					    {users && users.map((user:User,index:number) => (
						    <tr key={index}>
							  <td>{user.id}</td>
							  <td>{user.name}</td>
							  <td>{user.username}</td>
							  <td>{user.email}</td>
							  <td>{user.website}</td>
							  <td>
								<Link to={`/users/${user.id}/edit`} className="btn btn-primary btn-sm me-1">
								    <i className="bi bi-pencil"></i>
								</Link>

								<button className="btn btn-danger btn-sm ms-1" onClick={() => this.removeUser(user)}>
								    <i className="bi bi-trash3"></i>
								</button>
							  </td>
						    </tr>
					    ))}
					    </tbody>
					</table>
				  </div>
			    </div>
			</div>
		  </>
	  );
    }
}

const mapStateToProps = (state:any) => {
    return { users: state.users };
}

export default connect(mapStateToProps, {retrieveUsers, deleteUser})(UsersList);
