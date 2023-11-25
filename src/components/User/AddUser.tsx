import { Component } from "react";

import { Formik, Field, Form, ErrorMessage } from 'formik';
import { toFormikValidationSchema } from "zod-formik-adapter";
import { userStoreValidation } from "./validations/user.store.validation";
import { connect } from "react-redux";
import { createUser } from "../../actions/user.action";
import User from "../../models/user";
import Swal from 'sweetalert2';
import { withRouter } from "../../common/with-router";

class AddUser extends Component<any , any> {
    constructor(props : any) {
	  super(props);
	  this.store = this.store.bind(this);
    }
    
    store(valuse : any) {
	  const user : User = {
		id : 0,
		name : valuse.name,
		username : valuse.username,
		email : valuse.email,
		website : valuse.website,
	  };
	  this.props.createUser(user).unwrap().then((data : any) => {
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
		    title: "User information register successfully!"
		});
		this.props.router.navigate('/users');
	  }).catch((e : any) => {
		console.log(e);
	  });
    }
    render() {
	  const initialValues = {
		name : '',
		username : '',
		email : '',
		website : ''
	  };
	  
	  return (
		  <>
			<div className="container">
			    <Formik initialValues={initialValues}
					validationSchema={toFormikValidationSchema(userStoreValidation)}
					onSubmit={values => this.store(values)}>
				  {({ errors, touched, resetForm }) => (
				  <Form>
					<div className="row">
					    <div className="col-lg-6">
						  <div className="form-group">
							<label htmlFor="">Name</label>
							<Field name="name" type="text" data-cy="name-input"
								className={ 'form-control' + (errors.name && touched.name ? ' is-invalid' : '')}
							/>
							<ErrorMessage name="name" component="div" className="invalid-feedback" data-cy="name-input-validation-message"/>
						  </div>
					    </div>
					    <div className="col-lg-6">
						  <div className="form-group">
							<label htmlFor="">User Name</label>
							<Field name="username" type="text" data-cy="username-input"
								 className={ 'form-control' + (errors.username && touched.username ? ' is-invalid' : '')}
							/>
							<ErrorMessage name="username" component="div" className="invalid-feedback" data-cy="username-input-validation-message"/>
						  </div>
					    </div>
					</div>
					<div className="row">
					    <div className="col-lg-6">
						  <div className="form-group">
							<label htmlFor="">Email</label>
							<Field name="email" type="text" data-cy="email-input"
								 className={ 'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}
							/>
							<ErrorMessage name="email" component="div" className="invalid-feedback" data-cy="email-input-validation-message"/>
						  </div>
					    </div>
					    <div className="col-lg-6">
						  <div className="form-group">
							<label htmlFor="">Website</label>
							<Field name="website" type="text" data-cy="website-input"
								 className={ 'form-control' + (errors.website && touched.website ? ' is-invalid' : '')}
							/>
							<ErrorMessage name="website" component="div" className="invalid-feedback" data-cy="website-input-validation-message"/>
						  </div>
					    </div>
					</div>
					<div className="row mt-3">
					    <div className="col-lg-12">
						  <button type="submit" className="btn btn-outline-success" data-cy="btn-submit">Register</button>
						  {/*<button type="button" onClick={resetForm} className="btn btn-outline-warning float-right">*/}
							{/*Reset*/}
						  {/*</button>*/}
					    </div>
					</div>
				  </Form>
				  )}
			    </Formik>
			</div>
		  </>
	  );
    }
}


export default connect(null, { createUser })(withRouter(AddUser));
