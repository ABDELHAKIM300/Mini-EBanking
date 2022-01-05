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
        };
    };

    componentDidMount() {
        this.props.dispatch(getAccountsAction(this.state.user.id))
            .then(data => {
                console.log(data.payload.data);
            }).catch(err => {
            console.log(err);
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


    render() {
        const accounts = this.props.data.accounts;
        return (
            <div className="root">
                <div className="profile">
                    <div className="welcome">Welcome {this.props.session.user.fullNuame}</div>
                    <div className={"card"}>
                        <Card className={"cardButton"}>
                            <CardActionArea sx={{display: 'flex'}}>
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
                            <CardActionArea sx={{display: 'flex'}}>
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
                    <h1>My Accounts</h1>
                    {
                        accounts.map(account => {
                            return (this.displayAccount(account))
                        })
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({session: state.session, data: state.data});
export default connect(mapStateToProps)(HomeComponent);
