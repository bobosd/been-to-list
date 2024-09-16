import BeenToList from "./components/BeenToList/BeenToList.jsx";
import "./App.css";
import {Provider} from "react-redux";
import store from "./redux/store.jsx";

const App = () => {
    return (
        <Provider store={store}>
            <main>
                <BeenToList></BeenToList>
            </main>
        </Provider>
    );
}

export default App
