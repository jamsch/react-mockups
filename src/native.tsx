import React, { useCallback, useContext, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Pressable,
  BackHandler,
} from 'react-native';
import MockupProvider, { MockupContext } from './MockupProvider';
import type { FileMap, MockupRootProps, MockupWrapperComponent } from './types';
import { useSortedMockups } from './utils';

export function MockupRoot<T extends FileMap>(props: MockupRootProps<T>) {
  const { Wrapper: PropsWrapper, ...rest } = props;

  // Add back button handling inside mockups
  const Wrapper = useCallback<MockupWrapperComponent>(
    (p) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useHandleBack(() => {
        p.navigate(null);
        return true;
      });
      return PropsWrapper ? <PropsWrapper {...p} /> : <p.Component />;
    },
    [PropsWrapper]
  );

  return (
    <MockupProvider Wrapper={Wrapper} {...rest}>
      {/* @ts-ignore */}
      <MockupRootView {...props} />
    </MockupProvider>
  );
}

function MockupRootView<T extends FileMap>(props: MockupRootProps<T>) {
  const { mockups, renderItem } = props;
  const [, setActiveMockup] = useContext(MockupContext);

  const navigate = (path: keyof T) => {
    setActiveMockup(path as string);
  };

  const sortedMockups = useSortedMockups(mockups);

  return (
    <ScrollView style={styles.container}>
      {sortedMockups.map(({ path, title }) => {
        if (renderItem) {
          return renderItem({
            path,
            title,
            navigate,
          });
        }

        return (
          <Pressable
            key={path}
            onPress={() => navigate(path)}
            android_ripple={{ borderless: false }}
          >
            <View style={styles.mockupButton}>
              <Text>{title}</Text>
            </View>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

/** Uses global navigation ref instead of relative navigation ref */
function useHandleBack(callback: () => boolean) {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', callback);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', callback);
    };
  }, [callback]);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  mockupButton: {
    borderColor: '#ccc',
    borderBottomWidth: 1,
    paddingHorizontal: 25,
    paddingVertical: 15,
  },
  folder: {
    paddingHorizontal: 5,
  },
  folderTitle: {
    fontWeight: 'bold',
  },
});
