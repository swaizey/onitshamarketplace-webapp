import { useState } from 'react'
import { FaArrowLeft, FaCircle, FaPaperPlane, FaSearch, FaStore } from 'react-icons/fa'
import { EmptyState } from '../components/EmptyState.jsx'

export function Inbox({ conversations, sendMessage, markConversationRead }) {
  const [search, setSearch] = useState('')
  const [draft, setDraft] = useState('')
  const [chatOpen, setChatOpen] = useState(false)
  const conversation = conversations[0]
  const matchesSearch = conversation && `${conversation.merchantName} ${conversation.lastMessage}`.toLowerCase().includes(search.toLowerCase())

  const submitMessage = (event) => {
    event.preventDefault()
    if (!draft.trim()) return
    sendMessage(draft)
    setDraft('')
  }

  return (
    <main className="page-container content-page narrow-page">
      {chatOpen && conversation ? <>
        <button type="button" className="back-link" onClick={() => setChatOpen(false)}><FaArrowLeft /> Back to inbox</button>
        <div className="chat-heading"><span className="store-avatar"><FaStore /></span><div><b>{conversation.merchantName}</b><small>Typically replies within a few hours</small></div><span className="online-dot"><FaCircle /> Online</span></div>
        <section className="chat-messages" aria-live="polite">{conversation.messages.map((message) => <div key={message.id} className={`chat-bubble ${message.fromBuyer ? 'sent' : ''}`}><p>{message.text}</p><small>{message.sentAt}</small></div>)}</section>
        <form className="chat-compose" onSubmit={submitMessage}><input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Write a message..." aria-label="Write a message" /><button type="submit" aria-label="Send message"><FaPaperPlane /></button></form>
      </> : <>
        <div className="page-title-row"><div><p className="overline">Stay in touch</p><h1>Inbox</h1><p className="subtle">Conversations with local merchants.</p></div></div>
        <label className="explore-search inbox-search"><FaSearch /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search messages" /></label>
        <div className="conversation-list">{conversation && matchesSearch && <button type="button" className="conversation-row" onClick={() => { setChatOpen(true); markConversationRead() }}><span className="store-avatar"><FaStore /></span><span className="conversation-copy"><b>{conversation.merchantName}</b><small>{conversation.lastMessage}</small></span><span className="conversation-time">{conversation.updatedAt}</span>{conversation.unreadCount > 0 && <i className="unread-dot">{conversation.unreadCount}</i>}</button>}</div>
        {!conversation || !matchesSearch ? <EmptyState title={search ? 'No messages found' : 'No conversations yet'} detail={search ? 'Try another store name or message.' : 'Contact a store owner from a product page to start chatting.'} /> : null}
      </>}
    </main>
  )
}
