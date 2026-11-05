export const initialMessages = [
  {
    id: 'welcome',
    role: 'assistant',
    text: {
      en: 'Hello! I can guide you through government services in Ethiopia. What would you like to know?',
      am: 'ሰላም! በኢትዮጵያ የመንግሥት አገልግሎቶች ላይ መመሪያ ልሰጥዎ እችላለሁ። ምን ማወቅ ይፈልጋሉ?',
    },
  },
]

export const services = [
  { icon: '✳', category: 'PASSPORTS', title: 'Passport services', description: 'Applications, renewals, and requirements', prompt: 'How do I apply for a passport?', color: 'blue' },
  { icon: '↗', category: 'BUSINESS', title: 'Business and licensing', description: 'Licenses, registration, and verification', prompt: 'How do I renew a business license?', color: 'yellow' },
  { icon: '⌖', category: 'LAND', title: 'Land registration', description: 'Ownership, records, and procedures', prompt: 'How do I register land?', color: 'green' },
  { icon: '◉', category: 'TAX', title: 'Tax and payments', description: 'Filing, payments, and tax assistance', prompt: 'Where can I find tax information?', color: 'pink' },
]
