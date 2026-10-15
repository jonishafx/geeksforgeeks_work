import { useState } from 'react'
import { PageHeader } from '../components/PageHeader'
import { useApp } from '../context/AppContext'

const starters = ['Explain', 'Debug', 'Optimize', 'Give hint', 'Generate test cases', 'Convert language']

function reply(message: string) {
  const q = message.toLowerCase()
  if (q.includes('binary search')) {
    return 'Binary search finds an item in a sorted list by repeatedly cutting the remaining window in half. Keep a clear invariant: if the target exists, it is still inside [lo, hi). Compare the middle value, then discard the half that cannot contain the answer. The work is O(log n).'
  }
  if (q.includes('debug') || q.includes('error')) {
    return 'Read the failing test first. Check types, off-by-one bounds, and whether you mutated input. For compiler errors, start at the first reported line — later errors are often cascade noise.'
  }
  if (q.includes('hint')) {
    return 'Name the constraint that hurts a brute-force scan. If you need a pair that sums to a target, a hash map of seen values is usually enough. If you need a subarray property, try a running prefix or a window.'
  }
  if (q.includes('quiz')) {
    return 'Quiz: What is the extra memory of in-place merge sort? A) O(1) B) O(log n) C) O(n). Answer: C for the typical array implementation, because merging needs a linear buffer. The recursion depth is O(log n).'
  }
  return `I can explain the idea, walk through ${message.slice(0, 80) || 'your topic'}, and suggest a smaller example. In this demo the tutor is rule-based; Phase 2 can connect Gemini or OpenAI with usage limits.`
}

export function AITutor() {
  const { user, openAuth, addXp } = useApp()
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([{ role: 'ai', text: 'Ask for an explanation, a hint, or a short study plan. Try: “Explain binary search in simple English.”' }])

  function send(text: string) {
    if (!text.trim()) return
    if (!user) {
      openAuth('login')
      return
    }
    setMessages((m) => [...m, { role: 'user', text }, { role: 'ai', text: reply(text) }])
    setInput('')
    addXp(2)
  }

  return (
    <section className="page">
      <div className="wrap">
        <PageHeader eyebrow="AI" title="Learning assistant" lede="Explain concepts, debug code, generate quizzes, and build study plans." />
        <div className="chips" style={{ marginBottom: 12 }}>
          {starters.map((s) => (
            <button key={s} className="chip" onClick={() => send(`${s} two sum`)}>{s}</button>
          ))}
        </div>
        <div className="card chat">
          <div className="messages">
            {messages.map((m, i) => (
              <div key={i} className={`bubble ${m.role}`}>{m.text}</div>
            ))}
          </div>
          <form className="composer" onSubmit={(e) => { e.preventDefault(); send(input) }}>
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Explain binary search in simple English." />
            <button className="btn btn-green">Send</button>
          </form>
        </div>
      </div>
    </section>
  )
}
