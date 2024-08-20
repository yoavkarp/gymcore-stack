"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LayerConstruct = void 0;
const constructs_1 = require("constructs");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_cdk_lib_2 = require("aws-cdk-lib");
const path = __importStar(require("path"));
const aws_lambda_1 = require("aws-cdk-lib/aws-lambda");
class LayerConstruct extends constructs_1.Construct {
    constructor(scope, id, props) {
        super(scope, id);
        this.rootLayerPath = path.join(__dirname);
        this.runtime = aws_lambda_1.Runtime.NODEJS_18_X;
        // define layer root path
        if (props.rootLayerPath) {
            this.rootLayerPath = props.rootLayerPath;
        }
        // define alternate runtime
        if (props.runtime) {
            this.runtime = props.runtime;
        }
        // define layer name
        if (props.layerName) {
            this.layerName = props.layerName;
        }
        else {
            this.layerName = props.layerFolder;
        }
        // define tags if exist
        if (props.tags) {
            this.tags = props.tags;
        }
        const fullPath = path.join(this.rootLayerPath, props.layerFolder);
        // Define the Lambda Layer
        this.layerVersion = new aws_cdk_lib_1.aws_lambda.LayerVersion(this, "layer", {
            compatibleRuntimes: [this.runtime],
            layerVersionName: this.layerName,
            code: aws_cdk_lib_1.aws_lambda.Code.fromAsset(fullPath),
        });
        if (this.tags) {
            Object.keys(this.tags).forEach((tagKey) => {
                const tagValue = this.tags[tagKey];
                aws_cdk_lib_2.Tags.of(this.layerVersion).add(tagKey, tagValue);
            });
        }
    }
}
exports.LayerConstruct = LayerConstruct;
