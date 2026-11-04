import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { GitBranch, GitCommitHorizontal } from 'lucide-react'
import { Badge, Bar, Collapse, Spinner, Stage, Window, type Act } from '../stageshow/kit'
import './promo-stage.css'

// AR Dhrubo Studio promo stage: a new flagship deployment lands at the top
// of ardhrubo.dev/studio/deployments, builds with live telemetry, turns Ready
// in emerald green, and claims the Current badge before looping cleanly.

type S = { open: boolean; ready: boolean; t: number }

const initial: S = { open: false, ready: false, t: 10 }

async function script(a: Act<S>) {
  await a.wait(900)
  a.mark('deploy')
  a.put({ open: true })
  for (const next of [17, 24, 31, 35]) {
    await a.wait(520)
    a.put({ t: next })
  }
  await a.wait(300)
  a.mark('ready')
  a.put({ ready: true, t: 38 })
  await a.wait(2000)
  a.put({ open: false })
  await a.wait(700)
  await a.snap({ ready: false, t: 10 })
}

const OLD = [
  { msg: 'Launch 3D studio', when: '2h ago', t: '41s' },
  { msg: null, when: null, t: null },
  { msg: null, when: null, t: null },
  { msg: null, when: null, t: null },
]

export function PromoStage() {
  return (
    <Stage<S>
      width={760}
      height={440}
      compact={{ below: 760, width: 358, height: 320 }}
      theme="dark"
      initial={initial}
      poster={{ open: true, ready: true, t: 38 }}
      script={script}
      className="ps"
    >
      {(s, _rect, layout) => (
        <Window
          url="ardhrubo.dev/studio/deployments"
          className="ps-win"
          sidebarWidth={168}
          sidebar={layout === 'compact' ? undefined : <Side />}
        >
          <div className="ps-body">
            <header className="ps-head">
              <div className="ps-title">Deployments</div>
              <span className="ps-proj">
                <Bar w={14} h={14} r={4} tone={3} />
                ardhrubo-web
              </span>
            </header>
            <div className="ps-list">
              <Collapse open={s.open} reveal="drop">
                <Row
                  lead
                  msg="Ship AI & 3D web"
                  hash="a41c9e2"
                  when="Just now"
                  status={
                    <Badge tone={s.ready ? 'success' : 'neutral'} className="ps-badge" icon={<Mark ready={s.ready} />}>
                      <Label ready={s.ready} />
                    </Badge>
                  }
                  time={`${s.t}s`}
                  current={s.ready}
                />
              </Collapse>
              {OLD.map((r, i) =>
                r.msg ? (
                  <Row
                    key={i}
                    msg={r.msg}
                    hash="7d02b18"
                    when={r.when!}
                    status={
                      <Badge tone="neutral" className="ps-badge ps-badge--old" icon={<Mark ready />}>
                        Ready
                      </Badge>
                    }
                    time={r.t!}
                    current={!(s.open && s.ready)}
                  />
                ) : (
                  <div key={i} className="ps-row ps-row--filler">
                    <span className="ps-lines">
                      <Bar w={[180, 150, 200][i - 1]} h={8} r={4} tone={2} />
                      <Bar w={110} h={7} r={3.5} tone={1} />
                    </span>
                    <Bar w={52} h={18} r={9} tone={1} />
                    <Bar w={28} h={7} r={3.5} tone={1} />
                  </div>
                ),
              )}
            </div>
          </div>
        </Window>
      )}
    </Stage>
  )
}

function Mark({ ready }: { ready: boolean }) {
  return (
    <span className="ps-mark" data-ready={ready || undefined}>
      <Spinner size={8} />
      <i className="ps-dot" />
    </span>
  )
}

function Label({ ready }: { ready: boolean }) {
  const words = useRef<HTMLSpanElement[]>([])
  const [w, setW] = useState<number[]>([])
  useLayoutEffect(() => setW(words.current.map((e) => e.offsetWidth)), [])
  const on = ready ? 1 : 0
  const shrink = w.length === 2 && w[on]! < w[1 - on]!
  return (
    <span className="ps-label" data-shrink={shrink || undefined} style={w.length ? { width: w[on] } : undefined}>
      {['Building', 'Ready'].map((t, i) => (
        <span
          key={t}
          ref={(e) => {
            if (e) words.current[i] = e
          }}
          className="ps-word"
          data-on={i === on || undefined}
        >
          {t}
        </span>
      ))}
    </span>
  )
}

function Row({
  lead,
  msg,
  hash,
  when,
  status,
  time,
  current,
}: {
  lead?: boolean
  msg: string
  hash: string
  when: string
  status: ReactNode
  time: ReactNode
  current: boolean
}) {
  return (
    <div className="ps-row" data-lead={lead || undefined}>
      <span className="ps-lines">
        <span className="ps-msg">
          {msg}
          <span className="ps-current" data-on={current || undefined}>
            Current
          </span>
        </span>
        <span className="ps-meta">
          <span className="ps-meta__item">
            <GitBranch size={12} strokeWidth={2} />
            main
          </span>
          <span className="ps-meta__item">
            <GitCommitHorizontal size={12} strokeWidth={2} />
            {hash}
          </span>
          <span className="ps-when">{when}</span>
        </span>
      </span>
      {status}
      <span className="ps-time">{time}</span>
    </div>
  )
}

function Side() {
  return (
    <nav className="ps-side">
      {[64, 111, 52, 76, 60].map((w, i) => (
        <span key={i} className="ps-nav" data-active={i === 1 || undefined}>
          <Bar w={12} h={12} r={3} tone={i === 1 ? 4 : 2} />
          <Bar w={w} h={6} tone={i === 1 ? 4 : 2} />
        </span>
      ))}
    </nav>
  )
}
