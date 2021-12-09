import Button from './Button';
import type { Meta } from '@jamsch/react-mockups';

export default {
  title: 'Button',
  component: () => (
    <div style={styles.container}>
      <Button title="Primary button (Large)" color="primary" size="large" />
      <Button title="Secondary button (Large)" color="secondary" size="large" />
      <div style={styles.margin} />
      <Button title="Primary button (regular)" color="primary" size="regular" />
      <Button
        title="Secondary button (regular)"
        color="secondary"
        size="regular"
      />
      <div style={styles.margin} />
      <Button title="Primary button (small)" color="primary" size="small" />
      <Button title="Secondary button (small)" color="secondary" size="small" />
    </div>
  ),
} as Meta;

const styles = {
  container: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  margin: {
    margin: 10,
  },
};
