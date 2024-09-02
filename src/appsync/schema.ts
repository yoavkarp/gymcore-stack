import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  AWSDate: { input: string; output: string; }
  AWSDateTime: { input: string; output: string; }
  AWSEmail: { input: string; output: string; }
  AWSIPAddress: { input: any; output: any; }
  AWSJSON: { input: { [x: string]: any }; output: { [x: string]: any }; }
  AWSPhone: { input: string; output: string; }
  AWSTime: { input: string; output: string; }
  AWSTimestamp: { input: number; output: number; }
  AWSURL: { input: string; output: string; }
};

export type IClub = {
  __typename?: 'Club';
  address: Scalars['String']['output'];
  created_at: Scalars['AWSTimestamp']['output'];
  email: Scalars['AWSEmail']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  phone_number: Scalars['AWSPhone']['output'];
  profile_picture: Scalars['AWSURL']['output'];
  tenantId: Scalars['ID']['output'];
  updated_at: Scalars['AWSTimestamp']['output'];
};

export type ICreateMeasurementInput = {
  fat?: InputMaybe<Scalars['Float']['input']>;
  heart_rate?: InputMaybe<Scalars['Float']['input']>;
  height?: InputMaybe<Scalars['Float']['input']>;
  memberId: Scalars['ID']['input'];
  weight?: InputMaybe<Scalars['Float']['input']>;
};

export type ICreateMemberInput = {
  phone_number: Scalars['AWSPhone']['input'];
};

export type IFirstTimeMemberRegisterInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  birthdate: Scalars['AWSDate']['input'];
  email?: InputMaybe<Scalars['AWSEmail']['input']>;
  gender: Scalars['String']['input'];
  name: Scalars['String']['input'];
  profile_picture?: InputMaybe<Scalars['AWSURL']['input']>;
};

export type IMeasurement = {
  __typename?: 'Measurement';
  clubId?: Maybe<Scalars['ID']['output']>;
  created_at: Scalars['AWSDateTime']['output'];
  fat?: Maybe<Scalars['Float']['output']>;
  heart_rate?: Maybe<Scalars['Float']['output']>;
  height?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  memberId: Scalars['ID']['output'];
  tenantId: Scalars['ID']['output'];
  updated_at: Scalars['AWSDateTime']['output'];
  weight?: Maybe<Scalars['Float']['output']>;
};

export type IMeasurementConnection = {
  __typename?: 'MeasurementConnection';
  items?: Maybe<Array<IMeasurement>>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type IMember = {
  __typename?: 'Member';
  address?: Maybe<Scalars['String']['output']>;
  birthdate?: Maybe<Scalars['AWSDate']['output']>;
  clubsIds?: Maybe<Array<Scalars['ID']['output']>>;
  created_at: Scalars['AWSDateTime']['output'];
  email?: Maybe<Scalars['AWSEmail']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  measurement?: Maybe<IMeasurement>;
  name?: Maybe<Scalars['String']['output']>;
  phone_number?: Maybe<Scalars['AWSPhone']['output']>;
  profile_picture?: Maybe<Scalars['AWSURL']['output']>;
  tenantId: Scalars['ID']['output'];
  updated_at: Scalars['AWSDateTime']['output'];
};

export type IMemberConnection = {
  __typename?: 'MemberConnection';
  items?: Maybe<Array<IMember>>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type IMutation = {
  __typename?: 'Mutation';
  createMeasurement?: Maybe<IMeasurement>;
  createMember?: Maybe<IMember>;
  deleteMember?: Maybe<IMember>;
  firstTimeMemberRegister?: Maybe<IMember>;
  updateAuthenticatedMember?: Maybe<IMember>;
};


export type IMutationCreateMeasurementArgs = {
  input: ICreateMeasurementInput;
};


export type IMutationCreateMemberArgs = {
  input: ICreateMemberInput;
};


export type IMutationDeleteMemberArgs = {
  memberId: Scalars['ID']['input'];
};


export type IMutationFirstTimeMemberRegisterArgs = {
  input: IFirstTimeMemberRegisterInput;
};


export type IMutationUpdateAuthenticatedMemberArgs = {
  input: IUpdateMemberInput;
};

export type IQuery = {
  __typename?: 'Query';
  getAuthenticatedClub?: Maybe<IClub>;
  getAuthenticatedMember?: Maybe<IMember>;
  getClubById?: Maybe<IClub>;
  getMemberById?: Maybe<IMember>;
  getTenant?: Maybe<ITenant>;
};


export type IQueryGetClubByIdArgs = {
  clubId: Scalars['ID']['input'];
};


export type IQueryGetMemberByIdArgs = {
  memberId: Scalars['ID']['input'];
};

export type ITenant = {
  __typename?: 'Tenant';
  address: Scalars['String']['output'];
  created_at: Scalars['AWSDateTime']['output'];
  email: Scalars['AWSEmail']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  phone_number: Scalars['AWSPhone']['output'];
  profile_picture: Scalars['AWSURL']['output'];
  updated_at: Scalars['AWSDateTime']['output'];
};

export type ITrainer = {
  __typename?: 'Trainer';
  clubId: Scalars['ID']['output'];
  clubsIds: Array<Scalars['ID']['output']>;
  created_at: Scalars['AWSDateTime']['output'];
  email: Scalars['AWSEmail']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone_number: Scalars['AWSPhone']['output'];
  profile_picture?: Maybe<Scalars['AWSURL']['output']>;
  tenantId: Scalars['ID']['output'];
  updated_at: Scalars['AWSDateTime']['output'];
};

export type ITrainerConnection = {
  __typename?: 'TrainerConnection';
  items?: Maybe<Array<ITrainer>>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type IUpdateMemberInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  birthdate?: InputMaybe<Scalars['AWSDate']['input']>;
  email?: InputMaybe<Scalars['AWSEmail']['input']>;
  gender?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  profile_picture?: InputMaybe<Scalars['AWSURL']['input']>;
};
