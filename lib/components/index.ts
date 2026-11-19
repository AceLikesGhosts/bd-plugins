export const Margins = /** @__PURE__ */ RemapOldKeysFromSource('marginBottom40', 'marginBottom20', 'marginTop4') as MarginsClasses;
export const React = /** @__PURE__ */ BdApi.React;
// temporary until newer version BD releases where
// they fix their query for react19
export const ReactDom = /** @__PURE__ */ BdApi.ReactDOM || /** @__PURE__ */ (
	/** @__PURE__ */ BdApi.Webpack.getByKeys('createRoot') as {
	createRoot: (d: any) => { render(d: any): any; };
}
);

export interface MarginsClasses {
	marginReset: string;
	marginTop4: string;
	marginBottom4: string;
	marginTop8: string;
	marginBottom8: string;
	marginTop20: string;
	marginBottom20: string;
	marginTop40: string;
	marginBottom40: string;
	marginTop60: string;
	marginBottom60: string;
	marginCenterHorz: string;
	marginLeft8: string;
}

function RemapOldKeysFromSource(...keys: string[]) {
	const map: Record<string, (m: any) => boolean> = {};
	for(let i = 0; i < keys.length; i++) {
		map[keys[i]] = (a: any) => a?.toString?.()?.includes?.(keys[i]);
	}

	return BdApi.Webpack.getBySource(...keys, { map: map });
};