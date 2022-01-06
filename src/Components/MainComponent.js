import {Component} from "react";
import {Route, Switch, withRouter} from 'react-router-dom';
import LogInComponent from "./LogInComponent";
import {connect} from "react-redux";
import RegisterComponent from "./RegisterComponent";
import HomeComponent from "./HomeComponent";
import {AppBar, Box, Button, IconButton, Toolbar, Typography} from "@mui/material";
import MakeTransferComponent from "./MakeTransferComponent";
import HistoryTransferComponent from "./HistoryTransferComponent";

class MainComponent extends Component {

    render() {
        return (
            <div>
                <Box sx={{flexGrow: 1}}>
                    <AppBar>
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{mr: 2}}
                            >
                                {/*<MenuIcon/>*/}
                            </IconButton>
                            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                                EBanking
                            </Typography>
                            {/*<Button color="inherit">Login</Button>*/}
                        </Toolbar>
                    </AppBar>
                </Box>
                <Toolbar />
                <Switch>
                    <Route exact path="/inscription" component={RegisterComponent}/>
                    <Route exact path="/home" component={HomeComponent}/>
                    <Route exact path="/maketransfer" component={MakeTransferComponent}/>
                    <Route exact path="/historytransfer" component={HistoryTransferComponent}/>
                    <Route path="/" component={LogInComponent}/>
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = state => ({session: state.session});
export default connect(mapStateToProps)(withRouter(MainComponent));