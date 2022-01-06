import {Component} from "react";
import {Formik} from 'formik';
import {loginAction} from "../Redux/ActionCreators";
import {connect} from "react-redux";
import "../Assets/Styles/login.css";

class LogInComponent extends Component {
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
        };
        this.props
            .dispatch(loginAction(data))
            .then(data => {
                this.setState({
                    error: null,
                });
            })
            .catch(err => {
                const message = err.response ? err.response.data.data.errorMessage : err.message;
                this.setState({
                    error: message
                });
            });
    };

    render() {
        return (
            <div className={"login_form"}>
                <Formik
                    initialValues={{login: '', password: ''}}
                    validate={values => {
                        const errors = {};
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
                                Sign In
                            </button>
                        </form>
                    )}
                </Formik>
            </div>
        );
    }
}

const mapStateToProps = state => ({session: state.session});
export default connect(mapStateToProps)(LogInComponent);
