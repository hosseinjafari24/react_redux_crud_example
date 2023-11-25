import { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "../../common/with-router";
import User from "../../models/user";
import Swal from "sweetalert2";
import { updateUser,getUserById } from "../../actions/user.action";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { userStoreValidation } from "./validations/user.store.validation";
class EditUser extends Component<any , any> {
    constructor(props : any) {
	  super(props);
	  this.store = this.store.bind(this);
	  
	  this.state = {
		currentUser : {
		    id : null,
		    name : '',
		    username : '',
		    email : '',
		    website : ''
		}
	  }
    }
    
    componentDidMount() {
	  const id = this.props.router.params.id;
	  this.getPost(+id);
    }
    
    getPost(id:number) {
	  this.props.getUserById(id).unwrap().then((data : User) => {
		console.log(data)
		this.setState({
		    currentUser: data,
		});
	  }).catch((e : any) => {
		console.log(e);
	  })
    }
    
    store(valuse : any) {
	  const {currentUser} = this.state;
	  const user : User = {
		id : currentUser.id,
		name : valuse.name,
		username : valuse.username,
		email : valuse.email,
		website : valuse.website,
	  };
	  this.props.updateUser(user).unwrap().then((data : any) => {
		const Toast = Swal.mixin({
		    toast: true,
		    position: "top-end",
		    showConfirmButton: false,
		    timer: 3000,
		    timerProgressBar: true,
		    didOpen: (toast) => {
			  toast.onmouseenter = Swal.stopTimer;
			  toast.onmouseleave = Swal.resumeTimer;
		    }
		});
		Toast.fire({
		    icon: "success",
		    title: "update successfully!"
		});
		this.props.router.navigate('/users');
	  }).catch((e : any) => {
		console.log(e);
	  });
    }
    
    render() {
	  const {currentUser} = this.state;

	  
	  return (
		  <>
			{currentUser ? (
			<div className="container">
			    <Formik enableReinitialize={true} initialValues={currentUser}
					validationSchema={toFormikValidationSchema(userStoreValidation)}
					onSubmit={values => this.store(values)}>
				  {({ errors, touched, resetForm }) => (
					 
					  <Form>
						<div className="row">
						    <div className="col-lg-6">
							  <div className="form-group">
								<label htmlFor="">Name</label>
								<Field name="name" type="text"
									 className={ 'form-control' + (errors.name && touched.name ? ' is-invalid' : '')}
								/>
								<ErrorMessage name="name" component="div" className="invalid-feedback"/>
							  </div>
						    </div>
						    <div className="col-lg-6">
							  <div className="form-group">
								<label htmlFor="">User Name</label>
								<Field name="username" type="text"
									 className={ 'form-control' + (errors.username && touched.username ? ' is-invalid' : '')}
								/>
								<ErrorMessage name="username" component="div" className="invalid-feedback"/>
							  </div>
						    </div>
						</div>
						<div className="row">
						    <div className="col-lg-6">
							  <div className="form-group">
								<label htmlFor="">Email</label>
								<Field name="email" type="text"
									 className={ 'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}
								/>
								<ErrorMessage name="email" component="div" className="invalid-feedback"/>
							  </div>
						    </div>
						    <div className="col-lg-6">
							  <div className="form-group">
								<label htmlFor="">Website</label>
								<Field name="website" type="text"
									 className={ 'form-control' + (errors.website && touched.website ? ' is-invalid' : '')}
								/>
								<ErrorMessage name="website" component="div" className="invalid-feedback"/>
							  </div>
						    </div>
						</div>
						<div className="row mt-3">
						    <div className="col-lg-12">
							  <button type="submit" className="btn btn-outline-success">Update</button>
						    </div>
						</div>
					  </Form>
				  )}
			    </Formik>
			</div>
			): (
				<div>
				    <br />
				</div>
			)}
		  </>
	  );
    }
}

export default connect(null,{ updateUser,getUserById })(withRouter(EditUser));
