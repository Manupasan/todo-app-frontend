import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";

function App(){
    return(
        <Router>
            <Routes>
                <Route path = "/signin" element={<SigninPage/>}/>
                <Route path = "/signup" element={<SignupPage/>}/>
                {/*<Route path = "/tasks" element={<TasksPage/>}/>*/}

            </Routes>
        </Router>
    )
}

export default App;