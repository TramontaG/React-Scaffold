import React from 'react';

type RenderProps = {
	when: boolean | (() => boolean);
	children: React.ReactNode;
};

export const Render = ({ when, children }: RenderProps) => {
	const shouldRender = typeof when === 'boolean' ? when : when();

	if (shouldRender) {
		return children;
	}
	return null;
};
