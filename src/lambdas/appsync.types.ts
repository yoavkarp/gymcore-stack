import { AppSyncIdentityCognito, AppSyncResolverEventHeaders, Callback, Context } from "aws-lambda";

export interface AppSyncResolverEvent<TArguments = any> {
    arguments: TArguments;
    identity?: AppSyncIdentityCognito;
    request: {
        headers: AppSyncResolverEventHeaders;
        /** The API's custom domain if used for the request. */
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

export type AppSyncResolver<TArguments = any, TResult = any> = (event: AppSyncResolverEvent<TArguments>, context: Context, callback: Callback<TResult>) => ReturnType<Callback>;