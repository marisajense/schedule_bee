import React from 'react';
import { Route, IndexRoute, browserHistory } from 'react-router';
import { UserAuthWrapper } from 'redux-auth-wrapper';
import App from './containers/App';
import NoMatch from './components/NoMatch';
import Admin from './components/Admin';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import About from './components/About';
import AuthenticatedRoutes from './components/AuthenticatedRoutes';
import Dashboard from './components/Dashboard';
import ScheduleView from './components/ScheduleView';
import ShiftScheduleView from './components/ShiftScheduleView';
import Settings from './components/Settings';
import Employees from './components/Employees';
import Companies from './components/Companies';
import Company from './components/Company';
import EmployeeScheduleView from './components/EmployeeScheduleView'

const AdminAccess = UserAuthWrapper({
  authSelector: state => state.user,
  predicate: user => { return user.role === 'admin'},
  redirectAction: () => browserHistory.push('/'),
  wrapperDisplayName: 'UserIsAdmin'
})

const AdminRoutes = AdminAccess( (props) => props.children )

export default (
  <Route>
    <Route path="/" component={App}>
      <Route path='/signup' component={SignUp} />
      <Route path='/signin' component={SignIn} />
      <Route path='/about' component={About} />
      <Route component={AuthenticatedRoutes}>
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/schedule' component={ScheduleView} />
        <Route path='/employeescheduleview' component={EmployeeScheduleView} />
        <Route path='/shiftschedule' component={ShiftScheduleView} />
        <Route component={AdminRoutes}>
          <Route path='/admin' component={Admin} />
          <Route path='/companies' component={Companies} />
          <Route path='/company/:id' component={Company} />
          <Route path='/employees' component={Employees} />
          <Route path='/settings' component={Settings} />
        </Route>
      </Route>
      <Route path="*" status={404} component={NoMatch}/>
    </Route>
  </Route>
)
