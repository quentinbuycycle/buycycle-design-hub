export type PrototypeEntry = {
  title: string
  web?: string
  webDesktop?: string
  webMobile?: string
  app?: string
}

export type ProductArea = {
  id: string
  title: string
  features: PrototypeEntry[]
}

export const referencePrototypes: ProductArea[] = [
  {
    id: 'buyer-xp',
    title: 'Buyer XP',
    features: [
      {
        title: 'Checkout',
        webDesktop: 'checkout-desktop.html',
        webMobile: 'checkout-mobile-optionA.html',
        app: 'checkout-app.html',
      },
    ],
  },
  {
    id: 'seller-xp',
    title: 'Seller XP',
    features: [
      {
        title: 'Seller Profile',
        webMobile: 'Seller profile - Mobile web.html',
      },
    ],
  },
  {
    id: 'post-transaction-xp',
    title: 'Post-Transaction XP',
    features: [
      {
        title: 'Claim Form',
        web: 'claim-form-modal-private seller.html',
      },
      {
        title: 'Claim Summary',
        web: 'claim-summary.html',
      },
      {
        title: 'Home Pick-up Packaging — Bikes',
        web: 'Packaging.html',
      },
      {
        title: 'Shop Drop-off — No Packaging',
        web: 'Shop-drop-off-no-packaging.html',
      },
      {
        title: 'Shop Drop-off — Packaging',
        web: 'Shop-drop-off-packaging.html',
      },
    ],
  },
  {
    id: 'profile',
    title: 'Profile',
    features: [
      {
        title: 'User Profile',
        app: 'Profile - App.html',
      },
      {
        title: 'Payment',
        webDesktop: 'Payment-Desktop.html',
        app: 'Payment-Mobile-App.html',
      },
    ],
  },
]
