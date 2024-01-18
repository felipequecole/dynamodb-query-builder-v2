function transformQueryParts(parts) {
	let keyConditionExpression = [];
	let expressionAttributeValues = {};
	let counter = 0;
	parts.forEach((part) => {
		let type = part?.type;
		let field = part?.field;
		let value = part?.value;

		if (field && type && value) {
			counter++;
			let valueHolder = `:v${counter}`;
			keyConditionExpression.push(`${field} = ${valueHolder}`);
			const attributeValues = {
				[valueHolder]: {
					[type]: [value]
				}
			};
			expressionAttributeValues = { ...expressionAttributeValues, ...attributeValues };
		}
	});
	return { keyConditionExpression, expressionAttributeValues };
}

export default function buildQuery(tableName, region, queries) {
	let output = `aws dynamodb query --table-name ${tableName}`;
	if (region) {
		output += ` --region ${region}`;
	}

	let { keyConditionExpression, expressionAttributeValues } = transformQueryParts(queries);

	keyConditionExpression = keyConditionExpression.join(' AND ');
	expressionAttributeValues = JSON.stringify(expressionAttributeValues);
	expressionAttributeValues = expressionAttributeValues.replace(/"/g, '\\"');

	output += ` --key-condition-expression "${keyConditionExpression}"`;
	output += ` --expression-attribute-values "${expressionAttributeValues}"`;

	return output;
}
