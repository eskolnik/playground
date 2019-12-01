// Mock data fetching

// fetch data for Drawer 1 [LATER]

// fetch context data

const mockContextData = {
  nodes: [
    {
      type: 'customer',
      modifier: 'non-B2B',
    },
    {
      type: 'storefront',
      modifier: null,
    }
  ]
}

const fetchContextData = () => {
  return new Promise(resolve => {
    setTimeout(() => resolve(mockContextData), 500)
  })
}

export {fetchContextData}