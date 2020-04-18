import * as alexa from 'ask-sdk-core';
import {HandlerInput} from 'ask-sdk-core';
import {Response} from 'ask-sdk-model';
import {SessionAttributes} from '../model/sessionAttributes';

export const saveAttributesResponseInterceptor = {
    async process(handlerInput: HandlerInput, response: Response) {
        if (!response) return; // avoid intercepting calls that have no outgoing response due to errors

        const {attributesManager, requestEnvelope} = handlerInput;
        const sessionAttributes: SessionAttributes = attributesManager.getSessionAttributes();
        const shouldEndSession =
            typeof response.shouldEndSession === 'undefined' ? true : response.shouldEndSession; //is this a session end?
        if (shouldEndSession || alexa.getRequestType(requestEnvelope) === 'SessionEndedRequest') {
            // skill was stopped or timed out
            console.log('Saving to persistent storage:' + JSON.stringify(sessionAttributes.tvShows));
            attributesManager.setPersistentAttributes({tvShows: sessionAttributes.tvShows});
            await attributesManager.savePersistentAttributes();
        }
    },
};
