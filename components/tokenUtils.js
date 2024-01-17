// Util functions for working with JWT tokens
import * as SecureStore from 'expo-secure-store';
import * as Crypto from 'expo-crypto';
import { decode as atob } from 'base-64';

export const decodeToken = async () => {
	try {
		// Get the JWT token from SecureStore
		const token = await SecureStore.getItemAsync('userToken');

		// Decode the token
		const [header, payload, signature] = token.split('.');
		const decodedPayload = JSON.parse(atob(payload));

		return decodedPayload;
	} catch (error) {
		console.error('Error decoding JWT:', error);
		return null;
	}
};
