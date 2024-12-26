// filepath: /netlify/functions/fetchPolicy.js
import fetch from 'node-fetch';

export async function handler(event, context) {
    const policyUUID = event.queryStringParameters.policyUUID;

    const url = `https://app.termly.io/api/v1/consumer/policies/${policyUUID}/content?lang=en`;

    try {
        const response = await fetch(url);
        const html = await response.text();

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'text/html',
            },
            body: html,
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch policy document' }),
        };
    }
}