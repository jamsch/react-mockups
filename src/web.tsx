import React, { useContext } from 'react';
import MockupProvider, { MockupContext } from './MockupProvider';
import type { FileMap, MockupRootProps } from './types';
import { useSortedMockups } from './utils';

export function MockupRoot<T extends FileMap>(props: MockupRootProps<T>) {
  return (
    <MockupProvider {...props}>
      <MockupRootView {...props} />
    </MockupProvider>
  );
}

function MockupRootView<T extends FileMap>(props: MockupRootProps<T>) {
  const { mockups, renderItem } = props;
  const [, setActiveMockup] = useContext(MockupContext);
  const sortedMockups = useSortedMockups(mockups);

  const navigate = (path: keyof T) => {
    setActiveMockup(path as string);
  };

  return (
    <div style={styles.container}>
      {sortedMockups.map(({ path, title }) => {
        if (renderItem) {
          return renderItem({
            path,
            title,
            navigate,
          });
        }

        return (
          <button
            key={path}
            onClick={() => navigate(path)}
            style={styles.mockupButton}
          >
            {title}
          </button>
        );
      })}
    </div>
  );
}

const styles = {
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  rowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  mockupButton: {
    borderColor: '#ccc',
    borderBottomWidth: 1,
    padding: '1rem',
    width: '100%',
    textAlign: 'left',
  },
} as const;
