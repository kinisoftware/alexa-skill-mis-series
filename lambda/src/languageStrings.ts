module.exports = {
    es: {
        translation: {
            WELCOME: {
                MSG: {
                    FIRST_TIME:
                        '¡Hola! Gracias por usar Mis series. ' +
                        'Te ayudaré a gestionar las series que quieres ver en un futuro. ' +
                        'Puedo guardar las series que te interesen para recomendarte alguna cuando me lo pidas. ',
                    NO_FIRST_TIME: '¡Hola de nuevo! ',
                },
                PROMPT: {
                    NO_TV_SHOW: 'Aún no tengo ninguna serie guardada.',
                    WITH_TV_SHOWS: 'Puedo añadir una serie o recomendarte una de tu lista.',
                },
                REPROMPT: 'Dime, ¿qué quieres hacer?',
            },
            TV_SHOW_RECOMMENDATION: {
                NO_TV_SHOW_MSG: 'Lo siento, aún no tengo ninguna serie guardada que recomendarte.',
                RECOMMENDATION_MSG: 'Te recomiendo la serie {{tvShowName}}',
            },
            ADD_TV_SHOW: {
                ADDED: 'Vale, añado {{tvShowName}} a la lista',
                ALREADY_EXISTS: 'Ya tenia la serie {{tvShowName}} guardada.',
            },
            HELP_MSG:
                'Puedo guardar las series que te interesen para recomendarte alguna cuando me lo pidas. Dime, ¿qué quieres hacer?',
            GOODBYE_MSG: '!Hasta luego!',
            REFLECTOR_MSG: 'Acabas de activar {{intentName}}',
            FALLBACK_MSG:
                'Lo siento, no se nada sobre eso. Cuando sepas una serie que te gustaría ver en el futuro me lo dices y la guardo.',
            ERROR_MSG: 'Lo siento, ha habido un error. Por favor inténtalo otra vez.',
        },
    },
    en: {
        translation: {
            WELCOME: {
                MSG: {
                    FIRST_TIME:
                        'Welcome! Thank you for using this skill. ' +
                        'I am here to help you with the tv shows that people are talking about and you need to save for later. ' +
                        'Next time you want to watch something new, just ask me for a recommendation. ',
                    NO_FIRST_TIME: 'Welcome back! ',
                },
                PROMPT: {
                    NO_TV_SHOW: 'There are no tv shows recommendations for you yet.',
                    WITH_TV_SHOWS: 'I can add a tv show in your list or give you a recommendation.',
                },
                REPROMPT: 'How can I help you then?',
            },
            TV_SHOW_RECOMMENDATION: {
                NO_TV_SHOW_MSG: 'I am sorry, there are no tv shows recommendations for you yet.',
                RECOMMENDATION_MSG: 'I recommend you the tv show {{tvShowName}}.',
            },
            ADD_TV_SHOW: {
                ADDED: 'Ok, adding {{tvShowName}} to your list.',
                ALREADY_EXISTS: '{{tvShowName}} was already in your list.',
            },
            HELP_MSG:
                'I am here to help you with the tv shows that people are talking about and you need to save for later. ' +
                'Next time you want to watch something new, just ask me for a recommendation. ' +
                ' How can I help you?',
            GOODBYE_MSG: 'See you later!',
            REFLECTOR_MSG: 'Just triggered {{intentName}}',
            FALLBACK_MSG:
                'I am sorry, I do not know how to help you with that. ' +
                'I am here to help you with the tv shows that people are talking about and you need to save for later. ' +
                'Next time you want to watch something new, just ask me for a recommendation. ',
            ERROR_MSG: 'I am sorry, there was an error with you request. Please, try again later.',
        },
    },
};
