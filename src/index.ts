// A file is required to be in the root of the /src directory by the TypeScript compiler
declare module "*.jpg" {
    const value: any;
    export = value;
}

declare namespace JSX {
    interface IntrinsicElements {
        [elemName: string]: any;
    }
}

declare module 'Auth' {
    export function Auth(): any
} 
declare module '*';
