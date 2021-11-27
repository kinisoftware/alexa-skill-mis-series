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
};
