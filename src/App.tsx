import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './renderer/styles/styles.css';

import Login from "./renderer/pages/userAuthentication/Login";
import Register from "./renderer/pages/userAuthentication/Register";
import EmpireView from "./renderer/pages/empireView/EmpireView";

const App = () => (
    <Router>
        <Routes>
            <Route
                path="/"
                element={
                    <Login/>
                }
            />
            <Route path="/register" element={<Register/>}></Route>
            <Route path="/empire" element={<EmpireView/>}></Route>
        </Routes>
    </Router>
);

export default App;