import * as alexa from 'ask-sdk-core';
import {HandlerInput} from 'ask-sdk-core';
import i18n from 'i18next';

export const launchRequestHandler = {
    canHandle(handlerInput: HandlerInput) {
        return alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput: HandlerInput) {
        const speakOutput = i18n.t('WELCOME.MSG') + i18n.t('WELCOME.PROMPT');
        const reprompt = i18n.t('WELCOME.REPROMPT');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(reprompt)
            .getResponse();
    },
};
