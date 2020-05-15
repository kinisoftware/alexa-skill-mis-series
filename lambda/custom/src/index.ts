import * as alexa from 'ask-sdk-core';
import {launchRequestHandler} from './handlers/launchRequestHandler';
import {addTvShowIntentHandler} from './handlers/addTvShowIntentHandler';
import {tvShowRecommendationIntentHandler} from './handlers/tvShowRecommendationIntentHandler';
import {helpIntentHandler} from './handlers/helpIntentHanlder';
import {cancelAndStopIntentHandler} from './handlers/cancelAndStopIntentHandler';
import {fallbackIntentHandler} from './handlers/fallbackIntentHandler';
import {sessionEndedRequestHandler} from './handlers/sessionEndedRequestHandler';
import {intentReflectorHandler} from './handlers/intentReflectorHandler';
import {errorHandler} from './handlers/errorHandler';
import {localisationRequestInterceptor} from './interceptors/localisationRequestInterceptor';
import {loggingRequestInterceptor} from './interceptors/logginRequestInterceptor';
import {loggingResponseInterceptor} from './interceptors/logginResponseInterceptor';
import {loadAttributesRequestInterceptor} from './interceptors/loadAttributesRequestInterceptor';
import {saveAttributesResponseInterceptor} from './interceptors/saveAttributesResponseInterceptor';
import {buildPersistenceAdapter} from './PersistenceAdapterBuilder';

const persistenceAdapter = buildPersistenceAdapter();

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
    .withPersistenceAdapter(persistenceAdapter)
    .addResponseInterceptors(saveAttributesResponseInterceptor, loggingResponseInterceptor)
    .lambda();
