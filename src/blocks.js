import { Text } from '@blockcode/ui';
import translations from './l10n.yaml';
import iconURI from './icon.png';
import lightPyURI from './light.py';

export default {
  iconURI,
  name: (
    <Text
      id="extension.light.name"
      defaultMessage="Light"
    />
  ),
  files: [
    {
      name: 'light',
      type: 'text/x-python',
      uri: lightPyURI,
    },
  ],
  blocks: [
    {
      id: 'setLED',
      text: (
        <Text
          id="extension.light.led"
          defaultMessage="set PIN [PIN] LED [STATE]"
        />
      ),
      inputs: {
        PIN: {
          type: 'number',
          default: 1,
        },
        STATE: {
          inputMode: true,
          type: 'string',
          default: 'on',
          menu: [
            [
              <Text
                id="extension.light.led.on"
                defaultMessage="on"
              />,
              'on',
            ],
            [
              <Text
                id="extension.light.led.off"
                defaultMessage="off"
              />,
              'off',
            ],
          ],
        },
      },
      python(block) {
        this.definitions_['import_extension_light'] = 'from extensions.light import light';
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        const pinCode = this.valueToCode(block, 'PIN', this.ORDER_NONE) || '7';
        const stateCode = this.valueToCode(block, 'STATE', this.ORDER_NONE) || '"on"';
        code += `light.set_led(num(${pinCode}), str(${stateCode}))\n`;
        return code;
      },
    },
    {
      id: 'toggleLED',
      text: (
        <Text
          id="extension.light.ledToggle"
          defaultMessage="toggle PIN [PIN] LED"
        />
      ),
      inputs: {
        PIN: {
          type: 'number',
          default: 1,
        },
      },
      python(block) {
        this.definitions_['import_extension_light'] = 'from extensions.light import light';
        let code = '';
        if (this.STATEMENT_PREFIX) {
          code += this.injectId(this.STATEMENT_PREFIX, block);
        }
        const pinCode = this.valueToCode(block, 'PIN', this.ORDER_NONE) || '7';
        code += `light.toggle_led(num(${pinCode}))\n`;
        return code;
      },
    },
    {
      id: 'isLEDOn',
      text: (
        <Text
          id="extension.light.ledIsOn"
          defaultMessage="PIN [PIN] LED is on?"
        />
      ),
      inputs: {
        PIN: {
          type: 'number',
          default: 1,
        },
      },
      output: 'boolean',
      python(block) {
        this.definitions_['import_extension_light'] = 'from extensions.light import light';
        const pinCode = this.valueToCode(block, 'PIN', this.ORDER_NONE) || '7';
        const code = `light.is_led_on(num(${pinCode}))`;
        return [code, this.ORDER_FUNCTION_CALL];
      },
    },
    '---',
    {
      id: 'getBrightness',
      text: (
        <Text
          id="extension.light.brightness"
          defaultMessage="PIN [PIN] ambient light brightness"
        />
      ),
      inputs: {
        PIN: {
          type: 'number',
          default: 1,
        },
      },
      output: 'number',
      python(block) {
        this.definitions_['import_extension_light'] = 'from extensions.light import light';
        const pinCode = this.valueToCode(block, 'PIN', this.ORDER_NONE) || '2';
        const code = `light.get_brightness(num(${pinCode}))`;
        return [code, this.ORDER_FUNCTION_CALL];
      },
    },
  ],
  translations,
};
