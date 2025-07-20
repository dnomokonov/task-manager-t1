/// <reference types="vite/client" />
/// <reference types="vite/types/importMeta.d.ts" />

declare module "*.css" {
    const content: Record<string, string>;
    export default content;
}