# react-native with Expo

This example uses `react-mockups` in a few different scenarios. Edit `index.js` to get started.

## Examples

- `App.tsx` - Basic example. Use the Android back button to navigate back to the root.
- `AppWithServer.tsx` - allows you to control navigation between mockups from a web interface or VS Code
- `AppWithPersistence.tsx` - persists the last-viewed mockup across refreshes

Edit `index.js` to switch out `registerRootComponent(EntryPoint)` with the example you'd like to see.

## Getting Started

1. Run an emulator or connect a physical device
2. Run `npm run start:mockups` to run the mockup server, reverse adb ports (required for Android to access `localhost:1337`) and run Expo.
3. Open http://localhost:1337 or install the [VS Code extension](https://marketplace.visualstudio.com/items?itemName=jamsch.react-native-mockups-explorer-vscode)
