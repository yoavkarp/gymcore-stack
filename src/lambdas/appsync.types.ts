import { AppSyncIdentityCognito, AppSyncResolverEventHeaders, Callback, Context } from "aws-lambda";

export interface AppSyncResolverEvent<TArguments = any> {
    arguments: TArguments;
    identity?: Omit<AppSyncIdentityCognito, "claims"> & {
        claims?: {
            "cognito:groups"?: Array<"club" | "member">;
            "custom:clubId"?: string;
            [key: string]: any;
        }
    };
    request: {
        headers: AppSyncResolverEventHeaders;
        domainName: string | null;
    };
    info: {
        selectionSetList: string[];
        selectionSetGraphQL: string;
        parentTypeName: string;
        fieldName: string;
        variables: { [key: string]: any };
    };
    prev: { result: { [key: string]: any } } | null;
    stash: { [key: string]: any };
}

type NonNullableKeysType<T> = {
    [K in keyof T]: Exclude<T[K], null>;
};

export type AppSyncResolver<TArguments = any, TResult = any> = (event: AppSyncResolverEvent<TArguments>, context: Context, callback: Callback<TResult>) => ReturnType<Callback>;