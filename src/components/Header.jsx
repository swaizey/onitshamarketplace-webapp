import { FaCompass, FaInbox, FaMapMarkerAlt, FaSearch, FaShoppingBag, FaUserCircle } from 'react-icons/fa'
import logo from '../assets/logo.png'

export function Header({ activePage, cartCount, search, setSearch, navigate, openExplore }) {
  return (
    <header className="app-header">
      <button className="brand-lockup" type="button" onClick={() => navigate('Home')} aria-label="Onitsha MarketPlace home">
        <img src={logo} alt="Onitsha MarketPlace" />
      </button>
      <form className="header-search" onSubmit={(event) => { event.preventDefault(); openExplore(search) }}>
        <FaSearch aria-hidden="true" />
        <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search products, shops, or merchants..." aria-label="Search the marketplace" />
        <button type="submit">Search</button>
      </form>
      <nav className="header-actions" aria-label="Main navigation">
        <button type="button" className="location-link" onClick={() => navigate('NearbyShops')}><FaMapMarkerAlt /> <span>Onitsha, Anambra</span></button>
        <button type="button" className={activePage === 'Explore' ? 'header-link active' : 'header-link'} onClick={() => navigate('Explore')}><FaCompass /> Explore</button>
        <button type="button" className={activePage === 'Inbox' ? 'header-link active' : 'header-link'} onClick={() => navigate('Inbox')}><FaInbox /> Inbox</button>
        <button type="button" className="cart-link" onClick={() => navigate('Cart')} aria-label={`Cart with ${cartCount} items`}><FaShoppingBag /><span>{cartCount}</span></button>
        <button type="button" className="avatar-link" onClick={() => navigate('Profile')} aria-label="Profile"><FaUserCircle /></button>
      </nav>
    </header>
  )
}
