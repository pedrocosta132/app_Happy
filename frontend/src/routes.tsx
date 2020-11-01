import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import OrphanageMapSearch from './pages/OrphanageMapSearch';
import Orphanage from './pages/Orphanage';
import CreateOrphanage from './pages/CreateOrphanage';

function Routes(){
    return(
        <Router>
            <Switch>
                <Route exact path="/" component={Landing}/>
                <Route path="/search" component={OrphanageMapSearch}/>
                <Route path="/orphanage/create" component={CreateOrphanage}/>
                <Route path="/orphanage/:id" component={Orphanage}/>
            </Switch>
        </Router>
    );
}

export default Routes;