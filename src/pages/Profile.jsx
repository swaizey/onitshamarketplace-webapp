import { useState } from 'react'
import { FaArrowLeft, FaArrowRight, FaBox, FaBoxOpen, FaChevronRight, FaHeart, FaUser } from 'react-icons/fa'
import { EmptyState } from '../components/EmptyState.jsx'
import { formatNaira } from '../data/marketplace.js'

export function Profile({ orders, favorites, products, toggleFavorite, navigate, openProduct }) {
  const [section, setSection] = useState('profile')
  const savedProducts = products.filter((product) => favorites.includes(product.id))

  if (section === 'orders') {
    return (
      <main className="page-container content-page">
        <button className="back-link" type="button" onClick={() => setSection('profile')}><FaArrowLeft /> Back to profile</button>
        <div className="page-title-row"><div><p className="overline">YOUR SHOPPING ACTIVITY</p><h1>My orders</h1><p className="subtle">Track your orders from local stores.</p></div></div>
        <section className="order-list">{orders.map((order) => <article className="order-card" key={order.id}><img src={order.image} alt="" /><div className="order-info"><div className="order-heading"><b>#{order.id}</b><span className={`status-pill ${order.status.toLowerCase()}`}>{order.status}</span></div><h3>{order.product}</h3><p>Ordered {order.date}</p><b>{formatNaira(order.unitPrice * order.quantity)}</b></div><button type="button" className="button button-outline" onClick={() => openProduct(order.productId)}>View item</button></article>)}</section>
      </main>
    )
  }

  if (section === 'saved') {
    return (
      <main className="page-container content-page">
        <button className="back-link" type="button" onClick={() => setSection('profile')}><FaArrowLeft /> Back to profile</button>
        <div className="page-title-row"><div><p className="overline">YOUR FAVOURITES</p><h1>Saved products</h1><p className="subtle">Products you’ve saved for later.</p></div></div>
        {savedProducts.length ? <div className="product-grid">{savedProducts.map((product) => <article className="product-card" key={product.id}><button className="product-photo" type="button" onClick={() => openProduct(product.id)}><img src={product.image} alt={product.name} /></button><button className="heart-button is-favorite" type="button" aria-label="Remove from saved products" onClick={() => toggleFavorite(product.id)}><FaHeart /></button><button className="product-details" type="button" onClick={() => openProduct(product.id)}><span className="product-name">{product.name}</span><span className="product-price">{formatNaira(product.price)}</span></button></article>)}</div> : <EmptyState title="No saved products yet" detail="Tap the heart on a product to save it here." action="Explore products" onAction={() => navigate('Explore')} />}
      </main>
    )
  }

  return (
    <main className="page-container content-page narrow-page">
      <div className="profile-banner"><span className="profile-avatar"><FaUser /></span><div><p className="overline">YOUR ACCOUNT</p><h1>Welcome, Chiamaka</h1><p>Welcome to Onitsha MarketPlace</p></div></div>
      <div className="profile-menu">
        <button type="button" onClick={() => setSection('orders')}><span><FaBox /></span><b>My orders</b><small>View and track your orders</small><i><FaChevronRight /></i></button>
        <button type="button" onClick={() => navigate('Inbox')}><span><FaBoxOpen /></span><b>Messages</b><small>Chat with local merchants</small><i><FaChevronRight /></i></button>
        <button type="button" onClick={() => setSection('saved')}><span><FaHeart /></span><b>Saved products</b><small>Your favourite local finds</small><i><FaChevronRight /></i></button>
        <button type="button" onClick={() => navigate('Home')}><span><FaArrowRight /></span><b>Continue shopping</b><small>Discover more from Onitsha</small><i><FaChevronRight /></i></button>
      </div>
    </main>
  )
}
