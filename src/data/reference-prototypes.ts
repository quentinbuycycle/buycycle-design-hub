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
    features: [],
  },
  {
    id: 'seller-xp',
    title: 'Seller XP',
    features: [],
  },
  {
    id: 'post-transaction-xp',
    title: 'Post-Transaction XP',
    features: [],
  },
  {
    id: 'profile',
    title: 'Profile',
    features: [],
  },
]
