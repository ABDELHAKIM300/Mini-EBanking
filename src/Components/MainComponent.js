import {Component} from "react";
import {Route, Switch, withRouter} from 'react-router-dom';
import LogInComponent from "./LogInComponent";
import {connect} from "react-redux";

class MainComponent extends Component {

    render() {
        return (
            <div>
                <Switch>
                    <Route path="/" component={LogInComponent}/>
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = state => ({session: state.session});
export default connect(mapStateToProps)(withRouter(MainComponent));