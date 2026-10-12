import { Link } from 'react-router-dom'
import { FaArrowRight, FaCheckCircle, FaClock, FaMapMarkedAlt, FaMapMarkerAlt, FaStar } from 'react-icons/fa'
import { stores } from '../data/marketplace.js'

export function NearbyShops() {
  return (
    <main className="page-container content-page nearby-page">
      <div className="page-title-row">
        <div>
          <p className="overline">SHOP YOUR NEIGHBOURHOOD</p>
          <h1>Shops near you</h1>
          <p className="subtle">Discover trusted local stores around Onitsha.</p>
        </div>
        <span className="nearby-location"><FaMapMarkerAlt /> Onitsha, Anambra</span>
      </div>

      <section className="nearby-map">
        <div className="map-grid" aria-hidden="true" />
        <div className="map-road road-one" aria-hidden="true" />
        <div className="map-road road-two" aria-hidden="true" />
        <div className="map-label map-label-one">MAIN MARKET</div>
        <div className="map-label map-label-two">OCHANJA</div>
        <span className="map-pin map-pin-one"><FaMapMarkerAlt /></span>
        <span className="map-pin map-pin-two"><FaMapMarkerAlt /></span>
        <span className="map-pin map-pin-three"><FaMapMarkerAlt /></span>
        <div className="map-current"><FaMapMarkerAlt /><span>You’re browsing<br />Onitsha</span></div>
        <div className="map-caption"><FaMapMarkedAlt /><span><b>Local stores around you</b><small>Distances are approximate</small></span></div>
      </section>

      <section className="nearby-results">
        <div className="section-heading">
          <div><p className="overline">LOCAL MERCHANTS</p><h2>Nearby shops <span className="inline-count">{stores.length}</span></h2></div>
          <span className="result-count">Sorted by distance</span>
        </div>
        <div className="nearby-store-list">
          {stores.map((store) => (
            <article className="nearby-store-card" key={store.id}>
              <Link className="nearby-store-image" to={`/store/${store.id}`} aria-label={`View ${store.name}`}>
                <img src={store.image} alt="" />
                {store.verified && <span><FaCheckCircle /> Verified</span>}
              </Link>
              <div className="nearby-store-details">
                <p className="overline">{store.category}</p>
                <Link className="nearby-store-name" to={`/store/${store.id}`}>{store.name}</Link>
                <span className="nearby-address"><FaMapMarkerAlt /> {store.address}</span>
                <div className="nearby-store-meta">
                  <span className="nearby-distance"><FaMapMarkerAlt /> {store.distance} away</span>
                  <span className="nearby-rating"><FaStar /> {store.rating} <small>({store.reviews})</small></span>
                  <span><FaClock /> Open today</span>
                </div>
              </div>
              <Link className="button button-outline nearby-view-link" to={`/store/${store.id}`}>View shop <FaArrowRight /></Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
