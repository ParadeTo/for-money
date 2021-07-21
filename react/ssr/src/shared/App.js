import React, { Component, useState } from 'react';
// import Grid from './Grid';
// import routes from './routes';
// import { Router, Switch, Route } from 'react-router-dom';
// import NoMatch from '../shared/NoMatch';
// import NavBar from '../shared/NavBar';
// class App extends Component {
//   render() {
//     return (
//       <div>
//         <h1> Popular repos by language</h1>
//         <NavBar />
//         <Switch>
//           {routes.map(({ path, exact, component: C, ...rest }) => (
//             <Route
//               key={path}
//               path={path}
//               exact={exact}
//               render={props => <C {...props} {...rest} />}
//             />
//           ))}
//           <Route render={props => <NoMatch {...props} />} />
//         </Switch>
//       </div>
//     );
//   }
// }

const App = () => {
  const [name, setName] = useState('a')
  return <div onClick={() => setName('b')}>
    <span>{name}</span>
  </div>
}

export default App;
