import * as alexa from 'ask-sdk-core';
import {HandlerInput} from 'ask-sdk-core';
import i18n from 'i18next';
import {SessionAttributes} from '../model/sessionAttributes';

export const launchRequestHandler = {
    canHandle(handlerInput: HandlerInput) {
        return alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput: HandlerInput) {
        let speakOutput;
        const reprompt = i18n.t('WELCOME.REPROMPT');

        const sessionAttributes: SessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        if (sessionAttributes.firstTime) {
            speakOutput = i18n.t('WELCOME.MSG.FIRST_TIME') + i18n.t('WELCOME.PROMPT.NO_TV_SHOW');
        } else if (sessionAttributes.tvShows.length === 0) {
            speakOutput = i18n.t('WELCOME.MSG.NO_FIRST_TIME') + i18n.t('WELCOME.PROMPT.NO_TV_SHOW');
        } else {
            speakOutput = i18n.t('WELCOME.MSG.NO_FIRST_TIME') + i18n.t('WELCOME.PROMPT.WITH_TV_SHOWS');
        }

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(reprompt)
            .getResponse();
    },
};
