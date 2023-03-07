const projectsData = [
  {
    title: 'Lettergun.com',
    description: `A service to create hand-written letters using robots and an LSTM neural
    network. The product is built using a Python stack; Tensorflow, Django, and GCP.`,
    imgSrc: '/static/images/portfolio_thumbnails/lettergun.png',
    href: 'https://lettergun.com',
  },
  {
    title: 'Custom web analytics',
    description: `A custom analytics back-end and front-end for this website,
    built using GCP (Cloud Functions, Pub/Sub, BigQuery) and React.`,
    imgSrc: '/static/images/portfolio_thumbnails/analytics.jpg',
    href: '/metrics',
  },
  {
    title: 'Interface for order-book data',
    description: `A technical exercise I worked on as part of an interview for
    a crypto trading company.`,
    imgSrc: '/static/images/order-book.gif',
    href: '/blog/stoic-interview-technical-exercise',
  },
  {
    title: 'Machine Vision: Traffic Light Recognition',
    description: `An image recognition app to identify and label traffic lights
    using the Azure Custom Vision API. You can upload and test your owm images.`,
    imgSrc: '/static/images/traffic_lights/thumbnail.png',
    href: 'https://python-blog.johnmathews.is/traffic.html',
  },
  {
    title: 'Modelling credit risk',
    description: `Use logistic regression to model credit risk`,
    imgSrc: '/static/images/credit-risk.webp',
    href: '/blog/data-exploration-exercise',
  },
  {
    title: 'Analysis of 5 cryptocurrencies',
    description: `Comparing the daily mean and median values of on-chain
    transactions in order to quantify organic blockchain use.`,
    imgSrc: '/static/images/portfolio_thumbnails/btc-analysis.png',
    href: '/blog/btc-fork-analysis',
  },
  {
    title: 'Blockchains 101',
    description: `An introduction to the main components of a blockchain, with
    examples.`,
    imgSrc: '/static/images/portfolio_thumbnails/blockchain.png',
    href: '/blog/blockchain-introduction',
  },
  {
    title: 'Automated reconciliation of a General Ledger and Trial Balance',
    description: `A script to reconcile a GL and TB automatically. The example
    uses mocked data.`,
    imgSrc: '/static/images/portfolio_thumbnails/coins.jpg',
    href: '/blog/reconciliation',
  },
  {
    title: 'Doctorate Research - Silos and granular flows',
    description: `A brief overview of my work investigation silos and granular
    flows in increased gravitational fields.`,
    imgSrc: '/static/images/portfolio_thumbnails/silo_piv.jpeg',
    href: '/blog/silos',
  },
]

export default projectsData
