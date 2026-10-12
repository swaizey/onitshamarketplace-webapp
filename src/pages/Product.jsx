import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FaArrowLeft, FaArrowRight, FaCheckCircle, FaHeart, FaRegHeart, FaStar } from 'react-icons/fa'
import { EmptyState } from '../components/EmptyState.jsx'
import { ProductCard } from '../components/ProductCard.jsx'
import { formatNaira, products, stores } from '../data/marketplace.js'

export function Product({ favorites, toggleFavorite, addToCart, startConversation }) {
  const { productId } = useParams()
  const navigate = useNavigate()
  const product = products.find((item) => item.routeId === productId)
  const store = stores.find((item) => item.id === product?.storeId)
  const [selectedColor, setSelectedColor] = useState('Red')
  const [selectedSize, setSelectedSize] = useState('M')

  if (!product || !store) {
    return <main className="page-container content-page"><EmptyState title="Product not found" detail="This product may have been removed or the link may be incorrect." action="Explore products" onAction={() => navigate('/explore')} /></main>
  }

  const relatedProducts = products.filter((item) => item.id !== product.id && item.category === product.category).slice(0, 4)

  return (
    <main className="page-container detail-page">
      <button className="back-link" type="button" onClick={() => navigate(-1)}><FaArrowLeft /> Back to shopping</button>
      <div className="detail-layout">
        <div className="detail-image"><img src={product.image} alt={product.name} /><span className="image-badge">LOCAL PICK</span></div>
        <section className="detail-copy">
          <p className="overline">{product.category} · Onitsha</p><h1>{product.name}</h1>
          <div className="detail-rating"><FaStar /> {product.rating} <span>({product.reviews} reviews)</span></div>
          <p className="detail-price">{formatNaira(product.price)}</p>
          <p className="detail-desc">Shop quality {product.name.toLowerCase()} from trusted Onitsha merchants. Carefully selected for quality, everyday use, and local style.</p>
          <div className="product-options"><b>Color: {selectedColor}</b><div className="color-options">{[['#f45137', 'Red'], ['#2084d8', 'Blue'], ['#f5b811', 'Yellow'], ['#3a9b35', 'Green']].map(([color, label]) => <button key={label} type="button" className={`color-dot ${selectedColor === label ? 'selected' : ''}`} style={{ backgroundColor: color }} title={label} aria-label={`Select ${label}`} aria-pressed={selectedColor === label} onClick={() => setSelectedColor(label)} />)}</div></div>
          <div className="product-options"><b>Size: {selectedSize}</b><div className="size-options">{['S', 'M', 'L', 'XL'].map((size) => <button key={size} type="button" className={size === selectedSize ? 'size-option selected' : 'size-option'} aria-pressed={size === selectedSize} onClick={() => setSelectedSize(size)}>{size}</button>)}</div></div>
          <div className="detail-actions"><button type="button" className="button button-primary" onClick={() => addToCart(product)}>Add to cart <FaArrowRight /></button><button type="button" className="button button-outline" onClick={() => toggleFavorite(product.id)}>{favorites.includes(product.id) ? <FaHeart /> : <FaRegHeart />} Save</button></div>
          <article className="store-card">
            <img className="store-avatar" src={store.image} alt="" />
            <div className="store-card-info"><small>Sold by</small><b>{store.name}</b><span><FaCheckCircle /> Verified local store</span></div>
            <Link className="button button-outline" to={`/store/${store.id}`}>View store</Link>
            <button type="button" className="button button-outline" onClick={startConversation}>Message</button>
          </article>
        </section>
      </div>
      {relatedProducts.length > 0 && <section className="section-block related-products"><div className="section-heading"><div><p className="overline">More to love</p><h2>Similar products</h2></div><Link className="text-link" to="/explore">See all <FaArrowRight /></Link></div><div className="product-grid">{relatedProducts.map((item) => <ProductCard key={item.id} product={item} favorite={favorites.includes(item.id)} onFavorite={() => toggleFavorite(item.id)} onSelect={() => navigate(`/product/${item.routeId}`)} />)}</div></section>}
    </main>
  )
}
