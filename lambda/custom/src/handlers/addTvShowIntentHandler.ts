import * as alexa from 'ask-sdk-core';
import {HandlerInput} from 'ask-sdk-core';
import i18n from 'i18next';
import {TvShow} from '../model/tvShow';
import {SessionAttributes} from '../model/sessionAttributes';
import {slu} from 'ask-sdk-model';
import Resolution = slu.entityresolution.Resolution;

export const addTvShowIntentHandler = {
    canHandle(handlerInput: HandlerInput) {
        return (
            alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
            alexa.getIntentName(handlerInput.requestEnvelope) === 'AddTvShowIntent'
        );
    },
    handle(handlerInput: HandlerInput) {
        const tvShowName = alexa.getSlotValue(handlerInput.requestEnvelope, 'tvShow');
        const tvShowProviderSlot = alexa.getSlot(handlerInput.requestEnvelope, 'tvShowProvider');
        const tvShowProvider = tvShowProviderSlot.resolutions?.resolutionsPerAuthority?.pop()?.values.pop()
            ?.value.name;
        let speakOutput;

        const collator = new Intl.Collator('es', {sensitivity: 'base'});

        const sessionAttributes: SessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        let tvShows = sessionAttributes.tvShows;
        if (tvShows === undefined) {
            tvShows = [new TvShow(tvShowName, tvShowProvider)];
            speakOutput = i18n.t('ADD_TV_SHOW.ADDED', {tvShowName});
        } else if (tvShows.some(tvShow => collator.compare(tvShow.name, tvShowName) === 0)) {
            speakOutput = i18n.t('ADD_TV_SHOW.ALREADY_EXISTS', {tvShowName});
        } else {
            tvShows.push(new TvShow(tvShowName, tvShowProvider));
            speakOutput = i18n.t('ADD_TV_SHOW.ADDED', {tvShowName});
        }
        sessionAttributes.tvShows = tvShows;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withShouldEndSession(true)
            .getResponse();
    },
};
