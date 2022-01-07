import {Component} from "react";
import {connect} from "react-redux";
import {Formik} from "formik";
import {getAccountsAction, makeTransferAction} from "../Redux/ActionCreators";

class MakeTransferComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            user: this.props.session.user,
        };
    };

    componentDidMount() {
        if (this.props.data.accounts.length === 0) {
            this.props.dispatch(getAccountsAction(this.state.user.id)) //get accounts list
                .then(data => {
                    console.log(data.payload.data);
                }).catch(err => {
                console.log(err);
            })
        }
    }

    handleSubmit = (values, resetForm) => {
        const user_id = this.state.user.id;
        const data = {
            amount: values.amount,
            creditAccount: values.creditAccount,
            debitAccount: values.debitAccount,
            reason: values.reason,
            userId: user_id,
        };
        this.props
            .dispatch(makeTransferAction(data))
            .then(data => {
                this.setState({
                    error: null,
                });
                resetForm({});
                this.props.history.push("/history");
            })
            .catch(err => {
                 // if we have an error with a response we display
                // the message otherwise we display just the error message
                const message = err.response ? err.response.data.data.errorMessage : err.message;
                this.setState({
                    error: message
                });
                resetForm({});
            });
    };
    // getAmountMax return max ammount possible (if the balance is possitive or 0 otherwise )
    getAmountMax = (debitAccount) => {
        let solde = 0;
        if (debitAccount) {
            solde = this.props.data.accounts.filter(account => account.accountNumber === debitAccount)[0].solde;
        }
        return solde < 0 ? 0 : solde;
    }
    handleValidation = values => {
        const errors = {};
        const amountMax = this.getAmountMax(values.debitAccount);
        console.log(this.state.error);
        if (amountMax === 0 && values.debitAccount) {
            this.setState({
                error: "your account balance is insufficient to make this transfer !"
            });
        } else {
            this.setState({
                error: null,
            });
        }
        if (!values.creditAccount) {
            errors.creditAccount = 'Required';
        }
        if (!values.debitAccount) {
            errors.debitAccount = 'Required';
        }
        if (!values.reason) {
            errors.reason = 'Required';
        }
        if (!values.amount || values.amount === 0) {
            errors.amount = 'Enter a valid value';
        }
        return errors;

    }

    render() {
        const accounts = this.props.data.accounts;
        return (
            <div className={"login_form transfer_form"}>
                <Formik
                    initialValues={{amount: 0, creditAccount: '', debitAccount: '', reason: ''}}
                    validate={this.handleValidation}
                    onSubmit={(values, {setSubmitting,resetForm}) => {
                        setTimeout(() => {
                            setSubmitting(false);
                            this.handleSubmit(values,resetForm);
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
                            <label htmlFor="debitAccount">Debit Account</label>
                            <select
                                id="debitAccount"
                                type="text"
                                name="debitAccount"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.debitAccount}
                                placeholder="Debit Account"
                            >
                                <option value={""}></option>
                                {accounts.map(account => {
                                    return (
                                        <option value={account.accountNumber}>
                                            {account.libelle}-{account.accountNumber}
                                        </option>
                                    )
                                })}
                            </select>
                            <p>{errors.debitAccount && touched.debitAccount && errors.debitAccount}</p>
                            <label htmlFor="creditAccount">Credit Account</label>
                            <input
                                id="creditAccount"
                                type="text"
                                name="creditAccount"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.creditAccount}
                                placeholder="Credit Account"
                            />
                            <p>{errors.creditAccount && touched.creditAccount && errors.creditAccount}</p>
                            <label htmlFor="amount">Amount (MAD)</label>
                            <input
                                id="amount"
                                type="number"
                                name="amount"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.amount}
                                placeholder="Amount"
                                min={0}
                                max={this.getAmountMax(values.debitAccount)}
                                step="0.1"
                            />
                            <p>{errors.amount && touched.amount && errors.amount}</p>
                            <label htmlFor="reason">Reason</label>
                            <input
                                id="reason"
                                type="text"
                                name="reason"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.reason}
                                placeholder="Reason"
                            />
                            <p>{errors.reason && touched.reason && errors.reason}</p>
                            <button type="submit" disabled={isSubmitting}>
                                send
                            </button>
                        </form>
                    )}
                </Formik>
            </div>
        );
    }
}

const mapStateToProps = state => ({session: state.session, data: state.data});
export default connect(mapStateToProps)(MakeTransferComponent);
