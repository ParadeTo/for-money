/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

if (Math.random() > 0.5) {
  import('./utils').then(console.log);
}

AppRegistry.registerComponent(appName, () => App);
