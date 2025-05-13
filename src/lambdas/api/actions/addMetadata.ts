type MetadataFields = {
    created_at: string;
    updated_at: string;
    tenantId: string;
    created_uid: string;
    updated_uid: string;
}

type UpdateMetadataFields = {
    updated_at: string;
    updated_uid: string;
}

type CreateMetadataFn = <T extends {} = {}>(tenantId: string, object: T, userId: string) => T & MetadataFields;

type UpdateMetadataFn = <T extends {} = {}>(tenantId: string, object: T, userId: string) => T & UpdateMetadataFields;


export const addCreateMetadata: CreateMetadataFn = (tenantId, object, userId) => {
    return {
        ...object,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        tenantId,
        created_uid: userId,
        updated_uid: userId
    }
}

export const addUpdateMetadata: UpdateMetadataFn = (tenantId, object, userId) => {
    return {
        ...object,
        updated_at: new Date().toISOString(),
        updated_uid: userId
    }
}