// @ts-check
const { spawnSync } = require('child_process');

// run "adb devices"
const result = spawnSync('adb', ['devices']);

/**
List of devices attached
ea40adc device
emulator-5554   device
emulator-5556   device
*/

// Parse device ids from result
const devices = result.stdout
  .toString()
  .split('\n')
  .slice(1)
  .map((line) => line.split('\t')[0])
  .filter((line) => line && line.length > 0);

// Go through each devie and reverse the port
for (const device of devices) {
  for (const port of [8000, 8080, 8081, 1337]) {
    console.log(`Reversing port ${port} on device: ${device}`);
    spawnSync('adb', ['-s', device, 'reverse', `tcp:${port}`, `tcp:${port}`]);
  }
}
