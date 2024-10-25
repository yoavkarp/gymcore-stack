import { IMutation } from "../schema";
import { ResolverType } from "../types/ResolverType";

export const resolver: ResolverType<IMutation> = {
    createMeasurement: {
        dataSourceName: "api"
    },
    createMember: {
        dataSourceName: "api"
    },
    createMeasurementForMember: {
        dataSourceName: "api"
    },
    createTrainer: {
        dataSourceName: "api"
    },
    createWorkout: {
        dataSourceName: "api"
    },
    addExerciseToWorkout: {
        dataSourceName: "api"
    },
    updateExerciseInWorkout: {
        dataSourceName: "api"
    },
    addSetToExercise: {
        dataSourceName: "api"
    },
    updateSetInExercise: {
        dataSourceName: "api"
    },
    addIntervalToExercise: {
        dataSourceName: "api"
    },
    updateIntervalInExercise: {
        dataSourceName: "api"
    },
    updateWorkout: {
        dataSourceName: "api"
    },
    deleteExerciseFromWorkout: {
        dataSourceName: "api"
    },
    deleteIntervalFromExercise: {
        dataSourceName: "api"
    },
    deleteSetFromExercise: {
        dataSourceName: "api"
    },
    deleteWorkout: {
        dataSourceName: "api"
    },
    addWorkoutToLibrary: {
        dataSourceName: "api"
    },
    moveExerciseInWorkout: {
        dataSourceName: "api"
    },
    moveIntervalInExercise: {
        dataSourceName: "api"
    },
    moveSetInExercise: {
        dataSourceName: "api"
    },
    importWorkoutFromLibrary: {
        dataSourceName: "api"
    },
    createPlan: {
        dataSourceName: "api"
    },
    deletePlan: {
        dataSourceName: "api"
    },
    deleteEvent: {
        dataSourceName: "api"
    },
    createEvent: {
        dataSourceName: "api"
    },
    endActiveWorkout: {
        dataSourceName: "api"
    },
    endActiveWorkoutDropset: {
        dataSourceName: "api"
    },
    endActiveWorkoutInterval: {
        dataSourceName: "api"
    },
    endActiveWorkoutSet: {
        dataSourceName: "api"
    },
    startActiveWorkout: {
        dataSourceName: "api"
    },
    updateMemberProfile: {
        dataSourceName: "api"
    }
}