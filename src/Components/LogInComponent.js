import {Component} from "react";
import {Formik} from 'formik';
import {loginAction} from "../Redux/ActionCreators";
import {connect} from "react-redux";
import "../Assets/Styles/login.css";

class LogInComponent extends Component {

    handleSubmit = (values) => {
        const data = {
            "login": values.login,
            "password": values.password,
        };
        this.props
            .dispatch(loginAction(data))
            .then(data => {
                console.log(data.payload.data);
            })
            .catch(err => {
                console.log("err", err);
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
                                Submit
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
