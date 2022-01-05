import './App.css';
import MainComponent from "./Components/MainComponent";
import {Provider} from "react-redux";
import {ConfigureStore} from "./Redux/ConfigureStore";
import {BrowserRouter} from "react-router-dom";

const store = ConfigureStore()

function App() {
    return (
        <div className={"App"}>
            <Provider store={store}>
                <BrowserRouter>
                    <MainComponent/>
                </BrowserRouter>
            </Provider>
        </div>
    );
}

export default App;
