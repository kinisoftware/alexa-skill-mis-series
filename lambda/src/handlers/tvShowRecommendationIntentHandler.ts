import * as alexa from 'ask-sdk-core';
import {HandlerInput} from 'ask-sdk-core';
import i18n from 'i18next';
import {SessionAttributes} from '../model/sessionAttributes';
import {Slot} from "ask-sdk-model";


const getSlotResolutions = (slot: Slot) => {
    return (
        slot.resolutions &&
        slot.resolutions.resolutionsPerAuthority &&
        slot.resolutions.resolutionsPerAuthority.find((resolution) => resolution.status.code === 'ER_SUCCESS_MATCH')
    );
};

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

        const tvShowProviderSlot = alexa.getSlot(handlerInput.requestEnvelope, 'tvShowProvider');
        let tvShowProvider = alexa.getSlotValue(handlerInput.requestEnvelope, 'tvShowProvider');
        if (!tvShowProvider) {
            if (sessionAttributes.tvShows === undefined || sessionAttributes.tvShows.length === 0) {
                speakOutput = i18n.t('TV_SHOW_RECOMMENDATION.NO_TV_SHOW_MSG');
            } else {
                const tvShow = sessionAttributes.tvShows.pop();
                const tvShowName = tvShow!!.name;
                speakOutput = i18n.t('TV_SHOW_RECOMMENDATION.RECOMMENDATION_MSG', {tvShowName});
            }
        } else {
            const tvShowProviderSlotResolutions = getSlotResolutions(tvShowProviderSlot);
            if (!tvShowProviderSlotResolutions) {
                speakOutput = `Lo siento, no conozco la plataforma de series ${tvShowProvider}`;
            } else {

                if (sessionAttributes.tvShows === undefined || sessionAttributes.tvShows.length === 0) {
                    speakOutput = i18n.t('TV_SHOW_RECOMMENDATION.NO_TV_SHOW_MSG');
                } else if (sessionAttributes.tvShows.findIndex((tvShow) => tvShow.provider === tvShowProvider) === -1) {
                    speakOutput = `Lo siento, no tengo recomendaciones para ver en ${tvShowProvider}`;
                } else {
                    const tvShowIndex = sessionAttributes.tvShows.findIndex((tvShow) => tvShow.provider === tvShowProvider);
                    const tvShow = sessionAttributes.tvShows[tvShowIndex];
                    delete sessionAttributes.tvShows[tvShowIndex];
                    const tvShowName = tvShow!!.name;
                    speakOutput = i18n.t('TV_SHOW_RECOMMENDATION.RECOMMENDATION_MSG', {tvShowName});
                }
            }
        }

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withShouldEndSession(true)
            .getResponse();
    },
};
