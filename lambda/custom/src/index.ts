import * as alexa from 'ask-sdk-core';
import {HandlerInput} from 'ask-sdk-core';
import i18n from 'i18next';
import {Response} from 'ask-sdk-model';
import InitOptions = i18n.InitOptions;
import {DynamoDbPersistenceAdapter} from 'ask-sdk-dynamodb-persistence-adapter';

const languageStrings = require('./languageStrings');

const launchRequestHandler = {
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

const addTvShowIntentHandler = {
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

const tvShowRecommendationIntentHandler = {
    canHandle(handlerInput: HandlerInput) {
        return (
            alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
            alexa.getIntentName(handlerInput.requestEnvelope) === 'TvShowRecommendationIntent'
        );
    },
    handle(handlerInput: HandlerInput) {
        let speakOutput;
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        if (sessionAttributes.tvShows === undefined || sessionAttributes.tvShows.length === 0) {
            speakOutput = i18n.t('TV_SHOW_RECOMMENDATION.NO_TV_SHOW_MSG');
        } else {
            const tvShow = sessionAttributes.tvShows.pop();
            speakOutput = i18n.t('TV_SHOW_RECOMMENDATION.RECOMMENDATION_MSG', {tvShow});
        }

        return handlerInput.responseBuilder.speak(speakOutput).getResponse();
    },
};

const helpIntentHandler = {
    canHandle(handlerInput: HandlerInput) {
        return (
            alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
            alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent'
        );
    },
    handle(handlerInput: HandlerInput) {
        const speakOutput = i18n.t('HELP_MSG');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    },
};

const cancelAndStopIntentHandler = {
    canHandle(handlerInput: HandlerInput) {
        return (
            alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
            (alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent' ||
                alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent')
        );
    },
    handle(handlerInput: HandlerInput) {
        const speakOutput = i18n.t('GOODBYE_MSG');

        return handlerInput.responseBuilder.speak(speakOutput).getResponse();
    },
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet
 * */
const fallbackIntentHandler = {
    canHandle(handlerInput: HandlerInput) {
        return (
            alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
            alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent'
        );
    },
    handle(handlerInput: HandlerInput) {
        const speakOutput = i18n.t('FALLBACK_MSG');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    },
};
/**
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs
 */
const sessionEndedRequestHandler = {
    canHandle(handlerInput: HandlerInput) {
        return alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput: HandlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    },
};
/**
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents
 * by defining them above, then also adding them to the request handler chain below
 */
const intentReflectorHandler = {
    canHandle(handlerInput: HandlerInput) {
        return alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput: HandlerInput) {
        const intentName = alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = i18n.t('REFLECTOR_MSG', {intentName});

        return (
            handlerInput.responseBuilder
                .speak(speakOutput)
                //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
                .getResponse()
        );
    },
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below
 */
const errorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput: HandlerInput, error: Error) {
        const speakOutput = i18n.t('ERROR_MSG');
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    },
};

// This request interceptor will bind a translation function 't' to the handlerInput
const localisationRequestInterceptor = {
    process(handlerInput: HandlerInput) {
        i18n.init({
            lng: alexa.getLocale(handlerInput.requestEnvelope),
            resources: languageStrings,
        } as InitOptions);
    },
};

const loggingRequestInterceptor = {
    process(handlerInput: HandlerInput) {
        console.log(`Incoming request: ${JSON.stringify(handlerInput.requestEnvelope)}`);
    },
};

const loggingResponseInterceptor = {
    process(handlerInput: HandlerInput, response: Response) {
        console.log(`Outgoing response: ${JSON.stringify(response)}`);
    },
};

const loadAttributesRequestInterceptor = {
    async process(handlerInput: HandlerInput) {
        const {attributesManager, requestEnvelope} = handlerInput;
        if (alexa.isNewSession(requestEnvelope)) {
            const persistentAttributes = (await attributesManager.getPersistentAttributes()) || {};
            console.log('Loading from persistent storage: ' + JSON.stringify(persistentAttributes));
            attributesManager.setSessionAttributes(persistentAttributes);
        }
    },
};

const saveAttributesResponseInterceptor = {
    async process(handlerInput: HandlerInput, response: Response) {
        if (!response) return; // avoid intercepting calls that have no outgoing response due to errors

        const {attributesManager, requestEnvelope} = handlerInput;
        const sessionAttributes = attributesManager.getSessionAttributes();
        const shouldEndSession =
            typeof response.shouldEndSession === 'undefined' ? true : response.shouldEndSession; //is this a session end?
        if (shouldEndSession || alexa.getRequestType(requestEnvelope) === 'SessionEndedRequest') {
            // skill was stopped or timed out
            console.log('Saving to persistent storage:' + JSON.stringify(sessionAttributes));
            attributesManager.setPersistentAttributes(sessionAttributes);
            await attributesManager.savePersistentAttributes();
        }
    },
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom
 */
exports.handler = alexa.SkillBuilders.custom()
    .addRequestHandlers(
        launchRequestHandler,
        addTvShowIntentHandler,
        tvShowRecommendationIntentHandler,
        helpIntentHandler,
        cancelAndStopIntentHandler,
        fallbackIntentHandler,
        sessionEndedRequestHandler,
        intentReflectorHandler
    )
    .addErrorHandlers(errorHandler)
    .addRequestInterceptors(
        localisationRequestInterceptor,
        loggingRequestInterceptor,
        loadAttributesRequestInterceptor
    )
    .withPersistenceAdapter(
        new DynamoDbPersistenceAdapter({
            tableName: 'my_tv_shows_skill',
            createTable: true,
            partitionKeyGenerator: requestEnvelope => {
                const userId = alexa.getUserId(requestEnvelope);
                return userId.substr(userId.lastIndexOf('.') + 1);
            },
        })
    )
    .addResponseInterceptors(saveAttributesResponseInterceptor, loggingResponseInterceptor)
    .lambda();
