import { useEffect, useRef, useState } from 'react';
import { render } from 'react-dom';
import type { MockupRootRef, MockupWrapperProps } from '@jamsch/react-mockups';
import { MockupRoot } from '@jamsch/react-mockups/web';
import mockups from './mockups'; // your generated file

function MockupApp() {
  const mockupRef = useRef<MockupRootRef>(null);
  const [path, setPath] = useState<string | null>(
    window.location.hash.slice(1)
  );

  useEffect(() => {
    window.location.hash = path || '';
  }, [path]);

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
        initialPath={path || undefined}
        onNavigate={setPath}
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
