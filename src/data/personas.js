export const PERSONAS = [
  {
    id: 'taylor',
    label: 'Taylor',
    role: 'Standard traveller',
    initials: 'TS',
    accent: '#f29b64',
    context: {
      kind: 'user',
      key: 'customer-taylor',
      name: 'Taylor Singh',
      user_tier: 'Standard',
      region: 'APJ',
      beta_tester: false,
    },
  },
  {
    id: 'priya',
    label: 'Priya',
    role: 'QA engineer',
    initials: 'PM',
    accent: '#68d6c2',
    context: {
      kind: 'user',
      key: 'qa-priya',
      name: 'Priya Menon',
      user_tier: 'Standard',
      region: 'APJ',
      beta_tester: true,
    },
  },
  {
    id: 'kenji',
    label: 'Kenji',
    role: 'Premium traveller',
    initials: 'KW',
    accent: '#ffd36e',
    context: {
      kind: 'user',
      key: 'customer-kenji',
      name: 'Kenji Watanabe',
      user_tier: 'Premium',
      region: 'APJ',
      beta_tester: false,
    },
  },
];

export const DEFAULT_PERSONA = PERSONAS[0];
