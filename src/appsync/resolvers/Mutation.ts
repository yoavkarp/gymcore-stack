import { IMutation } from "../schema";
import { ResolverType } from "../types/ResolverType";

export const resolver: ResolverType<IMutation> = {
    createMeasurement: {
        dataSourceName: "api"
    },
    createMember: {
        dataSourceName: "api"
    },
    updateAuthenticatedMember: {
        dataSourceName: "api"
    },
    deleteMember: {
        dataSourceName: "api"
    },
    firstTimeMemberRegister: {
        dataSourceName: "api"
    }
}