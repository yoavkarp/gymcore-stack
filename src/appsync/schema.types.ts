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
  AWSDate: { input: any; output: any; }
  AWSDateTime: { input: any; output: any; }
  AWSEmail: { input: any; output: any; }
  AWSIPAddress: { input: any; output: any; }
  AWSJSON: { input: any; output: any; }
  AWSPhone: { input: any; output: any; }
  AWSTime: { input: any; output: any; }
  AWSTimestamp: { input: any; output: any; }
  AWSURL: { input: any; output: any; }
};

export type ActiveDropSetData = {
  __typename?: 'ActiveDropSetData';
  reps?: Maybe<ActiveRangedUnit>;
  weight?: Maybe<ActiveRangedUnit>;
};

export type ActiveRangedUnit = {
  __typename?: 'ActiveRangedUnit';
  done?: Maybe<Scalars['Float']['output']>;
  max?: Maybe<Scalars['Float']['output']>;
  min?: Maybe<Scalars['Float']['output']>;
  unit?: Maybe<Scalars['String']['output']>;
};

export type ActiveWorkout = {
  __typename?: 'ActiveWorkout';
  endAt?: Maybe<Scalars['AWSTimestamp']['output']>;
  exercises?: Maybe<Array<ActiveWorkoutExercise>>;
  id: Scalars['ID']['output'];
  member?: Maybe<Member>;
  memberId: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  plan?: Maybe<Plan>;
  planId?: Maybe<Scalars['ID']['output']>;
  startAt: Scalars['AWSTimestamp']['output'];
  workout: Workout;
  workoutId: Scalars['ID']['output'];
};

export type ActiveWorkoutConnection = {
  __typename?: 'ActiveWorkoutConnection';
  items?: Maybe<Array<ActiveWorkout>>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type ActiveWorkoutExercise = {
  __typename?: 'ActiveWorkoutExercise';
  createdAt: Scalars['AWSTimestamp']['output'];
  data?: Maybe<Array<ActiveWorkoutExerciseData>>;
  description?: Maybe<Scalars['String']['output']>;
  exercise?: Maybe<Exercise>;
  exerciseId: Scalars['ID']['output'];
  group?: Maybe<Array<Maybe<ActiveWorkoutExercise>>>;
  id: Scalars['ID']['output'];
  mn?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  sh?: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
  updatedAt: Scalars['AWSTimestamp']['output'];
};

export type ActiveWorkoutExerciseData = {
  __typename?: 'ActiveWorkoutExerciseData';
  angle?: Maybe<Scalars['Float']['output']>;
  dis?: Maybe<Scalars['Float']['output']>;
  dropsets?: Maybe<Array<Maybe<ActiveDropSetData>>>;
  intens?: Maybe<ActiveRangedUnit>;
  reps?: Maybe<ActiveRangedUnit>;
  resist?: Maybe<Scalars['Float']['output']>;
  rest?: Maybe<ActiveRangedUnit>;
  tempo?: Maybe<Scalars['Float']['output']>;
  thr?: Maybe<ActiveRangedUnit>;
  time?: Maybe<Scalars['Float']['output']>;
  weight?: Maybe<ActiveRangedUnit>;
};

export type Club = {
  __typename?: 'Club';
  createdAt: Scalars['AWSTimestamp']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  tenant: Tenant;
  tenantId: Scalars['ID']['output'];
  updatedAt: Scalars['AWSTimestamp']['output'];
  user: User;
  userId: Scalars['ID']['output'];
};

export type CompletedWorkout = {
  __typename?: 'CompletedWorkout';
  activeWorkout?: Maybe<ActiveWorkout>;
  activeWorkoutId: Scalars['ID']['output'];
  time: Scalars['AWSTimestamp']['output'];
  workout?: Maybe<Workout>;
  workoutId: Scalars['ID']['output'];
};

export type CreateMemberInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
};

export type DropSetData = {
  __typename?: 'DropSetData';
  reps?: Maybe<RangedUnit>;
  weight?: Maybe<RangedUnit>;
};

export type Event = {
  __typename?: 'Event';
  club: Club;
  clubId: Scalars['ID']['output'];
  createdAt: Scalars['AWSTimestamp']['output'];
  endAt: Scalars['AWSTimestamp']['output'];
  id: Scalars['ID']['output'];
  member?: Maybe<Member>;
  memberId: Scalars['ID']['output'];
  plan?: Maybe<Plan>;
  planId?: Maybe<Scalars['ID']['output']>;
  startAt: Scalars['AWSTimestamp']['output'];
  tenant: Tenant;
  tenantId: Scalars['ID']['output'];
  trainer?: Maybe<Trainer>;
  trainerId: Scalars['ID']['output'];
  updatedAt: Scalars['AWSTimestamp']['output'];
};

export type EventConnection = {
  __typename?: 'EventConnection';
  items?: Maybe<Array<Event>>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type Exercise = {
  __typename?: 'Exercise';
  createdAt: Scalars['AWSTimestamp']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  tenant?: Maybe<Tenant>;
  tenantId?: Maybe<Scalars['ID']['output']>;
  updatedAt: Scalars['AWSTimestamp']['output'];
  video?: Maybe<Scalars['AWSURL']['output']>;
};

export type ExerciseConnection = {
  __typename?: 'ExerciseConnection';
  items?: Maybe<Array<Exercise>>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type Goal = {
  __typename?: 'Goal';
  created_at: Scalars['AWSTimestamp']['output'];
  name: Scalars['String']['output'];
  status: Scalars['String']['output'];
  updated_at: Scalars['AWSTimestamp']['output'];
  user: User;
  userId: Scalars['ID']['output'];
};

export type GoalConnection = {
  __typename?: 'GoalConnection';
  items?: Maybe<Array<Goal>>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type LibraryWorkout = {
  __typename?: 'LibraryWorkout';
  club?: Maybe<Club>;
  clubId?: Maybe<Scalars['ID']['output']>;
  created_at: Scalars['AWSTimestamp']['output'];
  description?: Maybe<Scalars['String']['output']>;
  exercises?: Maybe<Array<WorkoutExercise>>;
  id: Scalars['ID']['output'];
  level?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  trainer?: Maybe<Trainer>;
  trainerId: Scalars['ID']['output'];
  updated_at: Scalars['AWSTimestamp']['output'];
};

export type LibraryWorkoutConnection = {
  __typename?: 'LibraryWorkoutConnection';
  items?: Maybe<Array<LibraryWorkout>>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type ListQueryInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
};

export type Measurement = {
  __typename?: 'Measurement';
  age: Scalars['Float']['output'];
  bmi?: Maybe<Scalars['Float']['output']>;
  bmr?: Maybe<Scalars['Float']['output']>;
  createdAt: Scalars['AWSTimestamp']['output'];
  fat?: Maybe<Scalars['Float']['output']>;
  heartRate?: Maybe<Scalars['Float']['output']>;
  height?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  member?: Maybe<Member>;
  memberId: Scalars['ID']['output'];
  updatedAt: Scalars['AWSTimestamp']['output'];
  weight?: Maybe<Scalars['Float']['output']>;
};

export type MeasurementConnection = {
  __typename?: 'MeasurementConnection';
  items?: Maybe<Array<Measurement>>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type Member = {
  __typename?: 'Member';
  activePlan?: Maybe<Plan>;
  activePlanId?: Maybe<Scalars['ID']['output']>;
  activeWorkout?: Maybe<ActiveWorkout>;
  createdAt: Scalars['AWSTimestamp']['output'];
  id: Scalars['ID']['output'];
  level?: Maybe<Scalars['String']['output']>;
  profileWorkouts?: Maybe<WorkoutConnection>;
  tenant: Tenant;
  tenantId: Scalars['ID']['output'];
  updatedAt: Scalars['AWSTimestamp']['output'];
  user: User;
  userId: Scalars['ID']['output'];
  weeklyAvailability?: Maybe<Scalars['Int']['output']>;
};

export type MemberConnection = {
  __typename?: 'MemberConnection';
  items?: Maybe<Array<Member>>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createMember?: Maybe<Member>;
  deleteMember?: Maybe<Member>;
};


export type MutationCreateMemberArgs = {
  input: CreateMemberInput;
};


export type MutationDeleteMemberArgs = {
  memberId: Scalars['ID']['input'];
};

export type Plan = {
  __typename?: 'Plan';
  club?: Maybe<Club>;
  clubId: Scalars['ID']['output'];
  completed?: Maybe<Array<CompletedWorkout>>;
  createdAt: Scalars['AWSTimestamp']['output'];
  events?: Maybe<EventConnection>;
  id: Scalars['ID']['output'];
  meetings: Scalars['Int']['output'];
  member?: Maybe<Member>;
  memberId: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  trainer?: Maybe<Trainer>;
  trainerId: Scalars['ID']['output'];
  trainingPlanId: Scalars['ID']['output'];
  updatedAt: Scalars['AWSTimestamp']['output'];
  weeks: Scalars['Int']['output'];
  workouts?: Maybe<WorkoutConnection>;
};

export type PlanConnection = {
  __typename?: 'PlanConnection';
  items?: Maybe<Array<Plan>>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  getAuthData?: Maybe<Member>;
  getMemberById?: Maybe<Member>;
  searchMembers?: Maybe<Array<Member>>;
};


export type QueryGetMemberByIdArgs = {
  memberId: Scalars['String']['input'];
};


export type QuerySearchMembersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  query: Scalars['String']['input'];
};

export type RangedUnit = {
  __typename?: 'RangedUnit';
  max?: Maybe<Scalars['Float']['output']>;
  min?: Maybe<Scalars['Float']['output']>;
  unit?: Maybe<Scalars['String']['output']>;
};

export type Tenant = {
  __typename?: 'Tenant';
  createdAt: Scalars['AWSTimestamp']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['AWSTimestamp']['output'];
  user: User;
  userId: Scalars['ID']['output'];
};

export type Trainer = {
  __typename?: 'Trainer';
  club: Club;
  clubId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  tenant: Tenant;
  tenantId: Scalars['ID']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type TrainerConnection = {
  __typename?: 'TrainerConnection';
  items?: Maybe<Array<Trainer>>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type TrainingPlan = {
  __typename?: 'TrainingPlan';
  club?: Maybe<Club>;
  clubId?: Maybe<Scalars['ID']['output']>;
  createdAt: Scalars['AWSTimestamp']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  member?: Maybe<Member>;
  memberId: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  trainer?: Maybe<Trainer>;
  trainerId: Scalars['ID']['output'];
  updatedAt: Scalars['AWSTimestamp']['output'];
  workouts?: Maybe<Array<Workout>>;
  workouts_ids?: Maybe<Array<Scalars['ID']['output']>>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['AWSTimestamp']['output'];
  email: Scalars['AWSEmail']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  phoneNumber: Scalars['AWSPhone']['output'];
  updatedAt: Scalars['AWSTimestamp']['output'];
};

export type Workout = {
  __typename?: 'Workout';
  club?: Maybe<Club>;
  clubId?: Maybe<Scalars['ID']['output']>;
  createdAt: Scalars['AWSTimestamp']['output'];
  exercises?: Maybe<Array<WorkoutExercise>>;
  id: Scalars['ID']['output'];
  level?: Maybe<Scalars['String']['output']>;
  member?: Maybe<Member>;
  memberId: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  trainer?: Maybe<Trainer>;
  trainerId: Scalars['ID']['output'];
  updatedAt: Scalars['AWSTimestamp']['output'];
};

export type WorkoutConnection = {
  __typename?: 'WorkoutConnection';
  items?: Maybe<Array<Workout>>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type WorkoutExercise = {
  __typename?: 'WorkoutExercise';
  createdAt: Scalars['AWSTimestamp']['output'];
  data?: Maybe<Array<WorkoutExerciseData>>;
  exercise?: Maybe<Exercise>;
  exerciseId: Scalars['ID']['output'];
  group?: Maybe<Array<Maybe<WorkoutExercise>>>;
  id: Scalars['ID']['output'];
  mn?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  sh?: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
  updatedAt: Scalars['AWSTimestamp']['output'];
};

export type WorkoutExerciseData = {
  __typename?: 'WorkoutExerciseData';
  angle?: Maybe<Scalars['Float']['output']>;
  dis?: Maybe<Scalars['Float']['output']>;
  dropsets?: Maybe<Array<Maybe<DropSetData>>>;
  intens?: Maybe<RangedUnit>;
  reps?: Maybe<RangedUnit>;
  resist?: Maybe<Scalars['Float']['output']>;
  rest?: Maybe<RangedUnit>;
  tempo?: Maybe<Scalars['Float']['output']>;
  thr?: Maybe<RangedUnit>;
  time?: Maybe<Scalars['Float']['output']>;
  weight?: Maybe<RangedUnit>;
};
