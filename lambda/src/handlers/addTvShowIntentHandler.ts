import * as alexa from 'ask-sdk-core';
import {HandlerInput} from 'ask-sdk-core';
import i18n from 'i18next';
import {TvShow} from '../model/tvShow';
import {SessionAttributes} from '../model/sessionAttributes';
import {Slot, slu} from 'ask-sdk-model';
import Resolution = slu.entityresolution.Resolution;
import {showDetailsData, supportsAPL} from "./utils";

const axios = require('axios').default;
const showDetailsDocument = require('../documents/show_details.json');

const getAlexaEntitiesSlotResolutions = (slot: Slot) => {
    return (
        slot.resolutions &&
        slot.resolutions.resolutionsPerAuthority &&
        slot.resolutions.resolutionsPerAuthority.find(resolutionMatch)
    );
};

const getSlotResolutions = (slot: Slot) => {
    return (
        slot.resolutions &&
        slot.resolutions.resolutionsPerAuthority &&
        slot.resolutions.resolutionsPerAuthority.find((resolution) => resolution.status.code === 'ER_SUCCESS_MATCH')
    );
};

const resolutionMatch = (resolution: Resolution) => {
    return resolution.authority === 'AlexaEntities' && resolution.status.code === 'ER_SUCCESS_MATCH';
};

export const addTvShowIntentHandler = {
    canHandle(handlerInput: HandlerInput) {
        return (
            alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
            alexa.getIntentName(handlerInput.requestEnvelope) === 'AddTvShowIntent'
        );
    },
    async handle(handlerInput: HandlerInput) {
        let speakOutput;
        let showTitle = '';
        let showSeasons = 0;
        let showEpisodes = 0;
        let showReleaseDate = '';

        const tvShowProviderSlot = alexa.getSlot(handlerInput.requestEnvelope, 'tvShowProvider');
        let tvShowProvider = alexa.getSlotValue(handlerInput.requestEnvelope, 'tvShowProvider');
        const tvShowProviderSlotResolutions = getSlotResolutions(tvShowProviderSlot);
        if (!tvShowProviderSlotResolutions) {
            speakOutput = `Lo siento, no conozco la plataforma de series ${tvShowProvider}`;
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .withShouldEndSession(true)
                .getResponse();
        }

        const tvShowSlot = alexa.getSlot(handlerInput.requestEnvelope, 'tvShow');
        const tvShowName = alexa.getSlotValue(handlerInput.requestEnvelope, 'tvShow');
        const tvShowSlotResolutions = getAlexaEntitiesSlotResolutions(tvShowSlot);
        if (tvShowSlotResolutions) {
            const apiAccessToken = alexa.getApiAccessToken(handlerInput.requestEnvelope);
            const entityURL = tvShowSlotResolutions.values[0].value.id;
            const headers = {
                Authorization: `Bearer ${apiAccessToken}`,
                'Accept-Language': alexa.getLocale(handlerInput.requestEnvelope),
            };
            const response = await axios.get(entityURL, {headers});
            if (response.status === 200) {
                console.log(JSON.stringify(response.data));
                const entity = response.data;
                showTitle = entity.name[0]['@value']
                showReleaseDate = new Date(Date.parse(entity.version[0].releaseEvent[0].startDateTime[0]['@value'])).toLocaleDateString()
                showSeasons = entity.numberOfSeasons[0]['@value']
                showEpisodes = entity.numberOfEpisodes[0]['@value']
            }
        }

        const collator = new Intl.Collator('es', {sensitivity: 'base'});

        const sessionAttributes: SessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        let tvShows = sessionAttributes.tvShows;
        const tvShow = new TvShow(tvShowName, tvShowProvider);
        if (tvShows === undefined) {
            tvShows = [tvShow];
            speakOutput = i18n.t('ADD_TV_SHOW.ADDED', {tvShowName});
        } else if (tvShows.some(tvShow => collator.compare(tvShow.name, tvShowName) === 0)) {
            speakOutput = i18n.t('ADD_TV_SHOW.ALREADY_EXISTS', {tvShowName});
        } else {
            tvShows.push(tvShow);
            speakOutput = i18n.t('ADD_TV_SHOW.ADDED', {tvShowName});
        }
        sessionAttributes.tvShows = tvShows;

        if (supportsAPL(handlerInput)) {
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .addDirective({
                    type: 'Alexa.Presentation.APL.RenderDocument',
                    document: showDetailsDocument,
                    datasources: showDetailsData(showTitle, showSeasons, showEpisodes, tvShowProvider.toLocaleUpperCase()),
                })
                .withShouldEndSession(true)
                .getResponse();
        } else {
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .withShouldEndSession(true)
                .getResponse();
        }
    },
};
