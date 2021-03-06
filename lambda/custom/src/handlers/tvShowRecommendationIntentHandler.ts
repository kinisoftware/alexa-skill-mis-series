import * as alexa from 'ask-sdk-core';
import {HandlerInput} from 'ask-sdk-core';
import i18n from 'i18next';
import {SessionAttributes} from '../model/sessionAttributes';

export const tvShowRecommendationIntentHandler = {
    canHandle(handlerInput: HandlerInput) {
        return (
            alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
            alexa.getIntentName(handlerInput.requestEnvelope) === 'TvShowRecommendationIntent'
        );
    },
    handle(handlerInput: HandlerInput) {
        let speakOutput;
        const sessionAttributes: SessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        if (sessionAttributes.tvShows === undefined || sessionAttributes.tvShows.length === 0) {
            speakOutput = i18n.t('TV_SHOW_RECOMMENDATION.NO_TV_SHOW_MSG');
        } else {
            const tvShow = sessionAttributes.tvShows.pop();
            const tvShowName = tvShow!!.name;
            speakOutput = i18n.t('TV_SHOW_RECOMMENDATION.RECOMMENDATION_MSG', {tvShowName});
        }

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withShouldEndSession(true)
            .getResponse();
    },
};
