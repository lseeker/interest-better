// eslint-disable-next-line import/no-extraneous-dependencies
const plugin = require('tailwindcss/plugin');

const colors = {
  bw: {
    light: {
      normal: {
        text: '#252525',
        background: '#fff',
        border: '#A3ACB4',
      },
      hover: {
        text: '#fff',
        background: '#242424',
        border: '#A3ACB4',
      },
      focus: {
        text: '#fff',
        background: '#797979',
        border: '#242424',
      },
      active: {
        text: '#252525',
        background: '#EEEEEE',
        border: '#A3ACB4',
      },
      disabled: {
        text: '#A1A5A9',
        background: '#F7F7F7',
        border: '#dddddd',
      },
    },
    dark: {
      normal: {
        text: '#525252',
        background: '#000',
        border: '#525252',
      },
      hover: {
        text: '#fff',
        background: '#343538',
        border: '#525252',
      },
      focus: {
        text: '#fff',
        background: '#5B5E63',
        border: '#525252',
      },
      active: {
        text: '#fff',
        background: '#1E1E1E',
        border: '#525252',
      },
      disabled: {
        text: '#868686',
        background: '#3E3E3E',
        border: '#525252',
      },
    },
  },
  red: {
    light: {
      normal: {
        text: '#D32F2F',
        background: '#fff',
        border: '#D32F2F',
      },
      hover: {
        text: '#FFF',
        background: '#F44336',
        border: '#D32F2F',
      },
      focus: {
        text: '#FFF',
        background: '#C62828',
        border: '#621414',
      },
      active: {
        text: '#fff',
        background: '#EF5350',
        border: '#D32F2F',
      },
      disabled: {
        text: '#FFF',
        background: '#FFCDD2',
        border: '#E4BBBB',
      },
    },
    dark: {
      normal: {
        text: '#BB463E',
        background: '#000',
        border: '#771515',
      },
      hover: {
        text: '#BA2929',
        background: '#572525',
        border: '#771515',
      },
      focus: {
        text: '#BA2929',
        background: '#733131',
        border: '#891515',
      },
      active: {
        text: '#BA2929',
        background: '#471E1E',
        border: '#771515',
      },
      disabled: {
        text: '#873939',
        background: '#361717',
        border: '#813A3A',
      },
    },
  },
  Pink: {
    light: {
      normal: {
        text: '#C2185B',
        background: '#fff',
        border: '#C2185B',
      },
      hover: {
        text: '#FFF',
        background: '#E91E63',
        border: '#C2185B',
      },
      focus: {
        text: '#FFF',
        background: '#AD1457',
        border: '#520A29',
      },
      active: {
        text: '#FFF',
        background: '#FF80AB',
        border: '#C2185B',
      },
      disabled: {
        text: '#FFF',
        background: '#F8BBD0',
        border: '#C991A7',
      },
    },
    dark: {
      normal: {
        text: '#860932',
        background: '#000',
        border: '#610C2D',
      },
      hover: {
        text: '#AB1450',
        background: '#52051F',
        border: '#610C2D',
      },
      focus: {
        text: '#AB1450',
        background: '#680C34',
        border: '#8E0457',
      },
      active: {
        text: '#AB1450',
        background: '#3E081A',
        border: '#610C2D',
      },
      disabled: {
        text: '#540B28',
        background: '#29020F',
        border: '#60223A',
      },
    },
  },
  Purple: {
    light: {
      normal: {
        text: '#7B1FA2',
        background: '#fff',
        border: '#7B1FA2',
      },
      hover: {
        text: '#FFF',
        background: '#9c27b0',
        border: '#7B1FA2',
      },
      focus: {
        text: '#FFF',
        background: '#6A1B9A',
        border: '#2D0A43',
      },
      active: {
        text: '#FFF',
        background: '#BA68C8',
        border: '#7B1FA2',
      },
      disabled: {
        text: '#FFF',
        background: '#E1BEE7',
        border: '#B997C8',
      },
    },
    dark: {
      normal: {
        text: '#6D258C',
        background: '#000',
        border: '#634475',
      },
      hover: {
        text: '#7906AA',
        background: '#402F47',
        border: '#634475',
      },
      focus: {
        text: '#7906AA',
        background: '#380B4B',
        border: '#4B0B6C',
      },
      active: {
        text: '#7906AA',
        background: '#402F47',
        border: '#634475',
      },
      disabled: {
        text: '#634475',
        background: '#2F2633',
        border: '#3A2B40',
      },
    },
  },
  Indigo: {
    light: {
      normal: {
        text: '#7281c7',
        background: '#fff',
        border: '#25389C',
      },
      hover: {
        text: '#fff',
        background: '#3F51B5',
        border: '#25389C',
      },
      focus: {
        text: '#fff',
        background: '#283593',
        border: '#161E5A',
      },
      active: {
        text: '#fff',
        background: '#5C6BC0',
        border: '#3547A8',
      },
      disabled: {
        text: '#fff',
        background: '#C5CAE9',
        border: '#ADB3DA',
      },
    },
    dark: {
      normal: {
        text: '#7281C7',
        background: '#000',
        border: '#1A237E',
      },
      hover: {
        text: '#7E87DE',
        background: '#111843',
        border: '#1A237E',
      },
      focus: {
        text: '#7E87DE',
        background: '#0D165D',
        border: '#051692',
      },
      active: {
        text: '#7E87DE',
        background: '#2D345D',
        border: '#1A237E',
      },
      disabled: {
        text: '#767BA5',
        background: '#3B3F57',
        border: '#4F526D',
      },
    },
  },
  blue: {
    light: {
      normal: {
        text: '#1976D2',
        background: '#fff',
        border: '#1976D2',
      },
      hover: {
        text: '#fff',
        background: '#2196F3',
        border: '#1976D2',
      },
      focus: {
        text: '#fff',
        background: '#1565c0',
        border: '#0D47A1',
      },
      active: {
        text: '#fff',
        background: '#42A5F5',
        border: '#1976D2',
      },
      disabled: {
        text: '#fff',
        background: '#E3F2FD',
        border: '#A5C2DE',
      },
    },
    dark: {
      normal: {
        text: '#4993DC',
        background: '#000',
        border: '#0C3B69',
      },
      hover: {
        text: '#1667B8',
        background: '#052C4B',
        border: '#0C3B69',
      },
      focus: {
        text: '#1667B8',
        background: '#0A3260',
        border: '#0B3C80',
      },
      active: {
        text: '#1667B8',
        background: '#17354D',
        border: '#0C3B69',
      },
      disabled: {
        text: '#153D64',
        background: '#172530',
        border: '#293A4D',
      },
    },
  },
  green: {
    light: {
      normal: {
        text: '#388E3C',
        background: '#fff',
        border: '#388E3C',
      },
      hover: {
        text: '#fff',
        background: '#4CAF50',
        border: '#388E3C',
      },
      focus: {
        text: '#fff',
        background: '#2E7D32',
        border: '#1B5E20',
      },
      active: {
        text: '#fff',
        background: '#66BB6A',
        border: '#388E3C',
      },
      disabled: {
        text: '#fff',
        background: '#E8F5E9',
        border: '#B3DCB5',
      },
    },
    dark: {
      normal: {
        text: '#29632B',
        background: '#000',
        border: '#388E3C',
      },
      hover: {
        text: '#439B46',
        background: '#3F5930',
        border: '#388E3C',
      },
      focus: {
        text: '#439B46',
        background: '#52753D',
        border: '#1B5E20',
      },
      active: {
        text: '#439B46',
        background: '#2F4224',
        border: '#388E3C',
      },
      disabled: {
        text: '#2B5F2D',
        background: '#28381F',
        border: '#364C29',
      },
    },
  },
  Yellow: {
    light: {
      normal: {
        text: '#FBC02D',
        background: '#fff',
        border: '#FBC02D',
      },
      hover: {
        text: '#fff',
        background: '#FFEB3B',
        border: '#FBC02D',
      },
      focus: {
        text: '#fff',
        background: '#FFC107',
        border: '#E2AB08',
      },
      active: {
        text: '#fff',
        background: '#FFEE58',
        border: '#FBC02D',
      },
      disabled: {
        text: '#fff',
        background: '#FFF9C4',
        border: '#F9E6B4',
      },
    },
    dark: {
      normal: {
        text: '#998D23',
        background: '#000',
        border: '#785D1B',
      },
      hover: {
        text: '#E0CF34',
        background: '#7E7319',
        border: '#785D1B',
      },
      focus: {
        text: '#E0CF34',
        background: '#B68A08',
        border: '#685008',
      },
      active: {
        text: '#E0CF34',
        background: '#393408',
        border: '#785D1B',
      },
      disabled: {
        text: '#7F7414',
        background: '#504B19',
        border: '#7F6C3C',
      },
    },
  },
  Amber: {
    light: {
      normal: {
        text: '#FFA000',
        background: '#fff',
        border: '#FFA000',
      },
      hover: {
        text: '#fff',
        background: '#FFC107',
        border: '#FFA000',
      },
      focus: {
        text: '#fff',
        background: '#FFA000',
        border: '#FF6F00',
      },
      active: {
        text: '#fff',
        background: '#FFCA28',
        border: '#FFA000',
      },
      disabled: {
        text: '#fff',
        background: '#FFECB3',
        border: '#FBD698',
      },
    },
    dark: {
      normal: {
        text: '#997405',
        background: '#000',
        border: '#805000',
      },
      hover: {
        text: '#DD9D31',
        background: '#9A7402',
        border: '#805000',
      },
      focus: {
        text: '#DD9D31',
        background: '#805000',
        border: '#C05F00',
      },
      active: {
        text: '#DD9D31',
        background: '#725602',
        border: '#805000',
      },
      disabled: {
        text: '#AF6F4A',
        background: '#5D4D20',
        border: '#7E520A',
      },
    },
  },
  Orange: {
    light: {
      normal: {
        text: '#F57C00',
        background: '#fff',
        border: '#F57C00',
      },
      hover: {
        text: '#fff',
        background: '#FF9800',
        border: '#F57C00',
      },
      focus: {
        text: '#fff',
        background: '#EF6C00',
        border: '#E65100',
      },
      active: {
        text: '#fff',
        background: '#FFA726',
        border: '#F57C00',
      },
      disabled: {
        text: '#fff',
        background: '#FFE0B2',
        border: '#FCCD9D',
      },
    },
    dark: {
      normal: {
        text: '#995C00',
        background: '#000',
        border: '#874603',
      },
      hover: {
        text: '#F57C00',
        background: '#A16204',
        border: '#874603',
      },
      focus: {
        text: '#F57C00',
        background: '#522601',
        border: '#782A00',
      },
      active: {
        text: '#F57C00',
        background: '#845714',
        border: '#874603',
      },
      disabled: {
        text: '#806244',
        background: '#473123',
        border: '#523828',
      },
    },
  },
  DeepOrange: {
    light: {
      normal: {
        text: '#E64A19',
        background: '#fff',
        border: '#E64A19',
      },
      hover: {
        text: '#fff',
        background: '#FF5722',
        border: '#E64A19',
      },
      focus: {
        text: '#fff',
        background: '#D84315',
        border: '#962D0C',
      },
      active: {
        text: '#fff',
        background: '#FF7043',
        border: '#E64A19',
      },
      disabled: {
        text: '#fff',
        background: '#FFCCBC',
        border: '#F6AE97',
      },
    },
    dark: {
      normal: {
        text: '#993314',
        background: '#000',
        border: '#73250C',
      },
      hover: {
        text: '#E04B1D',
        background: '#802B11',
        border: '#73250C',
      },
      focus: {
        text: '#E04B1D',
        background: '#6C210A',
        border: '#81260B',
      },
      active: {
        text: '#E04B1D',
        background: '#662D1A',
        border: '#73250C',
      },
      disabled: {
        text: '#A27568',
        background: '#755D55',
        border: '#B58576',
      },
    },
  },
  Brown: {
    light: {
      normal: {
        text: '#5D4037',
        background: '#fff',
        border: '#5D4037',
      },
      hover: {
        text: '#fff',
        background: '#795548',
        border: '#5D4037',
      },
      focus: {
        text: '#fff',
        background: '#4E342E',
        border: '#130D0B',
      },
      active: {
        text: '#fff',
        background: '#8D6E63',
        border: '#5D4037',
      },
      disabled: {
        text: '#fff',
        background: '#D7CCC8',
        border: '#BFABA5',
      },
    },
    dark: {
      normal: {
        text: '#6C4E44',
        background: '#000',
        border: '#2E201B',
      },
      hover: {
        text: '#6C4E44',
        background: '#3C2A24',
        border: '#2E201B',
      },
      focus: {
        text: '#6C4E44',
        background: '#271A17',
        border: '#34180E',
      },
      active: {
        text: '#6C4E44',
        background: '#473731',
        border: '#2E201B',
      },
      disabled: {
        text: '#513730',
        background: '#2F2724',
        border: '#776965',
      },
    },
  },
};

function schemeToButtonObject(colorScheme) {
  return {
    backgroundColor: colorScheme.disabled.background,
    borderColor: colorScheme.normal.border,
    color: colorScheme.normal.text,

    '&:hover': {
      backgroundColor: colorScheme.hover.background,
      borderColor: colorScheme.hover.border,
      color: colorScheme.hover.text,
    },
    '&:focus': {
      backgroundColor: colorScheme.focus.background,
      borderColor: colorScheme.focus.border,
      color: colorScheme.focus.text,
    },
    '&:active': {
      backgroundColor: colorScheme.active.background,
      borderColor: colorScheme.active.border,
      color: colorScheme.active.text,
    },
    '&:disabled': {
      backgroundColor: '#eee',
      borderColor: colorScheme.disabled.border,
      color: colorScheme.disabled.text,
    },
  };
}

function colorSetToButtonObject(colorSet) {
  return {
    backgroundColor: colorSet['50'],
    borderColor: colorSet['200'],
    color: colorSet['700'],

    '&:hover': {
      backgroundColor: colorSet['200'],
    },
    '&:focus': {
      backgroundColor: colorSet['200'],
    },
    '&:active': {
      backgroundColor: colorSet['400'],
      color: colorSet['50'],
    },
    '&:disabled': {
      backgroundColor: '#f5f5f5', // 100
      borderColor: '#e5e5e5', // 200
      color: '#d4d4d4', // 300
    },
  };
}

function schemeToInputObject(colorScheme) {
  return {
    backgroundColor: colorScheme.normal.background,
    borderColor: colorScheme.normal.border,

    '&:focus': {
      backgroundColor: colorScheme.focus.background,
      borderColor: colorScheme.focus.border,
      color: colorScheme.focus.text,
    },
    '&:active': {
      backgroundColor: colorScheme.active.background,
      borderColor: colorScheme.active.border,
      color: colorScheme.active.text,
    },
    '&:disabled': {
      backgroundColor: '#eee',
      borderColor: colorScheme.disabled.border,
      color: colorScheme.disabled.text,
    },
  };
}

module.exports = plugin(({ addComponents, theme }) => {
  const cols = theme('colors');

  const btns = Object.entries(cols).reduce((obj, [key, set]) => {
    if (typeof set === 'object') {
      const className = `.color-${key}`;
      // eslint-disable-next-line no-param-reassign
      obj[`button${className}`] = colorSetToButtonObject(set);
      return obj;
    }
    return obj;
  }, {});

  const globals = Object.entries(colors).reduce((obj, [key, scheme]) => {
    // eslint-disable-next-line no-param-reassign
    obj[`.theme-${key.toLocaleLowerCase()}`] = {
      'input[type=text],select': schemeToInputObject(scheme.light),
    };
    return obj;
  }, {});

  const details = Object.entries(colors).reduce((obj, [key, scheme]) => {
    // eslint-disable-next-line no-param-reassign
    obj.button[`&.theme-${key.toLocaleLowerCase()}`] = schemeToButtonObject(scheme.light);
    // eslint-disable-next-line no-param-reassign
    obj['input[type=text],select'][`&.theme-${key.toLocaleLowerCase()}`] = schemeToInputObject(scheme.light);
    return obj;
  }, { button: {}, 'input[type=text],select': {} });

  addComponents(globals);
  addComponents(details);
  addComponents(btns);
});
