import { GraphQLScalarType } from 'graphql';
import { FontAwesomeIconDefinition } from 'fontawesome-webfont-react-fela';

export const resolver = {
	Date: new GraphQLScalarType({
		name: 'FontAwesomeIcon',
		description: 'FontAwesomeIcon custom scalar type',
		parseValue(value: string) {
			return JSON.parse(value); // value from the client
		},
		serialize(value: FontAwesomeIconDefinition) {
			return JSON.stringify(value); // value sent to the client
		}
	})
};
