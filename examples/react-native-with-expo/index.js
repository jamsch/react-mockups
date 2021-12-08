import { registerRootComponent } from 'expo';

// With the websocket server
import AppWithServer from './src/AppWithServer';

// With Persistence
// import AppWithPersistence from "./src/AppWithPersistence";

// Basic example
// import App from "./src/App";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(AppWithServer);
