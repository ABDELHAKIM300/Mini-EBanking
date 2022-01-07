import {Component} from "react";
import {getAccountsAction} from "../Redux/ActionCreators";
import {connect} from "react-redux";
import {Box, Card, CardActionArea, CardContent, Typography} from "@mui/material";
import "../Assets/Styles/home.css"
import HistoryIcon from '@mui/icons-material/History';
import SyncAltIcon from '@mui/icons-material/SyncAlt';

class HomeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.session.user,
            isLoaded: false,
        };
    };

    componentDidMount() {
        this.props.dispatch(getAccountsAction(this.state.user.id)) // get the list of accounts
            .then(data => {
                this.setState({
                    isLoaded: true,
                });
            }).catch(err => {
            console.log(err);
            this.setState({
                isLoaded: true,
            });
        })
    }
    displayAccount = (account) => {
        return (
            <Card sx={{width: 400}}>
                <CardActionArea>
                    <CardContent>
                        <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                            {account.libelle}
                        </Typography>

                        <Typography sx={{mb: 1.5}} color="text.secondary">
                            {account.accountNumber}
                        </Typography>
                        <Typography variant="body2">
                            {account.solde} MAD
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        );
    }

    navigateToPath = (path) => {
        this.props.history.push(path);
    }

    render() {
        const accounts = this.props.data.accounts;
        const isLoaded = this.state.isLoaded;
        return (
            <div className="root">
                <div className="profile">
                    <div className="welcome">Welcome {this.props.session.user.fullNuame}</div>
                    <div className={"card"}>
                        <Card className={"cardButton"}>
                            <CardActionArea onClick={() => this.navigateToPath("transfer")} sx={{display: 'flex'}}>
                                <Box sx={{display: 'flex', marginBlock: 'auto', alignItems: 'center'}}>
                                    <CardContent sx={{flex: '1 0 auto'}}>
                                        <Typography style={{"margin": "auto"}} component="div" variant="h5">
                                            Make a Transfer
                                        </Typography>
                                    </CardContent>
                                </Box>
                                <SyncAltIcon className={"historyIcon"}/>
                            </CardActionArea>
                        </Card>
                        <Card className={"cardButton"}>
                            <CardActionArea onClick={() => this.navigateToPath("history")}
                                            sx={{display: 'flex'}}>
                                <Box sx={{display: 'flex', marginBlock: 'auto', alignItems: 'center'}}>
                                    <CardContent sx={{flex: '1 0 auto'}}>
                                        <Typography style={{"margin": "auto"}} component="div" variant="h5">
                                            Transfer History
                                        </Typography>
                                    </CardContent>
                                </Box>
                                <HistoryIcon className={"historyIcon"}/>
                            </CardActionArea>
                        </Card>
                    </div>
                </div>
                <div className="accounts">
                    {accounts.length > 0 ?
                        <>
                            <h1>My Accounts</h1>
                            {
                                accounts.map(account => {
                                    return (this.displayAccount(account))
                                })
                            }
                        </>
                        : isLoaded && <h1>You don't have an <br/>account yet</h1>
                    }

                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({session: state.session, data: state.data});
export default connect(mapStateToProps)(HomeComponent);
