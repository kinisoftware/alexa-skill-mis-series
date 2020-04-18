import * as alexa from 'ask-sdk-core';
import {HandlerInput} from 'ask-sdk-core';
import i18n from 'i18next';

export const addTvShowIntentHandler = {
    canHandle(handlerInput: HandlerInput) {
        return (
            alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
            alexa.getIntentName(handlerInput.requestEnvelope) === 'AddTvShowIntent'
        );
    },
    handle(handlerInput: HandlerInput) {
        const tvShow = alexa.getSlotValue(handlerInput.requestEnvelope, 'tvShow');
        const speakOutput = i18n.t('ADD_TV_SHOW_MSG', {tvShow});

        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        if (sessionAttributes.tvShows === undefined) {
            sessionAttributes.tvShows = [tvShow];
        } else {
            sessionAttributes.tvShows.push(tvShow);
        }

        return handlerInput.responseBuilder.speak(speakOutput).getResponse();
    },
};
