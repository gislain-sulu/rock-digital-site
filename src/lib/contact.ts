export const contactInfo = {
  email: 'rock contact@rockdigital.io',
  phone: '243810674444',
  address: 'Kinshasa - République Démocratique du Congo',
} as const;

export const contactLinks = {
  email: `mailto:${contactInfo.email}`,
  phone: `tel:${contactInfo.phone}`,
} as const;
