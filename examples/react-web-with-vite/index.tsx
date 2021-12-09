import { MockupRoot } from '@jamsch/react-mockups/web';
import mockups from './mockups';
import { render } from 'react-dom';

function MainApp() {
  return (
    <div>
      <h1>Main app</h1>
      <p>This is the main entry point to your app.</p>
      <p>You can include "MockupRoot" in here if you'd like</p>
      <p>
        Alternatively, you can run "npm run mockup" (which will change the entry
        point to "index_mockup") to avoid bundling the mockups in production
        code.
      </p>
      <MockupRoot mockups={mockups} />
    </div>
  );
}

render(<MainApp />, document.getElementById('root'));
