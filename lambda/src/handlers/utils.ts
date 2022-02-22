import {HandlerInput} from 'ask-sdk-core';

export function supportsAPL(handlerInput: HandlerInput) {
    return (
        !!handlerInput.requestEnvelope.context.System.device?.supportedInterfaces['Alexa.Presentation.APL'] ||
        false
    );
}

export const showDetailsData = (showTitle: string, showSeasons: number, showEpisodes: number, provider: string) => {
    return {
        "detailImageRightData": {
            "type": "object",
            "objectId": "detailImageRightSample",
            "backgroundImage": {
                "sources": [
                    {
                        "url": "https://alexa-skill-my-tvshows.s3.eu-west-3.amazonaws.com/istockphoto-1146517858-612x612.jpg",
                        "size": "large"
                    }
                ]
            },
            "title": "Mis series",
            "subtitle": "Nueva serie añadida a tus recomendaciones",
            "textContent": {
                "primaryText": {
                    "type": "PlainText",
                    "text": showTitle
                },
                "secondaryText": {
                    "type": "PlainText",
                    "text": `${showSeasons} temporadas - ${showEpisodes} episodios`
                },
                "tertiaryText": {
                    "type": "PlainText",
                    "text": provider
                }
            }
        }
    };
}
