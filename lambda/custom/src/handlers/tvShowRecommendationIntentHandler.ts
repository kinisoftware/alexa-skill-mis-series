import * as alexa from 'ask-sdk-core';
import {HandlerInput} from 'ask-sdk-core';
import i18n from 'i18next';
import {SessionAttributes} from '../model/sessionAttributes';
import {TvShow} from '../model/tvShow';

export const tvShowRecommendationIntentHandler = {
    canHandle(handlerInput: HandlerInput) {
        return (
            alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
            alexa.getIntentName(handlerInput.requestEnvelope) === 'TvShowRecommendationIntent'
        );
    },
    handle(handlerInput: HandlerInput) {
        const tvShowProviderSlot = alexa.getSlot(handlerInput.requestEnvelope, 'tvShowProvider');
        const tvShowProvider = tvShowProviderSlot.resolutions?.resolutionsPerAuthority?.pop()?.values.pop()
            ?.value.name;

        let speakOutput;
        const sessionAttributes: SessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        if (sessionAttributes.tvShows === undefined || sessionAttributes.tvShows.length === 0) {
            speakOutput = i18n.t('TV_SHOW_RECOMMENDATION.NO_TV_SHOW_MSG');
        } else {
            let tvShow;
            if (tvShowProvider) {
                const tvShowIndex = sessionAttributes.tvShows.findIndex(
                    tvShow => tvShow.provider === tvShowProvider
                );
                tvShow = sessionAttributes.tvShows[tvShowIndex];
                delete sessionAttributes.tvShows[tvShowIndex];
                if (tvShow === null) {
                    speakOutput = i18n.t('TV_SHOW_RECOMMENDATION.NO_TV_SHOW_FOR_PROVIDER', {tvShowProvider});
                }
                speakOutput = makeRecommendation(tvShow!!, tvShowProvider);
            } else {
                tvShow = sessionAttributes.tvShows.pop();
                speakOutput = makeRecommendation(tvShow!!);
            }
        }

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withShouldEndSession(true)
            .getResponse();
    },
};

function makeRecommendation(tvShow: TvShow, tvShowProvider?: string): string {
    const tvShowName = tvShow.name;
    if (tvShowProvider || tvShow.provider === 'unknown') {
        return i18n.t('TV_SHOW_RECOMMENDATION.RECOMMENDATION_MSG', {tvShowName});
    } else if (tvShow.provider !== 'unknown') {
        tvShowProvider = tvShow.provider;
        return i18n.t('TV_SHOW_RECOMMENDATION.RECOMMENDATION_MSG_WITH_PROVIDER', {
            tvShowName,
            tvShowProvider,
        });
    }

    return i18n.t('TV_SHOW_RECOMMENDATION.RECOMMENDATION_MSG', {tvShowName});
}
