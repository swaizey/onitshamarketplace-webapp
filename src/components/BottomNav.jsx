import { FaCompass, FaHome, FaInbox, FaShoppingCart, FaUser } from 'react-icons/fa'

const items = [
  { page: 'Home', label: 'Home', Icon: FaHome },
  { page: 'Explore', label: 'Explore', Icon: FaCompass },
  { page: 'Cart', label: 'Cart', Icon: FaShoppingCart },
  { page: 'Inbox', label: 'Inbox', Icon: FaInbox },
  { page: 'Profile', label: 'Profile', Icon: FaUser },
]

export function BottomNav({ activePage, cartCount, navigate }) {
  return (
    <nav className="mobile-nav" aria-label="Marketplace navigation">
      {items.map(({ page, label, Icon }) => (
        <button type="button" key={page} className={activePage === page ? 'mobile-nav-item selected' : 'mobile-nav-item'} onClick={() => navigate(page)}>
          <span className="nav-icon"><Icon /></span>{label}
          {page === 'Cart' && cartCount > 0 && <i>{cartCount}</i>}
        </button>
      ))}
    </nav>
  )
}
