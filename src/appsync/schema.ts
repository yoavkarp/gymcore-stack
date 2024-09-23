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

export type IClub = IDocument & {
  __typename?: 'Club';
  address: Scalars['String']['output'];
  created_at: Scalars['AWSDateTime']['output'];
  email: Scalars['AWSEmail']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  phone_number: Scalars['AWSPhone']['output'];
  profile_picture: Scalars['AWSURL']['output'];
  tenantId: Scalars['ID']['output'];
  updated_at: Scalars['AWSDateTime']['output'];
};

export type IClubConnection = {
  __typename?: 'ClubConnection';
  items?: Maybe<Array<IClub>>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type ICreateExerciseInput = {
  angle?: InputMaybe<IExerciseValueInput>;
  distance?: InputMaybe<IExerciseValueInput>;
  duration?: InputMaybe<IExerciseValueInput>;
  intensity?: InputMaybe<IExerciseValueInput>;
  machine_number?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  reps?: InputMaybe<IExerciseValueInput>;
  resistance?: InputMaybe<IExerciseValueInput>;
  rest?: InputMaybe<IExerciseValueInput>;
  seat_height?: InputMaybe<Scalars['String']['input']>;
  section: IExerciseSection;
  sets?: InputMaybe<Scalars['Int']['input']>;
  tempo?: InputMaybe<IExerciseValueInput>;
  weight?: InputMaybe<IExerciseValueInput>;
};

export type ICreateMeasurementInput = {
  fat?: InputMaybe<Scalars['Float']['input']>;
  heart_rate?: InputMaybe<Scalars['Float']['input']>;
  height?: InputMaybe<Scalars['Float']['input']>;
  memberId?: InputMaybe<Scalars['ID']['input']>;
  weight?: InputMaybe<Scalars['Float']['input']>;
};

export type ICreateMemberInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  birthdate: Scalars['AWSDate']['input'];
  email?: InputMaybe<Scalars['AWSEmail']['input']>;
  gender: IGender;
  measurement?: InputMaybe<ICreateMemberMeasurementInput>;
  name: Scalars['String']['input'];
  phone_number: Scalars['AWSPhone']['input'];
};

export type ICreateMemberMeasurementInput = {
  fat?: InputMaybe<Scalars['Float']['input']>;
  heart_rate?: InputMaybe<Scalars['Float']['input']>;
  height?: InputMaybe<Scalars['Float']['input']>;
  weight?: InputMaybe<Scalars['Float']['input']>;
};

export type ICreateTrainerInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  birthdate: Scalars['AWSDate']['input'];
  email?: InputMaybe<Scalars['AWSEmail']['input']>;
  gender: IGender;
  name: Scalars['String']['input'];
  phone_number: Scalars['AWSPhone']['input'];
};

export type ICreateWorkoutInput = {
  clubId: Scalars['ID']['input'];
  exercises: Array<ICreateExerciseInput>;
  memberId?: InputMaybe<Scalars['ID']['input']>;
  name: Scalars['String']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  trainerId: Scalars['ID']['input'];
};

export type IDocument = {
  created_at: Scalars['AWSDateTime']['output'];
  id: Scalars['ID']['output'];
  tenantId: Scalars['ID']['output'];
  updated_at: Scalars['AWSDateTime']['output'];
};

export type IExercise = {
  __typename?: 'Exercise';
  angle?: Maybe<IExerciseValue>;
  distance?: Maybe<IExerciseValue>;
  duration?: Maybe<IExerciseValue>;
  id: Scalars['ID']['output'];
  intensity?: Maybe<IExerciseValue>;
  machine_number?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  reps?: Maybe<IExerciseValue>;
  resistance?: Maybe<IExerciseValue>;
  rest?: Maybe<IExerciseValue>;
  seat_height?: Maybe<Scalars['String']['output']>;
  section: IExerciseSection;
  sets?: Maybe<Scalars['Int']['output']>;
  tempo?: Maybe<IExerciseValue>;
  weight?: Maybe<IExerciseValue>;
  xid: Scalars['ID']['output'];
};

export enum IExerciseSection {
  Cardio = 'CARDIO',
  Cooldown = 'COOLDOWN',
  Strength = 'STRENGTH',
  Warmup = 'WARMUP'
}

export type IExerciseValue = {
  __typename?: 'ExerciseValue';
  max?: Maybe<Scalars['Float']['output']>;
  min?: Maybe<Scalars['Float']['output']>;
  unit?: Maybe<Scalars['String']['output']>;
  val?: Maybe<Scalars['Float']['output']>;
};

export type IExerciseValueInput = {
  max?: InputMaybe<Scalars['Float']['input']>;
  min?: InputMaybe<Scalars['Float']['input']>;
  unit?: InputMaybe<Scalars['String']['input']>;
  val?: InputMaybe<Scalars['Float']['input']>;
};

export enum IGender {
  Female = 'FEMALE',
  Male = 'MALE',
  Other = 'OTHER'
}

export type IGoal = IDocument & {
  __typename?: 'Goal';
  clubId?: Maybe<Scalars['ID']['output']>;
  completed?: Maybe<Scalars['Boolean']['output']>;
  completed_at?: Maybe<Scalars['AWSDateTime']['output']>;
  created_at: Scalars['AWSDateTime']['output'];
  fat?: Maybe<Scalars['Float']['output']>;
  heart_rate?: Maybe<Scalars['Float']['output']>;
  height?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  memberId: Scalars['ID']['output'];
  tenantId: Scalars['ID']['output'];
  title: Scalars['String']['output'];
  updated_at: Scalars['AWSDateTime']['output'];
  weight?: Maybe<Scalars['Float']['output']>;
};

export type IGoalConnection = {
  __typename?: 'GoalConnection';
  items?: Maybe<Array<IGoal>>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type IMeasurement = IDocument & {
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

export type IMember = IDocument & {
  __typename?: 'Member';
  address?: Maybe<Scalars['String']['output']>;
  birthdate?: Maybe<Scalars['AWSDate']['output']>;
  created_at: Scalars['AWSDateTime']['output'];
  email?: Maybe<Scalars['AWSEmail']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  goal?: Maybe<IGoal>;
  id: Scalars['ID']['output'];
  measurement?: Maybe<IMeasurement>;
  name?: Maybe<Scalars['String']['output']>;
  phone_number?: Maybe<Scalars['AWSPhone']['output']>;
  profile_picture?: Maybe<Scalars['AWSURL']['output']>;
  registered?: Maybe<Scalars['Boolean']['output']>;
  status?: Maybe<Scalars['AWSJSON']['output']>;
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
  createMeasurementForMember?: Maybe<IMeasurement>;
  createMember?: Maybe<IMember>;
  createTrainer?: Maybe<ITrainer>;
  createWorkout?: Maybe<IWorkout>;
  register?: Maybe<IMember>;
  updateMemberProfile?: Maybe<IMember>;
};


export type IMutationCreateMeasurementArgs = {
  input: ICreateMeasurementInput;
};


export type IMutationCreateMeasurementForMemberArgs = {
  input: ICreateMeasurementInput;
  memberId: Scalars['ID']['input'];
};


export type IMutationCreateMemberArgs = {
  input: ICreateMemberInput;
};


export type IMutationCreateTrainerArgs = {
  input: ICreateTrainerInput;
};


export type IMutationCreateWorkoutArgs = {
  input: ICreateWorkoutInput;
};


export type IMutationRegisterArgs = {
  input: IRegisterInput;
};


export type IMutationUpdateMemberProfileArgs = {
  input: IUpdateMemberProfileInput;
};

export type IQuery = {
  __typename?: 'Query';
  getClubById?: Maybe<IClub>;
  getClubTrainers?: Maybe<Array<ITrainer>>;
  getMemberById?: Maybe<IMember>;
  getTenant?: Maybe<ITenant>;
  getTrainerById?: Maybe<ITrainer>;
  getWorkoutById?: Maybe<IWorkout>;
  searchMembers?: Maybe<Array<Maybe<IMember>>>;
};


export type IQueryGetClubByIdArgs = {
  clubId: Scalars['ID']['input'];
};


export type IQueryGetMemberByIdArgs = {
  memberId: Scalars['ID']['input'];
};


export type IQueryGetTrainerByIdArgs = {
  trainerId: Scalars['ID']['input'];
};


export type IQueryGetWorkoutByIdArgs = {
  id: Scalars['ID']['input'];
};


export type IQuerySearchMembersArgs = {
  text: Scalars['String']['input'];
};

export type IRegisterInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  birthdate: Scalars['AWSDate']['input'];
  email?: InputMaybe<Scalars['AWSEmail']['input']>;
  gender: IGender;
  name: Scalars['String']['input'];
  profile_picture?: InputMaybe<Scalars['AWSURL']['input']>;
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

export type ITrainer = IDocument & {
  __typename?: 'Trainer';
  address?: Maybe<Scalars['String']['output']>;
  birthdate: Scalars['AWSDate']['output'];
  created_at: Scalars['AWSDateTime']['output'];
  email?: Maybe<Scalars['AWSEmail']['output']>;
  gender: IGender;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  phone_number: Scalars['AWSPhone']['output'];
  tenantId: Scalars['ID']['output'];
  updated_at: Scalars['AWSDateTime']['output'];
};

export type ITrainerConnection = {
  __typename?: 'TrainerConnection';
  items?: Maybe<Array<ITrainer>>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type IUpdateMemberProfileInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  birthdate?: InputMaybe<Scalars['AWSDate']['input']>;
  email?: InputMaybe<Scalars['AWSEmail']['input']>;
  gender?: InputMaybe<IGender>;
  name?: InputMaybe<Scalars['String']['input']>;
  profile_picture?: InputMaybe<Scalars['AWSURL']['input']>;
};

export type IWorkout = IDocument & {
  __typename?: 'Workout';
  created_at: Scalars['AWSDateTime']['output'];
  exercises: Array<IExercise>;
  id: Scalars['ID']['output'];
  memberId?: Maybe<Scalars['ID']['output']>;
  name: Scalars['String']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  tenantId: Scalars['ID']['output'];
  trainerId: Scalars['ID']['output'];
  updated_at: Scalars['AWSDateTime']['output'];
};
