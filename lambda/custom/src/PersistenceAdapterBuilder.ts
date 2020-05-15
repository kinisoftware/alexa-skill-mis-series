import {DynamoDbPersistenceAdapter} from 'ask-sdk-dynamodb-persistence-adapter';
import * as alexa from 'ask-sdk-core';
import {PersistenceAdapter} from 'ask-sdk-core';
import {ConfigurationOptions} from 'aws-sdk/lib/config';
import AWS = require('aws-sdk');

export function buildPersistenceAdapter(): PersistenceAdapter {
    if (process.env.DYNAMODB_LOCAL) {
        AWS.config.update({
            region: 'local',
            endpoint: 'http://localhost:8000',
            accessKeyId: 'fake',
            secretAccessKey: 'fake',
        } as ConfigurationOptions);
        return buildDynamoDBAdapter(new AWS.DynamoDB());
    } else {
        return buildDynamoDBAdapter();
    }
}

function buildDynamoDBAdapter(dynamoDBClient?: AWS.DynamoDB): PersistenceAdapter {
    return new DynamoDbPersistenceAdapter({
        tableName: 'my_tv_shows_skill',
        createTable: true,
        partitionKeyGenerator: requestEnvelope => {
            const userId = alexa.getUserId(requestEnvelope);
            return userId.substr(userId.lastIndexOf('.') + 1);
        },
        dynamoDBClient,
    });
}
