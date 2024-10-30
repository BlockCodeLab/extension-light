import featureImage from './feature.png';
import iconImage from './icon.png';

export default {
  name: 'Light',
  description: 'Sense and use the light.',
  image: featureImage,
  icon: iconImage,
  tags: ['blocks', 'sensor', 'display'],

  // l10n
  translations: {
    en: {
      name: 'Light',
      description: 'Sense and use the light.',
    },
    'zh-Hans': {
      name: '光',
      description: '感受和使用真实的光。',
    },
  },
};
