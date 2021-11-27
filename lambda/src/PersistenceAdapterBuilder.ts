import {DynamoDbPersistenceAdapter} from 'ask-sdk-dynamodb-persistence-adapter';
import * as alexa from 'ask-sdk-core';
import {PersistenceAdapter} from 'ask-sdk-core';

export function buildPersistenceAdapter(): PersistenceAdapter {
    return new DynamoDbPersistenceAdapter({
        tableName: 'my_tv_shows_skill',
        createTable: true,
        partitionKeyGenerator: requestEnvelope => {
            const userId = alexa.getUserId(requestEnvelope);
            return userId.substr(userId.lastIndexOf('.') + 1);
        },
    });
}
