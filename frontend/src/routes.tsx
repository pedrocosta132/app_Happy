import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import OrphanageMapSearch from './pages/OrphanageMapSearch';

function Routes(){
    return(
        <Router>
            <Switch>
                <Route exact path="/" component={Landing}/>
                <Route path="/search" component={OrphanageMapSearch}/>
            </Switch>
        </Router>
    );
}

export default Routes;