import { Construct } from 'constructs';
import { aws_lambda as lambda } from 'aws-cdk-lib';
export interface LayerConstructProps {
    layerFolder: string;
    runtime?: lambda.Runtime;
    rootLayerPath?: string;
    layerName?: string;
    tags?: {
        [key: string]: string;
    };
}
export declare class LayerConstruct extends Construct {
    readonly layerVersion: lambda.LayerVersion;
    private readonly rootLayerPath;
    private readonly runtime;
    private readonly layerName;
    private readonly tags?;
    constructor(scope: Construct, id: string, props: LayerConstructProps);
}
