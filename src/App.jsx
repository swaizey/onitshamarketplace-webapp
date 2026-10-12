import { useRef, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import './App.css'
import { BottomNav } from './components/BottomNav.jsx'
import { Header } from './components/Header.jsx'
import { Cart } from './pages/Cart.jsx'
import { Explore } from './pages/Explore.jsx'
import { Home } from './pages/Home.jsx'
import { Inbox } from './pages/Inbox.jsx'
import { Profile } from './pages/Profile.jsx'
import { Product } from './pages/Product.jsx'
import { MerchantStore } from './pages/MerchantStore.jsx'
import { NearbyShops } from './pages/NearbyShops.jsx'
import { initialCart, initialConversations, initialOrders, products } from './data/marketplace.js'

const pagePaths = {
  Home: '/',
  Explore: '/explore',
  Cart: '/cart',
  Inbox: '/inbox',
  Profile: '/profile',
  NearbyShops: '/shops/nearby',
}

function MarketplaceApp() {
  const location = useLocation()
  const routerNavigate = useNavigate()
  const [cart, setCart] = useState(initialCart)
  const orders = initialOrders
  const [conversations, setConversations] = useState(initialConversations)
  const [favorites, setFavorites] = useState([])
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All categories')
  const [toast, setToast] = useState('')
  const toastTimer = useRef(null)

  const showToast = (message) => {
    setToast(message)
    window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(''), 2600)
  }

  const navigate = (nextPage) => {
    routerNavigate(pagePaths[nextPage] ?? '/')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const openExplore = (query = '', category = 'All categories') => {
    setSearch(query)
    setSelectedCategory(category)
    routerNavigate('/explore')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const openProduct = (productId) => {
    const product = products.find((item) => item.id === productId || item.routeId === productId)
    if (!product) {
      routerNavigate('/explore')
      return
    }
    setSearch('')
    setSelectedCategory('All categories')
    routerNavigate(`/product/${product.routeId}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const openStore = (storeId = 'royal-fabrics') => {
    routerNavigate(`/store/${storeId}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const addToCart = (product) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id)
      if (existing) {
        return current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      }
      return [...current, { ...product, quantity: 1 }]
    })
    showToast(`${product.name} added to your cart`)
  }

  const updateQuantity = (id, amount) => {
    setCart((current) => current.map((item) => item.id === id
      ? { ...item, quantity: Math.max(1, item.quantity + amount) }
      : item))
  }

  const removeFromCart = (id) => {
    setCart((current) => current.filter((item) => item.id !== id))
  }

  const toggleFavorite = (id) => {
    setFavorites((current) => current.includes(id)
      ? current.filter((item) => item !== id)
      : [...current, id])
  }

  const startConversation = () => {
    setConversations((current) => current.length ? current : initialConversations)
    navigate('Inbox')
  }

  const markConversationRead = () => {
    setConversations((current) => current.map((conversation) => ({ ...conversation, unreadCount: 0 })))
  }

  const sendMessage = (text) => {
    const message = text.trim()
    if (!message) return
    const sentAt = new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
    setConversations((current) => {
      const conversation = current[0] ?? initialConversations[0]
      return [{
        ...conversation,
        lastMessage: message,
        updatedAt: sentAt,
        merchantUnreadCount: conversation.merchantUnreadCount + 1,
        messages: [...conversation.messages, { id: String(Date.now()), text: message, sentAt, fromBuyer: true }],
      }]
    })
  }

  const shared = {
    products,
    cart,
    orders,
    conversations,
    favorites,
    search,
    setSearch,
    selectedCategory,
    setSelectedCategory,
    navigate,
    openExplore,
    addToCart,
    updateQuantity,
    removeFromCart,
    toggleFavorite,
    showToast,
    startConversation,
    markConversationRead,
    sendMessage,
    openProduct,
    openStore,
  }

  const page = location.pathname.startsWith('/product/')
    ? 'Product'
    : location.pathname.startsWith('/store/')
      ? 'Store'
      : location.pathname === '/shops/nearby'
        ? 'NearbyShops'
      : Object.entries(pagePaths).find(([, path]) => path === location.pathname)?.[0] ?? 'Home'

  return (
    <div className="app-shell">
      <Header
        activePage={page === 'Product' || page === 'Store' || page === 'NearbyShops' ? 'Explore' : page}
        cartCount={cart.reduce((total, item) => total + item.quantity, 0)}
        search={search}
        setSearch={setSearch}
        navigate={navigate}
        openExplore={openExplore}
      />
      <Routes>
        <Route path="/" element={<Home {...shared} />} />
        <Route path="/explore" element={<Explore {...shared} />} />
        <Route path="/cart" element={<Cart {...shared} />} />
        <Route path="/inbox" element={<Inbox {...shared} />} />
        <Route path="/profile" element={<Profile {...shared} />} />
        <Route path="/product/:productId" element={<Product {...shared} />} />
        <Route path="/store/:storeId" element={<MerchantStore {...shared} />} />
        <Route path="/shops/nearby" element={<NearbyShops />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <footer className="site-footer">
        <span>© 2026 Onitsha MarketPlace</span>
        <span>Made for local business, made for you.</span>
      </footer>
      <BottomNav activePage={page} cartCount={cart.reduce((total, item) => total + item.quantity, 0)} navigate={navigate} />
      {toast && <div className="toast-message" role="status">{toast}</div>}
    </div>
  )
}

function App() {
  return <BrowserRouter><MarketplaceApp /></BrowserRouter>
}

export default App
