import * as alexa from 'ask-sdk-core';
import {HandlerInput} from 'ask-sdk-core';

export const loadAttributesRequestInterceptor = {
    async process(handlerInput: HandlerInput) {
        const {attributesManager, requestEnvelope} = handlerInput;
        if (alexa.isNewSession(requestEnvelope)) {
            const persistentAttributes = (await attributesManager.getPersistentAttributes()) || {};
            console.log('Loading from persistent storage: ' + JSON.stringify(persistentAttributes));
            attributesManager.setSessionAttributes(persistentAttributes);
        }
    },
};
