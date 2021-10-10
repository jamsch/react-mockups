import React, {
  useEffect,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import { useWebsocket } from './utils';
import type { FileMap, MockupBaseProps } from './types';

type SetStateFunction<T> = Dispatch<SetStateAction<T>>;

// Context that wraps all mockups
export const MockupContext = React.createContext<
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

    const sortedMockups = Object.keys(mockups)
      .map((mockup) => ({
        // @ts-ignore
        title: mockups[mockup]?.default?.title || formatMockupName(mockup),
        path: mockup,
      }))
      .sort((a, b) => a.title.localeCompare(b.title));

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
    if (selectedMockup) {
      if (!mockups[selectedMockup]) {
        console.warn(`No mockup found with the value: '${selectedMockup}'`);
        setSelectedMockup(null);
        return null;
      }
      // @ts-ignore
      const Mockup = mockups[selectedMockup].default;
      return props.renderMockup ? (
        props.renderMockup({
          title: Mockup.title,
          Component: Mockup.component,
          navigate: (path: keyof T) => {
            setSelectedMockup(path);
          },
        })
      ) : (
        <Mockup.component />
      );
    }
    return children;
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

const formatMockupName = (path: string) => {
  // get file name from path
  const fileName = path.split('/').pop();
  return fileName;
};