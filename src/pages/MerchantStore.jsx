import { Link, useNavigate, useParams } from 'react-router-dom'
import { FaArrowLeft, FaCheckCircle, FaClock, FaMapMarkerAlt, FaPhone, FaStar } from 'react-icons/fa'
import { EmptyState } from '../components/EmptyState.jsx'
import { ProductCard } from '../components/ProductCard.jsx'
import { products, stores } from '../data/marketplace.js'

export function MerchantStore({ favorites, toggleFavorite, startConversation }) {
  const { storeId } = useParams()
  const navigate = useNavigate()
  const store = stores.find((item) => item.id === storeId)
  const storeProducts = products.filter((product) => product.storeId === storeId)

  if (!store) {
    return <main className="page-container content-page"><EmptyState title="Store not found" detail="This store may no longer be available." action="Explore products" onAction={() => navigate('/explore')} /></main>
  }

  return (
    <main className="page-container content-page store-page">
      <button type="button" className="back-link" onClick={() => navigate(-1)}><FaArrowLeft /> Back</button>
      <section className="store-profile-card">
        <div className="store-cover" style={{ backgroundImage: `url("${store.image}")` }} />
        <div className="store-profile-info">
          <img className="store-profile-avatar" src={store.image} alt="" />
          <div className="store-profile-copy">
            <p className="overline">{store.verified && <><FaCheckCircle /> VERIFIED LOCAL STORE</>}</p>
            <h1>{store.name}</h1>
            <p className="store-category">{store.category}</p>
            <div className="store-meta"><span><FaStar /> {store.rating} ({store.reviews} reviews)</span><span><FaMapMarkerAlt /> {store.address}</span></div>
          </div>
          <button type="button" className="button button-primary" onClick={startConversation}>Message store</button>
        </div>
      </section>
      <div className="store-information">
        <section className="store-about"><p className="overline">ABOUT THE STORE</p><h2>Local finds, from people who know them best.</h2><p>{store.description}</p><div className="store-contact"><span><FaClock /> {store.openingHours}</span><span><FaPhone /> {store.phone}</span></div></section>
        <aside className="store-trust"><FaCheckCircle /><b>Verified local store</b><p>Shop with confidence from an Onitsha merchant.</p><Link to="/explore">Browse all stores <span>→</span></Link></aside>
      </div>
      <section className="section-block"><div className="section-heading"><div><p className="overline">SHOP THIS STORE</p><h2>Products from {store.name}</h2></div><span className="result-count">{storeProducts.length} products</span></div><div className="product-grid">{storeProducts.map((product) => <ProductCard key={product.id} product={product} favorite={favorites.includes(product.id)} onFavorite={() => toggleFavorite(product.id)} onSelect={() => navigate(`/product/${product.routeId}`)} />)}</div></section>
    </main>
  )
}
