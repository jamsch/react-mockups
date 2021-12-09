import { Meta } from '@jamsch/react-mockups';
import { useState } from 'react';
import Switch from './Switch';

export default {
  title: 'Switch',
  component: () => {
    const [checked, setChecked] = useState(false);

    return (
      <div>
        <h2>Basic example</h2>
        <Switch
          id="switch"
          action={() => setChecked(!checked)}
          value={checked}
        />
        <hr />

        <h2>With an inline label</h2>

        <Switch
          id="switch-with-label"
          action={() => setChecked(!checked)}
          value={checked}
          label="Some label"
        />
        <hr />

        <h2>trackActiveColor=red</h2>
        <Switch
          id="switch"
          trackActiveColor="red"
          action={() => setChecked(!checked)}
          value={checked}
        />
        <hr />

        <h2>trackInactiveColor=lightblue</h2>
        <Switch
          id="switch"
          trackInactiveColor="lightblue"
          action={() => setChecked(!checked)}
          value={checked}
        />
        <hr />
      </div>
    );
  },
} as Meta;
