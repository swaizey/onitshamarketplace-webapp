import { FaHeart, FaRegHeart, FaStar } from 'react-icons/fa'

export function ProductCard({ product, favorite, onFavorite, onSelect }) {
  return (
    <article className="product-card">
      <button className="product-photo" onClick={onSelect} type="button" aria-label={`View ${product.name}`}>
        <img src={product.image} alt={product.name} />
      </button>
      <button className={`heart-button ${favorite ? 'is-favorite' : ''}`} type="button" onClick={onFavorite} aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}>
        {favorite ? <FaHeart /> : <FaRegHeart />}
      </button>
      <button className="product-details" onClick={onSelect} type="button">
        <span className="product-name">{product.name}</span>
        <span className="product-price">₦{Number(product.price).toLocaleString('en-NG')}</span>
        <span className="product-rating"><FaStar /> {product.rating} <span>({product.reviews ?? 0})</span></span>
      </button>
    </article>
  )
}
