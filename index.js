/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {PaperProvider, MD2DarkTheme} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import App from './App';
import {name as appName} from './app.json';

export default function Main() {
  return (
    <PaperProvider
      theme={{
        ...MD2DarkTheme,
        dark: true,
        colors: {...MD2DarkTheme.colors, primary: '#90caf9'},
      }}
      settings={{icon: props => <MaterialCommunityIcons {...props} />}}>
      <App />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
