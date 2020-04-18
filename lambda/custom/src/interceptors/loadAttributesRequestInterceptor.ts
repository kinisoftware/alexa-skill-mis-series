import * as alexa from 'ask-sdk-core';
import {HandlerInput} from 'ask-sdk-core';
import {SessionAttributes} from '../model/sessionAttributes';

export const loadAttributesRequestInterceptor = {
    async process(handlerInput: HandlerInput) {
        const {attributesManager, requestEnvelope} = handlerInput;
        if (alexa.isNewSession(requestEnvelope)) {
            const persistentAttributes = await attributesManager.getPersistentAttributes();
            let sessionAttributes: SessionAttributes;
            if (!('tvShows' in persistentAttributes)) {
                sessionAttributes = {
                    firstTime: true,
                    tvShows: [],
                };
            } else {
                sessionAttributes = {
                    firstTime: false,
                    tvShows: persistentAttributes.tvShows,
                };
            }
            console.log('Loading from persistent storage: ' + JSON.stringify(sessionAttributes));
            attributesManager.setSessionAttributes(sessionAttributes);
        }
    },
};
