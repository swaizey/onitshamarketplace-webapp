import { useMemo } from 'react'
import { FaSearch } from 'react-icons/fa'
import { EmptyState } from '../components/EmptyState.jsx'
import { ProductCard } from '../components/ProductCard.jsx'
import { categoryFilters } from '../data/marketplace.js'

export function Explore({ products, favorites, toggleFavorite, search, setSearch, selectedCategory, setSelectedCategory, openProduct }) {
  const results = useMemo(() => {
    const query = search.trim().toLowerCase()
    return products.filter((product) => (selectedCategory === 'All categories' || product.category === selectedCategory)
      && (!query || `${product.name} ${product.category}`.toLowerCase().includes(query)))
  }, [products, search, selectedCategory])

  return (
    <main className="page-container content-page">
      <div className="page-title-row"><div><p className="overline">Discover local finds</p><h1>Explore products</h1><p className="subtle">Browse the best from Onitsha’s local stores.</p></div><span className="result-count">{results.length} products</span></div>
      <div className="explore-toolbar"><label className="explore-search"><FaSearch /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search products, stores, or categories" /></label><select aria-label="Filter by category" value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)}>{categoryFilters.map((item) => <option key={item}>{item}</option>)}</select></div>
      <div className="filter-row">{['All categories', 'Clothes', 'Shoes', 'Bags', 'Electronics', 'Home & Living'].map((item) => <button type="button" key={item} className={selectedCategory === item ? 'filter-chip active' : 'filter-chip'} onClick={() => setSelectedCategory(item)}>{item}</button>)}</div>
      {results.length
        ? <div className="product-grid">{results.map((product) => <ProductCard key={product.id} product={product} favorite={favorites.includes(product.id)} onFavorite={() => toggleFavorite(product.id)} onSelect={() => openProduct(product.id)} />)}</div>
        : <EmptyState title="No products found" detail="Try another search or category." action="Clear filters" onAction={() => { setSearch(''); setSelectedCategory('All categories') }} />}
    </main>
  )
}
