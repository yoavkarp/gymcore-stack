import { IQuery } from "../schema";
import { ResolverType } from "../types/ResolverType";

export const resolver: ResolverType<IQuery> = {
    getClubById: {
        dataSourceName: "api"
    },
    getAuthenticatedClub: {
        dataSourceName: "api"
    },
    getAuthenticatedMember: {
        dataSourceName: "api"
    },
    getMemberById: {
        dataSourceName: "api"
    },
    getTenant: {
        dataSourceName: "api"
    }
}