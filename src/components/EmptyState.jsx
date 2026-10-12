import { FaBoxOpen } from 'react-icons/fa'

export function EmptyState({ title, detail, action, onAction }) {
  return (
    <div className="empty-state">
      <div className="empty-icon"><FaBoxOpen /></div>
      <h2>{title}</h2>
      <p>{detail}</p>
      {action && <button className="button button-primary" type="button" onClick={onAction}>{action}</button>}
    </div>
  )
}
