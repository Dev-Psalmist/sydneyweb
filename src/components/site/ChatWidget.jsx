import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowUpRight, Loader2, MessageSquare, Phone, Send, X } from "lucide-react";
import { chatReply } from "@/lib/server-fns";
import { SITE } from "@/data/site";

const OPEN_EVENT = "sydney:open-chat";

export function openChat() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

const GREETING =
  "Good day — welcome to Sydney's Consulting. Ask me about any registration, certification or tax filing, or say \u201cbook\u201d to reserve a consultation.";

const QUICK = [
  "What do I need for CAC?",
  "How long is tax clearance?",
  "Book an appointment",
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: "assistant", content: GREETING }]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef(null);
  const send = useServerFn(chatReply);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, handler);
    return () => window.removeEventListener(OPEN_EVENT, handler);
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, open, busy]);

  const submit = async (text) => {
    const value = (text ?? input).trim();
    if (!value || busy) return;

    const history = messages
      .slice(-6)
      .map((m) => ({ role: m.role, content: m.content.slice(0, 600) }));

    setInput("");
    setMessages((m) => [...m, { role: "user", content: value }]);
    setBusy(true);

    try {
      const res = await send({ data: { message: value.slice(0, 600), history } });
      const reply = res?.reply?.trim();
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            reply ||
            `I didn't catch that. Please call ${SITE.phone} or email ${SITE.email} and the desk will help you directly.`,
        },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: `I couldn't reach the desk just now. Please call ${SITE.phone} or email ${SITE.email}.`,
        },
      ]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open live chat"}
        className="fixed bottom-5 right-5 z-[60] grid h-14 w-14 place-items-center rounded-full bg-brand text-white shadow-[0_20px_40px_-14px_rgba(123,35,82,0.75)] transition-all duration-300 hover:-translate-y-1 hover:bg-brand-deep"
      >
        {open ? <X className="h-5 w-5" /> : <MessageSquare className="h-5 w-5" />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-4 z-[60] flex h-[min(74vh,560px)] w-[min(92vw,382px)] flex-col overflow-hidden rounded-[24px] border border-white/70 bg-bone shadow-[0_50px_100px_-30px_rgba(20,16,15,0.55)]">
          <div className="flex items-center justify-between bg-brand-deep px-5 py-4 text-white">
            <div>
              <p className="text-[13px] font-medium">Client care desk</p>
              <p className="mt-0.5 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-white/55">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Online now
              </p>
            </div>
            <a
              href={SITE.phoneHref}
              className="grid h-8 w-8 place-items-center rounded-full border border-white/25 text-white/75 transition-colors hover:border-white/60 hover:text-white"
              aria-label="Call the office"
            >
              <Phone className="h-3.5 w-3.5" />
            </a>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[12.5px] leading-relaxed ${
                  m.role === "user"
                    ? "ml-auto rounded-br-md bg-brand text-white"
                    : "rounded-bl-md border border-ink/10 bg-white text-slate"
                }`}
              >
                {m.content}
              </div>
            ))}
            {busy && (
              <div className="flex w-fit items-center gap-2 rounded-2xl rounded-bl-md border border-ink/10 bg-white px-3.5 py-2.5 text-[12px] text-slate/70">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Checking with the desk…
              </div>
            )}
            {messages.length <= 1 && !busy && (
              <div className="flex flex-wrap gap-2 pt-1">
                {QUICK.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => submit(q)}
                    className="rounded-full border border-brand/20 bg-white px-3 py-1.5 text-[11px] text-brand transition-colors hover:bg-brand hover:text-white"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
            className="flex items-center gap-2 border-t border-ink/10 bg-white px-3 py-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question…"
              maxLength={600}
              className="h-10 flex-1 rounded-full border border-ink/10 bg-ivory px-4 text-[12.5px] text-ink outline-none placeholder:text-slate/50 focus:border-brand/40"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand text-white transition-colors hover:bg-brand-deep disabled:opacity-40"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>

          <a
            href="/support"
            className="flex items-center justify-center gap-1.5 border-t border-ink/10 bg-bone py-2.5 text-[10.5px] font-medium uppercase tracking-[0.14em] text-brand"
          >
            Need a tracked ticket?
            <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>
      )}
    </>
  );
}