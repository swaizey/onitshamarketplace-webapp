import { useEffect, useState } from 'react'
import { FaArrowRight, FaArrowUpRightFromSquare, FaBagShopping, FaHouse, FaInbox, FaLocationDot, FaMobileScreenButton, FaUtensils } from 'react-icons/fa6'
import { FaSearch } from 'react-icons/fa'
import { ProductCard } from '../components/ProductCard.jsx'
import { categories } from '../data/marketplace.js'

const banners = [
  { image: '/images/osha.jpg', eyebrow: 'SHOP LOCAL', title: 'Discover top-quality products from Onitsha', action: 'Shop now' },
  { image: '/images/osha1.jpg', eyebrow: 'MADE FOR YOU', title: 'Find something special in the heart of Onitsha', action: 'Explore market' },
  { image: '/images/osha.jpg', eyebrow: 'ONITSHA MARKETPLACE', title: 'The best of Onitsha at your fingertips', action: 'Browse products' },
]

const categoryIcons = [FaBagShopping, FaMobileScreenButton, FaHouse, FaUtensils]
const descriptions = ['Fresh looks for every day', 'Everyday tech and gadgets', 'Make your space yours', 'Local favourites']

export function Home({ products, favorites, toggleFavorite, openExplore, navigate, openProduct }) {
  const [activeBanner, setActiveBanner] = useState(0)
  const [query, setQuery] = useState('')

  useEffect(() => {
    const timer = window.setInterval(() => setActiveBanner((current) => (current + 1) % banners.length), 4500)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <main className="page-container buyer-home">
      <div className="mobile-location">
        <button className="home-location-link" type="button" onClick={() => navigate('NearbyShops')} aria-label="Find nearby shops">
          <FaLocationDot /><span>Onitsha, Anambra</span>
        </button>
        <button className="home-inbox-link" type="button" aria-label="Open inbox" onClick={() => navigate('Inbox')}><FaInbox /></button>
      </div>
      <form className="home-search" onSubmit={(event) => { event.preventDefault(); openExplore(query) }}>
        <FaSearch aria-hidden="true" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search for products, shops, or merchants..." aria-label="Search for products" />
        <button type="submit">Search</button>
      </form>
      <section className="hero-banner" style={{ backgroundImage: `linear-gradient(90deg, rgba(0,48,37,.84), rgba(0,48,37,.12)), url("${banners[activeBanner].image}")` }}>
        <div className="hero-copy"><span className="eyebrow">{banners[activeBanner].eyebrow}</span><h1>{banners[activeBanner].title}</h1><button className="button button-yellow" type="button" onClick={() => openExplore()}>{banners[activeBanner].action}<FaArrowRight /></button></div>
        <div className="hero-dots">{banners.map((banner, index) => <button type="button" aria-label={`Show banner ${index + 1}`} key={banner.eyebrow} className={activeBanner === index ? 'active' : ''} onClick={() => setActiveBanner(index)} />)}</div>
      </section>
      <section className="section-block">
        <div className="section-heading"><div><p className="overline">Shop by department</p><h2>Explore categories</h2></div><button type="button" className="text-link" onClick={() => openExplore()}>All categories <FaArrowRight /></button></div>
        <div className="category-grid">{categories.map((item, index) => { const Icon = categoryIcons[index]; return <button type="button" className="category-tile" key={item} onClick={() => openExplore('', item === 'Fashion' ? 'Clothes' : item)}><span className="category-icon"><Icon /></span><span><b>{item}</b><small>{descriptions[index]}</small></span><FaArrowUpRightFromSquare className="category-arrow" /></button> })}</div>
      </section>
      <section className="section-block">
        <div className="section-heading"><div><p className="overline">Picked for you</p><h2>Featured products</h2></div><button type="button" className="text-link" onClick={() => openExplore()}>See all <FaArrowRight /></button></div>
        <div className="product-grid featured-grid">{products.slice(0, 6).map((product) => <ProductCard key={product.id} product={product} favorite={favorites.includes(product.id)} onFavorite={() => toggleFavorite(product.id)} onSelect={() => openProduct(product.id)} />)}</div>
      </section>
      <section className="local-promo"><div><p className="overline">Your community, closer</p><h2>Good finds. Great people. Right here in Onitsha.</h2><p>Shop from local merchants and find something you’ll love.</p></div><button className="button button-primary" type="button" onClick={() => openExplore()}>Explore the marketplace <FaArrowRight /></button></section>
      <section className="section-block">
        <div className="section-heading"><div><p className="overline">Popular right now</p><h2>Discover something new</h2></div><button type="button" className="text-link" onClick={() => openExplore()}>Browse all <FaArrowRight /></button></div>
        <div className="product-grid">{products.slice(6, 14).map((product) => <ProductCard key={product.id} product={product} favorite={favorites.includes(product.id)} onFavorite={() => toggleFavorite(product.id)} onSelect={() => openProduct(product.id)} />)}</div>
      </section>
    </main>
  )
}
