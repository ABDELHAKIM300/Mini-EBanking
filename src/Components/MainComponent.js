import {Component} from "react";
import {Route, Switch, withRouter} from 'react-router-dom';
import LogInComponent from "./LogInComponent";
import {connect} from "react-redux";
import RegisterComponent from "./RegisterComponent";

class MainComponent extends Component {

    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/inscription" component={RegisterComponent}/>
                    <Route  path="/" component={LogInComponent}/>
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = state => ({session: state.session});
export default connect(mapStateToProps)(withRouter(MainComponent));