import { GraphQLScalarType } from 'graphql';

export const resolver = {
	MLOKey: new GraphQLScalarType({
		name: 'MLOKey',
		description: 'Multilanguage-Object_Key',
		serialize(value: string) {
			return value; // value sent to the client
		}
	})
};
