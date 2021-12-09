/// <reference types="vite/client" />

interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_MOCKUP_SERVER: string | undefined;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
