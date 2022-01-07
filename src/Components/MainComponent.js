import {Component} from "react";
import {Route, Switch, withRouter, Link} from 'react-router-dom';
import LogInComponent from "./LogInComponent";
import {connect} from "react-redux";
import RegisterComponent from "./RegisterComponent";
import HomeComponent from "./HomeComponent";
import {AppBar, Box, Button, IconButton, Toolbar, Typography} from "@mui/material";
import MakeTransferComponent from "./MakeTransferComponent";
import HistoryTransferComponent from "./HistoryTransferComponent";
import {logoutAction} from "../Redux/ActionCreators";

class MainComponent extends Component {
    handleLogout = () => {
        this.props.dispatch(logoutAction()); // to clear state and storage of user data
    }
    navigateToPath = (path) => {
        this.props.history.push(path);
    }

    render() {
        const authenticated = this.props.session.authenticated;
        return (
            <div>
                <Box sx={{flexGrow: 1}}>
                    <AppBar className={"appBar"}>
                        <Toolbar>
                            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                                <Link to={"/"}>EBanking</Link>
                            </Typography>
                            {
                                authenticated ?
                                    <Button color="inherit" onClick={this.handleLogout}>Logout</Button>
                                    :
                                    <>
                                        <Button color="inherit" onClick={() => this.navigateToPath("")}>Sign In</Button>
                                        <Button color="inherit" onClick={() => this.navigateToPath("signup")}>Sign Up</Button>
                                    </>
                            }
                        </Toolbar>
                    </AppBar>
                </Box>
                <Toolbar/>
                {
                    authenticated ?
                        <Switch>
                            <Route exact path="/transfer" component={MakeTransferComponent}/>
                            <Route exact path="/history" component={HistoryTransferComponent}/>
                            <Route path="/" component={HomeComponent}/>
                        </Switch> :
                        <Switch>
                            <Route exact path="/signup" component={RegisterComponent}/>
                            <Route path="/" component={LogInComponent}/>
                        </Switch>
                }

            </div>
        );
    }
}

const mapStateToProps = state => ({session: state.session});
export default connect(mapStateToProps)(withRouter(MainComponent));