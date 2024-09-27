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

export type IAddExerciseToWorkoutInput = {
  name: Scalars['String']['input'];
  type: IExerciseType;
  xid: Scalars['ID']['input'];
};

export type ICardioExercise = {
  __typename?: 'CardioExercise';
  angle?: Maybe<IParameter>;
  id: Scalars['ID']['output'];
  intervals?: Maybe<Array<Maybe<ICardioExerciseInterval>>>;
  machine_number?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  resistance?: Maybe<IParameter>;
  seat_height?: Maybe<Scalars['String']['output']>;
  xid: Scalars['ID']['output'];
};

export type ICardioExerciseInterval = {
  __typename?: 'CardioExerciseInterval';
  angle?: Maybe<IParameter>;
  distance?: Maybe<IParameter>;
  duration?: Maybe<IParameter>;
  id: Scalars['ID']['output'];
  intensity?: Maybe<IParameter>;
  resistance?: Maybe<IParameter>;
  rest?: Maybe<IParameter>;
  tempo?: Maybe<IParameter>;
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
  memberId?: InputMaybe<Scalars['ID']['input']>;
  name: Scalars['String']['input'];
  planId?: InputMaybe<Scalars['ID']['input']>;
  trainerId: Scalars['ID']['input'];
};

export type IDocument = {
  created_at: Scalars['AWSDateTime']['output'];
  id: Scalars['ID']['output'];
  tenantId: Scalars['ID']['output'];
  updated_at: Scalars['AWSDateTime']['output'];
};

export type IExercise = ICardioExercise | IStrengthExercise;

export enum IExerciseType {
  Cardio = 'CARDIO',
  Strength = 'STRENGTH'
}

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

export type IIntervalInput = {
  angle?: InputMaybe<IParameterInput>;
  distance?: InputMaybe<IParameterInput>;
  duration?: InputMaybe<IParameterInput>;
  intensity?: InputMaybe<IParameterInput>;
  resistance?: InputMaybe<IParameterInput>;
  rest?: InputMaybe<IParameterInput>;
  tempo?: InputMaybe<IParameterInput>;
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
  profile_workouts?: Maybe<IWorkoutConnection>;
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
  addExerciseToWorkout?: Maybe<IWorkout>;
  addIntervalToExercise?: Maybe<IWorkout>;
  addSetToExercise?: Maybe<IWorkout>;
  createMeasurement?: Maybe<IMeasurement>;
  createMeasurementForMember?: Maybe<IMeasurement>;
  createMember?: Maybe<IMember>;
  createTrainer?: Maybe<ITrainer>;
  createWorkout?: Maybe<IWorkout>;
  register?: Maybe<IMember>;
  updateExerciseInWorkout?: Maybe<IWorkout>;
  updateIntervalInExercise?: Maybe<IWorkout>;
  updateMemberProfile?: Maybe<IMember>;
  updateSetInExercise?: Maybe<IWorkout>;
  updateWorkout?: Maybe<IWorkout>;
};


export type IMutationAddExerciseToWorkoutArgs = {
  input: IAddExerciseToWorkoutInput;
  workoutId: Scalars['ID']['input'];
};


export type IMutationAddIntervalToExerciseArgs = {
  exerciseId: Scalars['ID']['input'];
  input: IIntervalInput;
  workoutId: Scalars['ID']['input'];
};


export type IMutationAddSetToExerciseArgs = {
  exerciseId: Scalars['ID']['input'];
  input: ISetInput;
  workoutId: Scalars['ID']['input'];
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


export type IMutationUpdateExerciseInWorkoutArgs = {
  exerciseId: Scalars['ID']['input'];
  input: IUpdateExerciseInWorkoutInput;
  workoutId: Scalars['ID']['input'];
};


export type IMutationUpdateIntervalInExerciseArgs = {
  exerciseId: Scalars['ID']['input'];
  input: IIntervalInput;
  intervalId: Scalars['ID']['input'];
  workoutId: Scalars['ID']['input'];
};


export type IMutationUpdateMemberProfileArgs = {
  input: IUpdateMemberProfileInput;
};


export type IMutationUpdateSetInExerciseArgs = {
  exerciseId: Scalars['ID']['input'];
  input: ISetInput;
  setId: Scalars['ID']['input'];
  workoutId: Scalars['ID']['input'];
};


export type IMutationUpdateWorkoutArgs = {
  input: IUpdateWorkoutInput;
  workoutId: Scalars['ID']['input'];
};

export type IParameter = {
  __typename?: 'Parameter';
  max?: Maybe<Scalars['Float']['output']>;
  unit?: Maybe<Scalars['String']['output']>;
  val?: Maybe<Scalars['Float']['output']>;
};

export type IParameterInput = {
  max?: InputMaybe<Scalars['Float']['input']>;
  unit?: InputMaybe<Scalars['String']['input']>;
  val?: InputMaybe<Scalars['Float']['input']>;
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
  workoutId: Scalars['ID']['input'];
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

export type ISetInput = {
  reps?: InputMaybe<IParameterInput>;
  rest?: InputMaybe<IParameterInput>;
  times?: InputMaybe<IParameterInput>;
  weight?: InputMaybe<IParameterInput>;
};

export type IStrengthExercise = {
  __typename?: 'StrengthExercise';
  angle?: Maybe<IParameter>;
  id: Scalars['ID']['output'];
  machine_number?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  resistance?: Maybe<IParameter>;
  seat_height?: Maybe<Scalars['String']['output']>;
  sets?: Maybe<Array<Maybe<IStrengthExerciseSet>>>;
  xid: Scalars['ID']['output'];
};

export type IStrengthExerciseSet = {
  __typename?: 'StrengthExerciseSet';
  id: Scalars['ID']['output'];
  reps?: Maybe<IParameter>;
  rest?: Maybe<IParameter>;
  times?: Maybe<IParameter>;
  weight?: Maybe<IParameter>;
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

export type IUpdateExerciseInWorkoutInput = {
  angle?: InputMaybe<IParameterInput>;
  machine_number?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  resistance?: InputMaybe<IParameterInput>;
  seat_height?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<IExerciseType>;
  xid?: InputMaybe<Scalars['ID']['input']>;
};

export type IUpdateMemberProfileInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  birthdate?: InputMaybe<Scalars['AWSDate']['input']>;
  email?: InputMaybe<Scalars['AWSEmail']['input']>;
  gender?: InputMaybe<IGender>;
  name?: InputMaybe<Scalars['String']['input']>;
  profile_picture?: InputMaybe<Scalars['AWSURL']['input']>;
};

export type IUpdateWorkoutInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
};

export type IWorkout = IDocument & {
  __typename?: 'Workout';
  clubId: Scalars['ID']['output'];
  created_at: Scalars['AWSDateTime']['output'];
  exercises?: Maybe<Array<IExercise>>;
  id: Scalars['ID']['output'];
  memberId?: Maybe<Scalars['ID']['output']>;
  name: Scalars['String']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  tenantId: Scalars['ID']['output'];
  trainerId: Scalars['ID']['output'];
  updated_at: Scalars['AWSDateTime']['output'];
};

export type IWorkoutConnection = {
  __typename?: 'WorkoutConnection';
  items?: Maybe<Array<IWorkout>>;
  nextToken?: Maybe<Scalars['String']['output']>;
};
