"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GymcoreCdkStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const layer_construct_1 = require("./layers/layer-construct");
const tenant_construct_1 = require("./tenant-construct");
const members_lambda_1 = __importDefault(require("./appsync/datasources/members-lambda"));
const tenants = [{
        name: "HolmesPlace",
        databaseTenantId: "64db69f87e27a3bafccd3b02"
    }];
class GymcoreCdkStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        this.databaseLayer = new layer_construct_1.LayerConstruct(this, 'db-layer', {
            layerFolder: 'db-layer',
        });
        this.tenants = tenants.map((tenant) => new tenant_construct_1.TenantConstruct(this, tenant.name, {
            name: tenant.name,
            lambdas: [
                (0, members_lambda_1.default)(this, [this.databaseLayer.layerVersion], tenant.databaseTenantId),
            ]
        }));
    }
}
exports.GymcoreCdkStack = GymcoreCdkStack;
