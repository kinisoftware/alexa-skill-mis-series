import * as alexa from 'ask-sdk-core';
import {HandlerInput} from 'ask-sdk-core';
import i18n from 'i18next';
import {TvShow} from '../model/tvShow';
import {SessionAttributes} from '../model/sessionAttributes';

export const addTvShowIntentHandler = {
    canHandle(handlerInput: HandlerInput) {
        return (
            alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
            alexa.getIntentName(handlerInput.requestEnvelope) === 'AddTvShowIntent'
        );
    },
    handle(handlerInput: HandlerInput) {
        const tvShowName = alexa.getSlotValue(handlerInput.requestEnvelope, 'tvShow');
        let speakOutput;

        const sessionAttributes: SessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        let tvShows = sessionAttributes.tvShows;
        if (tvShows === undefined) {
            tvShows = [new TvShow(tvShowName)];
            speakOutput = i18n.t('ADD_TV_SHOW.ADDED', {tvShowName});
        } else if (tvShows.some(tvShow => tvShow.name === tvShowName)) {
            speakOutput = i18n.t('ADD_TV_SHOW.ALREADY_EXISTS', {tvShowName});
        } else {
            tvShows.push(new TvShow(tvShowName));
            speakOutput = i18n.t('ADD_TV_SHOW.ADDED', {tvShowName});
        }
        sessionAttributes.tvShows = tvShows;

        return handlerInput.responseBuilder.speak(speakOutput).getResponse();
    },
};
