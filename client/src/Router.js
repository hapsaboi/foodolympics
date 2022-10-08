import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Homepage from "demos/Homepage.js";
import { useAuth } from './contexts/AuthContext';


import AdminLayout from './views/admin/layouts/Admin'

import LoginPage from "pages/Login.js";
//import MainLandingPage from "MainLandingPage.js";

function RouterComp() {

    const { loggedIn } = useAuth();

    return (
        <BrowserRouter>
            {loggedIn ?
                <>
                    <Switch>
                        <>
                            <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
                            <Redirect to="/admin/dashboard" />
                        </>
                    </Switch>

                </>
                :
                <Switch>
                    <Route exact path="/" component={Homepage} />
                    <Route path="/login" component={LoginPage} />
                    <Redirect to="/" />
                </Switch>

            }

        </BrowserRouter>
    )
}
export default RouterComp;


