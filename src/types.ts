import type { ComponentType, FunctionComponent, ReactNode } from 'react';

/** Used for .mockup.tsx/jsx files */
export interface Meta {
  title: string;
  description?: string;
  component?: ComponentType;
}

export type FileMap = Record<string, any>;

export interface MockupBaseProps<T extends FileMap> {
  /** Initial path when mounting */
  initialPath?: keyof T;
  /** List of mockups */
  mockups: T;
  /** When a navigation occurs */
  onNavigate?: (path: keyof T | null) => void;
  /** Websocket server path (e.g. "localhost:1337") */
  server?: string;
  /** Wrapper component to render a mockup component */
  Wrapper?: MockupWrapperComponent;
}

export type MockupWrapperProps = {
  title: string;
  path: string;
  Component: ComponentType<any>;
  navigate: (path: string | null) => void;
};

export interface MockupRootProps<T extends FileMap> extends MockupBaseProps<T> {
  renderItem?: (params: {
    path: keyof T;
    title: string;
    navigate: (path: keyof T) => void;
  }) => ReactNode;
}

export type MockupWrapperComponent = FunctionComponent<MockupWrapperProps>;
