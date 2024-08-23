import { Construct } from 'constructs';
import { aws_lambda as lambda } from 'aws-cdk-lib';
import { Tags } from 'aws-cdk-lib'
import * as path from 'path';
import { Runtime } from 'aws-cdk-lib/aws-lambda';

export interface LayerConstructProps {
    layerFolder: string;
    runtime?: lambda.Runtime;
    rootLayerPath?: string;
    layerName?: string;
    tags?: { [key: string]: string };
}

export class LayerConstruct extends Construct {
    public readonly layerVersion: lambda.LayerVersion;

    private readonly rootLayerPath: string = path.join("src", "layers");
    private readonly runtime: lambda.Runtime = Runtime.NODEJS_18_X;
    private readonly layerName: string;
    private readonly tags?: { [key: string]: string };


    constructor(scope: Construct, id: string, props: LayerConstructProps) {
        super(scope, id);

        // define layer root path
        if (props.rootLayerPath) {
            this.rootLayerPath = props.rootLayerPath
        }

        // define alternate runtime
        if (props.runtime) {
            this.runtime = props.runtime
        }

        // define layer name
        if (props.layerName) {
            this.layerName = props.layerName
        }
        else {
            this.layerName = props.layerFolder
        }

        // define tags if exist
        if (props.tags) {
            this.tags = props.tags
        }

        const fullPath = path.join(this.rootLayerPath, props.layerFolder);

        // Define the Lambda Layer
        this.layerVersion = new lambda.LayerVersion(this, "layer", {
            compatibleRuntimes: [this.runtime],
            layerVersionName: this.layerName,
            code: lambda.Code.fromAsset(fullPath),
        });

        if (this.tags) {
            Object.keys(this.tags).forEach((tagKey: string) => {
                const tagValue = this.tags![tagKey];
                Tags.of(this.layerVersion).add(tagKey, tagValue);
            });
        }
    }
}