/* *
 * We create a language strings object containing all of our strings.
 * The keys for each string will then be referenced in our code, e.g. i18n.t('WELCOME_MSG').
 * The localisation interceptor in index.ts will automatically choose the strings
 * that match the request's locale.
 * */

module.exports = {
    es: {
        translation: {
            WELCOME: {
                MSG: '¡Hola! Gracias por usar Mis series. ' +
                    'Te ayudaré a gestionar las series que quieres ver en un futuro. ' +
                    'Puedo guardar las series que te interesen para recomendarte alguna cuando me lo pidas.',
                PROMPT: 'Aún no tengo ninguna serie guardada. ¿Qué serie te gustaría ver en el futuro?',
                REPROMPT: 'Dime, ¿qué serie quieres que guarde?'
            },
            ADD_TV_SHOW_MSG: 'Vale, añado {{tvShow}} a la lista',
            HELP_MSG: 'Puedes decirme hola. Cómo te puedo ayudar?',
            GOODBYE_MSG: 'Hasta luego!',
            REFLECTOR_MSG: 'Acabas de activar {{intentName}}',
            FALLBACK_MSG: 'Lo siento, no se nada sobre eso. Por favor inténtalo otra vez.',
            ERROR_MSG: 'Lo siento, ha habido un error. Por favor inténtalo otra vez.'
        }
    }
}