import { PreTokenGenerationTriggerHandler } from "aws-lambda";

export const handler: PreTokenGenerationTriggerHandler = async (event) => {
    if (event.triggerSource === 'TokenGeneration_NewPasswordChallenge') {
        console.log(event.request.userAttributes)
    }
    return event;
}