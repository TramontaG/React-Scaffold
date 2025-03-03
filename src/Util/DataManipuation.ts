export type NotNull<T extends any> = T extends null
	? never
	: T extends undefined
	? never
	: T extends Array<any>
	? NotNull<T[number]>
	: T;

// https://stackoverflow.com/questions/43080547/how-to-override-type-properties-in-typescript
export type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;

// https://stackoverflow.com/questions/61132262/typescript-deep-partial#61132308
export type DeepPartial<T> = T extends object
	? {
			[P in keyof T]?: DeepPartial<T[P]>;
	  }
	: T;

export type LiteralValue = string | number | boolean | null;

export type JSON =
	| LiteralValue
	| {
			[key: string]: JSON;
	  }
	| JSON[];

// https://stackoverflow.com/questions/65332597/typescript-is-there-a-recursive-keyof
export type RecursiveKeyOf<TObj extends object> = {
	[TKey in keyof TObj & (string | number)]: TObj[TKey] extends any[]
		? `${TKey}`
		: TObj[TKey] extends object
		? `${TKey}.${RecursiveKeyOf<TObj[TKey]>}`
		: `${TKey}`;
}[keyof TObj & (string | number)];

export type IsKeyFromObject<Key extends string, Obj> = Obj extends object
	? Key extends keyof Obj
		? true
		: false
	: false;

export type ObjectPropertyAccess<
	Obj extends object,
	Prop extends string
> = Prop extends keyof Obj
	? Obj[Prop]
	: Prop extends `${infer Key1}.${infer Key2}`
	? Key1 extends keyof Obj
		? Obj[Key1] extends object
			? Key2 extends RecursiveKeyOf<Obj[Key1]>
				? // @ts-ignore IDK why this bitch is complaining
				  ObjectPropertyAccess<Obj[Key1], Key2>
				: never
			: never
		: never
	: never;

export type ObjectShapeFromKeys<
	Shape extends string,
	value
> = Shape extends `${infer Key1}.${infer Key2}`
	? Record<Key1, ObjectShapeFromKeys<Key2, value>>
	: Record<Shape, value>;

type RemovePropertiesFn = <
	Obj extends Record<string, any>,
	Properties extends keyof Obj
>(
	obj: Obj,
	properties: Properties[]
) => {
	[Key in Exclude<keyof Obj, Properties>]: Obj[Key];
};

type AccessPropertyByShapeFN = <
	Obj extends object,
	Shape extends RecursiveKeyOf<Obj>
>(
	obj: Obj,
	shape: Shape
) => ObjectPropertyAccess<Obj, Shape>;

/**
 * Returns a new object without the properties that you specified.
 * The original object stays the same.
 * @param obj
 * @param properties
 * @returns New Object
 */
export const removePropertiesFromObject: RemovePropertiesFn = (obj, properties) => {
	const clonedObject = structuredClone(obj);
	properties.forEach(property => delete clonedObject[property]);
	return clonedObject;
};

/**
 * This function traverses the object in the first parameter, applying the
 * changes that the objects in the second parameter specifies.
 * @example
 *  recursiveAssign({foo: 1, bar: { baz: 2 }}, { foo: 2 }) => {foo: 2, bar: { baz: 2 }}
 *  recursiveAssign({foo: 1, bar: { baz: 2 }}, { bar: { baz: 3} }) => {foo: 1, bar: { baz: 3 }}
 * @param oldData
 * @param newData
 * @returns
 */
export const recursiveAssign = <T extends Record<string, any>>(
	oldData: T,
	newData: DeepPartial<T>
) => {
	return Object.entries(newData).reduce((object, [key, value]) => {
		// The part `value.constructor === {}.constructor` is used here in order to avoid
		// calling Object.entries on an object that is not literal, when the object was created
		// by instantiating a class, like `const obj = new ObjClass()`
		if (value && typeof value === 'object' && isPlainObject(value)) {
			const newObject: Record<string, any> = recursiveAssign(
				oldData[key],
				newData[key]
			);

			return {
				...object,
				[key]: {
					...newObject,
				},
			};
		}
		return {
			...object,
			[key]: newData[key] === undefined ? oldData[key] : newData[key],
		};
	}, oldData as T);
};

export const isPlainObject = (maybeObject: any): maybeObject is Object => {
	return {}.constructor === maybeObject.constructor;
};

export const setValueRecursivelyByShape = <Shape extends string, Value>(
	shape: Shape,
	value: Value
): ObjectShapeFromKeys<Shape, Value> => {
	const [currKey, ...rest] = shape.split('.');

	if (rest.length === 0) {
		return {
			[currKey!]: value,
		} as ObjectShapeFromKeys<Shape, Value>;
	} else {
		return {
			[currKey!]: setValueRecursivelyByShape(rest.join('.'), value),
		} as ObjectShapeFromKeys<Shape, Value>;
	}
};

export const accessPropertyByShape: AccessPropertyByShapeFN = (obj, shape) => {
	const [fisrtKey, ...rest] = shape.split('.');

	if (rest.length === 0) {
		return obj[fisrtKey! as keyof typeof obj];
	} else {
		if (!obj[fisrtKey! as keyof typeof obj]) {
			return undefined;
		} else {
			//@ts-ignore
			return accessPropertyByShape(obj[fisrtKey!], rest.join('.'));
		}
	}
};

export const ensureArray = <Type>(val: Type | Type[]) => {
	return Array.isArray(val) ? val : [val];
};

enum TokenType {
	Number = 'NUMBER',
	Uppercase = 'UPPERCASE',
	Lowercase = 'LOWERCASE',
	Alphanumeric = 'ALPHANUMERIC',
	Literal = 'LITERAL',
}

type Token = {
	type: TokenType;
	value: string;
};

const tokenizeText = (mask: string): Token[] => {
	return mask.split('').map(char => {
		switch (char) {
			case '0':
			case '9':
				return {
					type: TokenType.Number,
					value: '0',
				};
			case 'A':
				return {
					type: TokenType.Uppercase,
					value: 'A',
				};
			case 'a':
				return {
					type: TokenType.Lowercase,
					value: 'a',
				};
			case 'x':
				return {
					type: TokenType.Alphanumeric,
					value: 'x',
				};
			default:
				return {
					type: TokenType.Literal,
					value: char,
				};
		}
	});
};

const isNumber = (target: string) => /^[0-9]$/.test(target);
const isUppercase = (target: string) => /^[A-Z]$/.test(target);
const isLowercase = (target: string) => /^[a-z]$/.test(target);
const isAlphanumeric = (target: string) => /^[0-9A-z]$/.test(target);

/**
 * `0` for number, `A` for uppercase letter, `a` for lowercase
 * and `x` for alphanumeric
 * @param text
 * @param mask
 * @returns
 */
export const maskText = (text: string, mask: string) => {
	const maskInfo = tokenizeText(mask);
	const unmaskedText = text.replace(/[^0-9A-z]*/g, '');

	let stringIndex = 0;
	let ignore = false;
	let lastWasLiteral = false;

	const maskedText = maskInfo
		.map((token, _) => {
			if (ignore) {
				return '';
			}
			const currChar = unmaskedText[stringIndex]!;
			if (token.type === TokenType.Literal) {
				lastWasLiteral = true;
				return token.value;
			}
			if (token.type === TokenType.Alphanumeric) {
				if (isAlphanumeric(currChar)) {
					stringIndex++;
					lastWasLiteral = false;
					return currChar;
				}
				ignore = true;
			}
			if (token.type === TokenType.Number) {
				if (isNumber(currChar)) {
					stringIndex++;
					lastWasLiteral = false;
					return currChar;
				}
				ignore = true;
			}
			if (token.type === TokenType.Lowercase) {
				if (isLowercase(currChar)) {
					stringIndex++;
					lastWasLiteral = false;
					return currChar;
				}
				ignore = true;
			}
			if (token.type === TokenType.Uppercase) {
				if (isUppercase(currChar)) {
					stringIndex++;
					lastWasLiteral = false;
					return currChar;
				}
				ignore = true;
			}
		})
		.join('');

	return lastWasLiteral ? maskedText.slice(0, maskedText.length - 1) : maskedText;
};

export const unmaskText = (text: string) => text.replace(/[^0-9A-z]*/g, '');

export const normalizeText = (string: string) => {
	return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

export const getFormattedDateAndTime = (date?: number | Date) => {
	const now = date ? new Date(date) : new Date(new Date().getTime());

	return `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1)
		.toString()
		.padStart(2, '0')}/${now.getFullYear()} às ${now
		.getHours()
		.toString()
		.padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
};

type Coords = {
	lat: number;
	lng: number;
};

/**
 * This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
 * https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates
 * @param coordsA
 * @param coordsB
 * @returns
 */
export const getGeoDistance = (coordsA: Coords, coordsB: Coords) => {
	const R = 6371; // km
	const dLat = toRad(coordsB.lat - coordsA.lat);
	const dLon = toRad(coordsB.lng - coordsA.lng);
	const radLat1 = toRad(coordsA.lat);
	const radLat2 = toRad(coordsB.lat);

	var a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(radLat1) * Math.cos(radLat2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	var d = R * c;
	return d;
};

/**
 * Convert numeric degrees to radians
 * @param deg
 * @returns
 */
function toRad(deg: number) {
	return (deg * Math.PI) / 180;
}

export const inspect = (data: any) => {
	console.dir(data, {
		depth: Infinity,
		colors: true,
		showHidden: true,
		numericSeparator: true,
		breakLength: 80,
	});
};

export const arraysContainAllElements = <T>(A: T[], B: T[]): boolean => {
	return B.every(element => A.includes(element));
};
