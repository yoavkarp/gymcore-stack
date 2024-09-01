import { MappingTemplate } from "@aws-cdk/aws-appsync-alpha"

export type ResolverType<T extends {} = {}> = {
    [x in keyof Omit<T, '__typename'>]?: ResolverData
}

export type ResolverData = {
    req?: MappingTemplate,
    res?: MappingTemplate,
    dataSourceName: "api" |
    "UserTable_DataSource" |
    "ClubTable_DataSource" |
    "MeasurementTable_DataSource" |
    "MemberTable_DataSource" |
    "TenantTable_DataSource"
}