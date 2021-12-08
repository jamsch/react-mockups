import React, {
  useEffect,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
  createContext,
} from 'react';
import { useWebsocket, sortMockups } from './utils';
import type { FileMap, MockupBaseProps } from './types';

type SetStateFunction<T> = Dispatch<SetStateAction<T>>;

// Context that wraps all mockups
export const MockupContext = createContext<
  [string | null, SetStateFunction<string | null>]
>(['', () => {}]);

export interface MockupProviderProps<T extends FileMap>
  extends MockupBaseProps<T> {
  children: ReactNode;
}

export default function MockupProvider<T extends FileMap>(
  props: MockupProviderProps<T>
) {
  const { mockups, initialPath, onNavigate, server, children } = props;
  const state = useState<keyof T | null>(initialPath || null);
  const [selectedMockup, setSelectedMockup] = state;

  // If applicable, connect to the websocket server
  const { socket, connected } = useWebsocket(server || '', (message) => {
    if (message.type === 'NAVIGATE') {
      setSelectedMockup(message.payload as string);
    }
  });

  useEffect(() => {
    if (!connected || socket.current?.readyState !== WebSocket.OPEN) {
      return;
    }

    const sortedMockups = sortMockups(mockups);

    const action = JSON.stringify({
      type: 'UPDATE_STATE',
      payload: {
        path: selectedMockup,
        mockups: sortedMockups,
      },
    });
    socket.current?.send(action);
  }, [socket, connected, mockups, selectedMockup]);

  useEffect(() => {
    onNavigate?.(selectedMockup);
  }, [onNavigate, selectedMockup]);

  const childContent = (() => {
    if (!selectedMockup) {
      return children;
    }
    if (!mockups[selectedMockup]) {
      console.warn(
        `[react-mockups] No mockup found with the value: '${selectedMockup}'`
      );
      setSelectedMockup(null);
      return null;
    }
    // @ts-ignore
    const Mockup = mockups[selectedMockup].default;

    if (props.Wrapper) {
      return (
        <props.Wrapper
          title={Mockup.title}
          path={selectedMockup as string}
          Component={Mockup.component}
          navigate={setSelectedMockup}
        />
      );
    }
    return <Mockup.component />;
  })();

  return (
    <MockupContext.Provider
      // @ts-ignore
      value={state}
    >
      {childContent}
    </MockupContext.Provider>
  );
}
