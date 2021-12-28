import {HandlerInput} from 'ask-sdk-core';

export function supportsAPL(handlerInput: HandlerInput) {
    return (
        !!handlerInput.requestEnvelope.context.System.device?.supportedInterfaces['Alexa.Presentation.APL'] ||
        false
    );
}

export const showDetailsData = (showTitle: string, showSeasons: number, showEpisodes: number, showReleaseDate: string) => {
    return {
        "detailImageRightData": {
            "type": "object",
            "objectId": "detailImageRightSample",
            "backgroundImage": {
                "contentDescription": null,
                "smallSourceUrl": null,
                "largeSourceUrl": null,
                "sources": [
                    {
                        "url": "https://alexa-skill-my-tvshows.s3.eu-west-3.amazonaws.com/istockphoto-1146517858-612x612.jpg",
                        "size": "large"
                    }
                ]
            },
            "title": "My Tv Shows",
            "subtitle": "Tv Show Details",
            "image": {
                "contentDescription": "",
                "smallSourceUrl": null,
                "largeSourceUrl": null,
                "sources": [
                    {
                        "url": "https://alexa-skill-my-tvshows.s3.eu-west-3.amazonaws.com/netflix_logo.png",
                        "size": "large"
                    }
                ]
            },
            "textContent": {
                "primaryText": {
                    "type": "PlainText",
                    "text": showTitle
                },
                "locationText": {
                    "type": "PlainText",
                    "text": `${showSeasons} seasons - ${showEpisodes} episodes`
                },
                "secondaryText": {
                    "type": "PlainText",
                    "text": `Release date: ${showReleaseDate}`
                }
            },
        }
    };
}
