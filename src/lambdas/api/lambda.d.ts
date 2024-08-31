declare global {
    namespace NodeJS {
        interface ProcessEnv {
            readonly NODE_ENV?: 'development' | 'production';
            readonly TENANT_ID: string;
            readonly USER_POOL_ID: string;
        }
    }
}

export { }