import { Container } from 'react-bootstrap';
import './App.css';
import Header from './components/Header/Header';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home/Home';
import Orders from './components/Orders/Orders';
import Admin from './components/Admin/Admin';
import Deals from './components/Deals/Deals';
import Login from './components/Login/Login';
import NotMatch from './components/NotMatch/NotMatch';
import { createContext, useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Checkout from './components/Checkout/Checkout';
import UserProfile from './components/UserProfile/UserProfile';

export const UserContext = createContext();
export const CheckoutContext = createContext();

function App() {
  const [user, setUser] = useState({});
  const [checkoutProduct, setCheckoutProduct] = useState(null);

  return (
    <UserContext.Provider value={[user, setUser]}>
      <CheckoutContext.Provider value={[checkoutProduct, setCheckoutProduct]}>
        <Container>
          <Router>
            <div>
              <Header />

              <Switch>
                <Route path="/home">
                  <Home />
                </Route>
                <PrivateRoute path="/orders">
                  <Orders />
                </PrivateRoute>
                <PrivateRoute path="/admin">
                  <Admin />
                </PrivateRoute>
                <PrivateRoute path="/checkout">
                  <Checkout />
                </PrivateRoute>
                <PrivateRoute path="/userProfile">
                  <UserProfile />
                </PrivateRoute>
                <PrivateRoute path="/deals">
                  <Deals />
                </PrivateRoute>
                <Route path="/login">
                  <Login />
                </Route>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="*">
                  <NotMatch />
                </Route>
              </Switch>
            </div>
          </Router>
        </Container>
      </CheckoutContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
