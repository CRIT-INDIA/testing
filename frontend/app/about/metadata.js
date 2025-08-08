export const metadata = {
  title: "About Us - critindia",
  description: "Learn about critindia - A leading SAP consulting firm with expertise in implementation, support, and digital transformation. Discover our journey, mission, and values.",
  alternates: {
    canonical: "https://www.critindia.com/about"
  },
  openGraph: {
    title: "About Us - critindia | SAP Consulting Experts",
    description: "Discover the story behind critindia, a leading SAP consulting firm. Learn about our expertise, values, and commitment to delivering exceptional SAP solutions and services.",
    url: "https://www.critindia.com/about",
    siteName: "critindia",
    images: [
      {
        url: "https://res.cloudinary.com/duz9xipfm/image/upload/v1753937310/CRIT-3D_cpzr1n_1_efzl5o.avif",
        width: 150,
        height: 40,
        alt: 'About critindia - SAP Consulting Experts',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us - critindia | SAP Consulting Experts',
    description: 'Learn about critindia - A leading SAP consulting firm with expertise in implementation, support, and digital transformation. Discover our journey and values.',
    images: ['https://res.cloudinary.com/duz9xipfm/image/upload/v1753937310/CRIT-3D_cpzr1n_1_efzl5o.avif'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  additionalMetaTags: [
    {
      property: 'article:modified_time',
      content: new Date().toISOString(),
    },
  ],
  jsonLd: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': 'https://www.critindia.com/',
        url: 'https://www.critindia.com/',
        name: 'critindia : Connecting roots of SAP',
        isPartOf: { '@id': 'https://www.critindia.com/#website' },
        about: { '@id': 'https://www.critindia.com/#organization' },
        primaryImageOfPage: { '@id': 'https://www.critindia.com/#primaryimage' },
        image: { '@id': 'https://www.critindia.com/#primaryimage' },
        thumbnailUrl: 'https://www.critindia.com/critindia.png',
        datePublished: '2025-07-31T11:19:30+00:00',
        dateModified: '2025-07-31T11:48:47+00:00',
        description: 'Crit India is in SAP implementation and support. Critindia provides SAP solution and services across entire SAP range of technology.',
        breadcrumb: { '@id': 'https://www.critindia.com/#breadcrumb' },
        inLanguage: 'en-US',
        potentialAction: [{ '@type': 'ReadAction', target: ['https://www.critindia.com/'] }]
      },
      {
        '@type': 'ImageObject',
        inLanguage: 'en-US',
        '@id': 'https://www.critindia.com/#primaryimage',
        url: 'https://www.critindia.com/critindia.png',
        contentUrl: 'https://www.critindia.com/critindia.png',
        width: 150,
        height: 40,
        caption: 'critindia-logo'
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://www.critindia.com/#breadcrumb',
        itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home' }]
      },
      {
        '@type': 'WebSite',
        '@id': 'https://www.critindia.com/#website',
        url: 'https://www.critindia.com/',
        name: 'critindia',
        description: 'Connecting roots of SAP',
        publisher: { '@id': 'https://www.critindia.com/#organization' },
        inLanguage: 'en-US'
      },
      {
        '@type': 'Organization',
        '@id': 'https://www.critindia.com/#organization',
        name: 'critindia',
        url: 'https://www.critindia.com/',
        logo: {
          '@type': 'ImageObject',
          inLanguage: 'en-US',
          '@id': 'https://www.critindia.com/#/schema/logo/image/',
          url: 'https://www.critindia.com/critindia.png',
          contentUrl: 'https://www.critindia.com/critindia.png',
          width: 150,
          height: 40,
          caption: 'critindia-Connecting roots of SAP'
        },
        image: { '@id': 'https://www.critindia.com/#/schema/logo/image/' }
      }
    ]
  }
};
