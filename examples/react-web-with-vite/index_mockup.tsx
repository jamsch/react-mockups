import { useEffect, useRef } from 'react';
import { render } from 'react-dom';
import type { MockupRootRef, MockupWrapperProps } from '@jamsch/react-mockups';
import { MockupRoot } from '@jamsch/react-mockups/web';
import mockups from './mockups';

function MockupApp() {
  const mockupRef = useRef<MockupRootRef>(null);

  useEffect(() => {
    const handleHashChange = () => {
      mockupRef.current?.navigate(window.location.hash?.slice(1));
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <div>
      <h1>Mockup app</h1>
      <MockupRoot
        ref={mockupRef}
        server={import.meta.env.VITE_MOCKUP_SERVER}
        initialPath={window.location.hash.slice(1)}
        onNavigate={(path) => {
          window.location.hash = path || '';
        }}
        mockups={mockups}
        Wrapper={MockupWrapper}
      />
    </div>
  );
}

function MockupWrapper(props: MockupWrapperProps) {
  return (
    <div>
      <button onClick={() => props.navigate(null)}>{'< Back'}</button>
      <props.Component />
    </div>
  );
}

render(<MockupApp />, document.getElementById('root'));
