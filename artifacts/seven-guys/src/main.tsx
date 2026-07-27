import { createRoot } from 'react-dom/client';
import { Router, Route, Switch } from 'wouter';

import App from './App';
import { AdminApp } from './admin/AdminApp';

import './index.css';

// Strip trailing slash so wouter base matching works correctly
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

createRoot(document.getElementById('root')!).render(
  <Router base={base}>
    <Switch>
      {/* Admin panel — completely isolated from the main site */}
      <Route path="/admin" nest>
        <AdminApp />
      </Route>
      {/* Main website */}
      <Route>
        <App />
      </Route>
    </Switch>
  </Router>
);
