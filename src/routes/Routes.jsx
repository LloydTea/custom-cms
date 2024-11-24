import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "../pages/Home";
import GetAccess from "../pages/GetAccess";
import Account from "../pages/account/Account";
import ErrorPage from "../pages/ErrorPage";

function RoutesPath() {
  return (
    <Router>
      <Routes>
        <Route path='/'>
          <Route index element={<Home />} />
          <Route path='login' element={<GetAccess />}></Route>
          <Route path='account/*' element={<Account />}></Route>
          <Route path='*' element={<ErrorPage />}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default RoutesPath;
