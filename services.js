// services.js: Service files for handling API calls and other services

import config from './config.js';

export async function getDeals() {
    const response = await fetch(`${config.apiBaseUrl}/deals`, {
        headers: {
            'Authorization': `Bearer ${config.apiKey}`
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch deals');
    }
    return response.json();
}

export async function saveDeal(deal) {
    const response = await fetch(`${config.apiBaseUrl}/deals`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${config.apiKey}`
        },
        body: JSON.stringify(deal)
    });
    if (!response.ok) {
        throw new Error('Failed to save deal');
    }
    return response.json();
}