import { FaArrowRight, FaHeart, FaRegHeart, FaRegTrashAlt, FaShoppingBag } from 'react-icons/fa'
import { EmptyState } from '../components/EmptyState.jsx'
import { formatNaira } from '../data/marketplace.js'

const DELIVERY_FEE = 2000

export function Cart({ cart, updateQuantity, removeFromCart, favorites, toggleFavorite, navigate, showToast, openProduct, products }) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <main className="page-container content-page">
      <div className="page-title-row"><div><p className="overline">Ready when you are</p><h1>Your cart <span className="inline-count">{cart.reduce((sum, item) => sum + item.quantity, 0)}</span></h1><p className="subtle">Review your items before you check out.</p></div><button className="back-link" type="button" onClick={() => navigate('Explore')}>Continue shopping <FaArrowRight /></button></div>
      {cart.length ? <div className="cart-layout">
        <section className="cart-items">{cart.map((item) => <article className="cart-item" key={item.id}>
          <button type="button" className="cart-image" onClick={() => openProduct(products.find((product) => product.id === item.id)?.id ?? products[0].id)}><img src={item.image} alt={item.name} /></button>
          <div className="cart-item-info"><b className="plain-title">{item.name}</b><p>Sold by Royal Fabrics &amp; Fashion</p><b>{formatNaira(item.price)}</b><div className="quantity-control"><button type="button" aria-label={`Decrease ${item.name} quantity`} onClick={() => updateQuantity(item.id, -1)}>−</button><span>{item.quantity}</span><button type="button" aria-label={`Increase ${item.name} quantity`} onClick={() => updateQuantity(item.id, 1)}>+</button></div></div>
          <div className="cart-item-tools"><button type="button" onClick={() => toggleFavorite(item.id)} aria-label={favorites.includes(item.id) ? 'Remove from saved items' : 'Save item'}>{favorites.includes(item.id) ? <FaHeart /> : <FaRegHeart />}</button><button type="button" onClick={() => removeFromCart(item.id)} aria-label={`Remove ${item.name} from cart`}><FaRegTrashAlt /></button></div>
        </article>)}</section>
        <aside className="summary-card"><h2>Order summary</h2><div className="summary-line"><span>Subtotal</span><b>{formatNaira(subtotal)}</b></div><div className="summary-line"><span>Delivery fee</span><b>{formatNaira(DELIVERY_FEE)}</b></div><div className="summary-line total"><span>Total</span><b>{formatNaira(subtotal + DELIVERY_FEE)}</b></div><button className="button button-primary button-wide" type="button" onClick={() => showToast('Checkout will be available when your account is set up.')}>Proceed to checkout <FaArrowRight /></button><p className="secure-note"><FaShoppingBag /> &nbsp; Secure checkout · Local delivery</p></aside>
      </div> : <EmptyState title="Your cart is empty" detail="Browse the marketplace to find something you love." action="Start shopping" onAction={() => navigate('Explore')} />}
    </main>
  )
}
