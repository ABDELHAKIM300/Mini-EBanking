import {Component} from "react";
import {Formik} from "formik";
import {signUpAction} from "../Redux/ActionCreators";
import {connect} from "react-redux";

class RegisterComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
        };
    };

    handleSubmit = (values) => {
        const data = {
            "login": values.login,
            "password": values.password,
            "fullNuame": values.fullNuame,
        };
        this.props
            .dispatch(signUpAction(data))
            .then(data => {
                this.setState({
                    error: null,
                })
            })
            .catch(err => {
                this.setState({
                    error: err.message
                })
                console.log(err);
            });
    };

    render() {
        return (
            <div className={"login_form"}>
                <Formik
                    initialValues={{fullNuame: '', login: '', password: ''}}
                    validate={values => {
                        const errors = {};
                        if (!values.fullNuame) {
                            errors.fullNuame = 'Required';
                        }
                        if (!values.login) {
                            errors.login = 'Required';
                        }
                        if (!values.password) {
                            errors.password = 'Required';
                        }
                        return errors;
                    }}
                    onSubmit={(values, {setSubmitting}) => {
                        setTimeout(() => {
                            setSubmitting(false);
                            this.handleSubmit(values);
                        }, 400);
                    }}
                >
                    {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          isSubmitting,
                          /* and other goodies */
                      }) => (
                        <form onSubmit={handleSubmit}>
                            <p>{this.state.error}</p>
                            <label htmlFor="fullNuame">Full Name </label>
                            <input
                                id="fullNuame"
                                type="text"
                                name="fullNuame"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.fullNuame}
                                placeholder="Full Name"
                            />
                            <p>{errors.fullNuame && touched.fullNuame && errors.fullNuame}</p>
                            <label htmlFor="login">Login</label>
                            <input
                                id="login"
                                type="text"
                                name="login"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.login}
                                placeholder="Login"
                            />
                            <p>{errors.login && touched.login && errors.login}</p>
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                placeholder="Password"
                            />
                            <p>{errors.password && touched.password && errors.password}</p>
                            <button type="submit" disabled={isSubmitting}>
                                Sign Up
                            </button>
                        </form>
                    )}
                </Formik>
            </div>
        );
    }
}

const mapStateToProps = state => ({session: state.session});
export default connect(mapStateToProps)(RegisterComponent);
