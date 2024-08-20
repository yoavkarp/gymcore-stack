export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends {
    [key: string]: unknown;
}> = {
    [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<T extends {
    [key: string]: unknown;
}, K extends keyof T> = {
    [_ in K]?: never;
};
export type Incremental<T> = T | {
    [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: {
        input: string;
        output: string;
    };
    String: {
        input: string;
        output: string;
    };
    Boolean: {
        input: boolean;
        output: boolean;
    };
    Int: {
        input: number;
        output: number;
    };
    Float: {
        input: number;
        output: number;
    };
    AWSJSON: {
        input: any;
        output: any;
    };
    AWSTimestamp: {
        input: any;
        output: any;
    };
    AWSURL: {
        input: any;
        output: any;
    };
};
export type InviteMemberInput = {
    email: Scalars['String']['input'];
    name: Scalars['String']['input'];
    phoneNumber: Scalars['String']['input'];
};
export type ListQueryInput = {
    limit?: InputMaybe<Scalars['Int']['input']>;
    nextToken?: InputMaybe<Scalars['String']['input']>;
};
export type Member = {
    __typename?: 'Member';
    createdAt: Scalars['AWSTimestamp']['output'];
    email: Scalars['String']['output'];
    id: Scalars['String']['output'];
    name: Scalars['String']['output'];
    phoneNumber: Scalars['String']['output'];
    status: Scalars['String']['output'];
    updatedAt: Scalars['AWSTimestamp']['output'];
};
export type MemberConnection = {
    __typename?: 'MemberConnection';
    items?: Maybe<Array<Member>>;
    nextToken?: Maybe<Scalars['String']['output']>;
};
export type Mutation = {
    __typename?: 'Mutation';
    deleteMember?: Maybe<Member>;
    inviteMember?: Maybe<Member>;
};
export type MutationDeleteMemberArgs = {
    id: Scalars['String']['input'];
};
export type MutationInviteMemberArgs = {
    input: InviteMemberInput;
};
export type Query = {
    __typename?: 'Query';
    getCurrentMember?: Maybe<Member>;
    getMemberById?: Maybe<Member>;
    searchMembers?: Maybe<Array<Member>>;
};
export type QueryGetMemberByIdArgs = {
    id: Scalars['String']['input'];
};
export type QuerySearchMembersArgs = {
    limit?: InputMaybe<Scalars['Int']['input']>;
    query: Scalars['String']['input'];
};
