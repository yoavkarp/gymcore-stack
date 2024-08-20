"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTenantModel = exports.tenantSchemaZod = void 0;
const zod_1 = require("zod");
const metadata_schema_1 = require("./metadata.schema");
const createModel_1 = require("@/layers/db-layer/nodejs/utils/createModel");
exports.tenantSchemaZod = zod_1.z.object({
    name: zod_1.z.string().min(2, "Name must be at least 2 characters long").max(50, "Name cannot exceed 50 characters"),
    logo: zod_1.z.string().url().optional(),
    address: zod_1.z.string().min(2, "Address must be at least 2 characters long").max(100, "Address cannot exceed 100 characters"),
    state: zod_1.z.string().min(2, "State must be at least 2 characters long").max(50, "State cannot exceed 50 characters"),
})
    .merge(metadata_schema_1.metadataSchema);
exports.getTenantModel = (0, createModel_1.createModel)("Tenant");
