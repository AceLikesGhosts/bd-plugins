/* eslint-disable */
import { Margins, React } from '../components';

import TextInput, { TextInputProps } from '../components/TextInput';
import Radio, { RadioGroupProps } from '../components/Radio';
import Switch, { SwitchProps } from '../components/Switch';
import { FormItem, FormTitle } from '../components/Form';

type ExtraData = {
    settingName: string;
    title?: string;
};
type Settings<T> = (
    (TextInputProps & { type: 'input'; }
        | RadioGroupProps<T> & { type: 'radio'; }
        | SwitchProps & { type: 'switch'; })
    & ExtraData)[];

type DefaultSettings = Record<string, { value?: any; enabled?: boolean; }>;

/**
 * Creates a settings panel.
 * @param pluginName - The name of the plugin.
 * @param defaultSettings - The default, or what is currently set, settings.
 * @param renderSettings - A JSON object reflecting what you want to show in your settings panel.
 * @example
 * import makeSettings from '@lib/settings';
 * 
 * export default class {
 *  public start() {
 *      this.settings = BdApi.Data.load('pluginName');
 *  }
 * 
 *  public stop() {
 *      BdApi.Data.save('pluginName', this.settings);
 *  }
 * 
 *  public getSettingsPanel() {
 *      return makeSettings(
 *          this.settings,
 *          [
 *              {
 *                  type: 'input',
 *                  settingName: 'test'
 *              }
 *          ]
 *      );
 *  }
 * }
 */
export default function makeSettings<E>(
    defaultSettings: DefaultSettings,
    renderSettings: Settings<E>
): JSX.Element {
    const [state, setState] = React.useState<Partial<DefaultSettings>>(defaultSettings);

    const appendState = (key: string, data: { value?: any; enabled?: boolean; }) => {
        const newState: Record<string, { value?: any; enabled?: boolean; }> = {};
        newState[key] = data;

        setState((prevState) => {
            return {
                ...newState,
                ...prevState
            };
        });
    };

    return (
        <div>
            {renderSettings.map((value, i) => {
                return (
                    <FormItem key={i} className={Margins.marginBottom20}>
                        {value.title ? <FormTitle>{value.title}</FormTitle> : void 0}

                        {(() => {
                            switch(value.type) {
                                case 'input':
                                    return (
                                        <TextInput
                                            value={state[value.settingName]?.value}
                                            onChange={((v) => {
                                                appendState(value.settingName, {
                                                    value: v
                                                });
                                            })}
                                            {...value}
                                        />
                                    );


                                case 'switch':
                                    return (
                                        <Switch
                                            checked={state[value.settingName]?.value}
                                            onChange={((checked) => {
                                                appendState(value.settingName, {
                                                    value: checked
                                                });
                                            })}
                                            {...value}
                                        />
                                    );

                                case 'radio':
                                    return (
                                        <Radio
                                            value={state[value.settingName]?.value}
                                            onChange={((opt) => {
                                                appendState(value.settingName, {
                                                    value: opt.value
                                                });
                                            })}
                                            {...value}
                                        />
                                    );
                            }
                        })()}
                    </FormItem>
                );
            })}
        </div>
    );
}
