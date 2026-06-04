import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, Minimize2 } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const SYSTEM_PROMPT = `You are Nesta, a friendly and knowledgeable AI assistant for Communest — Kenya's leading housing platform. You help users with:

1. Finding houses to rent across Kenya's 47 counties (Nairobi, Mombasa, Kisumu, Nakuru, etc.)
2. Answering questions about estates listed on Communest (amenities, rent, location, availability)
3. Explaining how to list an estate on Communest
4. Helping tenants understand their estate portal (payments, announcements, maintenance, inquiries)
5. General customer support for Communest

Key estates on the platform include:
- Greenview Gardens (Kilimani, Nairobi) — Swimming Pool, Gym, 24/7 Security, Parking, CCTV. Rent from KES 55,000/month.
- Mombasa Azure Heights (Nyali, Mombasa) — Ocean View, Swimming Pool, Restaurant, Fibre Internet. Premium coastal living.

Be concise, helpful, and warm. Always respond in the language the user writes in (English or Swahili). If you don't know something specific, direct the user to explore the website or contact estate management. Keep responses short and conversational — 2-4 sentences max unless more detail is needed.`;

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "0",
      role: "assistant",
      content:
        "Habari! I'm Nesta, your Communest assistant 🏠 I can help you find a home, learn about estates, or answer any questions about the platform. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: [
            ...messages.map((m) => ({ role: m.role, content: m.content })),
            { role: "user", content: userMessage.content },
          ],
        }),
      });

      const data = await response.json();
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          data.content?.[0]?.text ||
          "Sorry, I couldn't process that. Please try again.",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content:
            "I'm having trouble connecting right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickQuestions = [
    "What estates are available in Nairobi?",
    "How do I rent a house?",
    "How do I list my estate?",
  ];

  return (
    <>
      {/* Chat window */}
      {isOpen && (
        <div
          className="fixed z-50 flex flex-col"
          style={{
            bottom: 90,
            right: 20,
            width: 360,
            height: isMinimized ? 56 : 520,
            background: "#0a1628",
            border: "1px solid #1e3a5f",
            borderRadius: 20,
            boxShadow:
              "0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(29,111,206,0.1)",
            transition: "height 0.3s cubic-bezier(0.4,0,0.2,1)",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, #0d1f3c, #0a1628)",
              borderBottom: "1px solid #1e3a5f",
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #1d6fce, #0ea5e9)",
                }}
              >
                <Bot size={16} style={{ color: "#fff" }} />
              </div>
              <div>
                <p
                  className="text-white text-sm"
                  style={{ fontWeight: 700, lineHeight: 1.2 }}
                >
                  Nesta
                </p>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  <p style={{ color: "#64748b", fontSize: 11 }}>
                    Communest AI Assistant
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 rounded-lg transition-all hover:bg-white/5"
                style={{ color: "#475569" }}
              >
                <Minimize2 size={14} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg transition-all hover:bg-white/5"
                style={{ color: "#475569" }}
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div
                className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "#1e3a5f transparent",
                }}
              >
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.role === "assistant" && (
                      <div
                        className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mr-2 mt-0.5"
                        style={{
                          background:
                            "linear-gradient(135deg, #1d6fce, #0ea5e9)",
                        }}
                      >
                        <Bot size={12} style={{ color: "#fff" }} />
                      </div>
                    )}
                    <div
                      className="max-w-[75%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed"
                      style={{
                        background:
                          msg.role === "user"
                            ? "linear-gradient(135deg, #1d6fce, #0ea5e9)"
                            : "#0d1a2e",
                        color: msg.role === "user" ? "#fff" : "#94a3b8",
                        border:
                          msg.role === "assistant"
                            ? "1px solid #1e3a5f"
                            : "none",
                        borderRadius:
                          msg.role === "user"
                            ? "18px 18px 4px 18px"
                            : "18px 18px 18px 4px",
                        lineHeight: 1.6,
                      }}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}

                {/* Loading indicator */}
                {isLoading && (
                  <div className="flex justify-start">
                    <div
                      className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mr-2 mt-0.5"
                      style={{
                        background: "linear-gradient(135deg, #1d6fce, #0ea5e9)",
                      }}
                    >
                      <Bot size={12} style={{ color: "#fff" }} />
                    </div>
                    <div
                      className="px-4 py-3 rounded-2xl flex items-center gap-1.5"
                      style={{
                        background: "#0d1a2e",
                        border: "1px solid #1e3a5f",
                        borderRadius: "18px 18px 18px 4px",
                      }}
                    >
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full"
                          style={{
                            background: "#3b82f6",
                            animation: "bounce 1.2s infinite",
                            animationDelay: `${i * 0.2}s`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick questions (show only at start) */}
                {messages.length === 1 && (
                  <div className="space-y-2 pt-2">
                    <p
                      style={{
                        color: "#475569",
                        fontSize: 11,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      Quick questions
                    </p>
                    {quickQuestions.map((q) => (
                      <button
                        key={q}
                        onClick={() => {
                          setInput(q);
                          setTimeout(() => inputRef.current?.focus(), 50);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs transition-all hover:border-blue-500/50"
                        style={{
                          background: "#060d17",
                          border: "1px solid #1e3a5f",
                          color: "#64748b",
                        }}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div
                className="px-3 pb-3 flex-shrink-0"
                style={{ borderTop: "1px solid #1e3a5f" }}
              >
                <div
                  className="flex items-center gap-2 px-3 py-2 rounded-xl mt-3"
                  style={{ background: "#060d17", border: "1px solid #1e3a5f" }}
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask Nesta anything…"
                    className="flex-1 text-sm outline-none bg-transparent"
                    style={{ color: "#e2e8f0" }}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!input.trim() || isLoading}
                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all disabled:opacity-40"
                    style={{
                      background: "linear-gradient(135deg, #1d6fce, #0ea5e9)",
                    }}
                  >
                    <Send size={13} style={{ color: "#fff" }} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setIsMinimized(false);
        }}
        className="fixed z-50 flex items-center justify-center transition-all hover:scale-110"
        style={{
          bottom: 20,
          right: 20,
          width: 56,
          height: 56,
          borderRadius: 16,
          background: isOpen
            ? "#0d1a2e"
            : "linear-gradient(135deg, #1d6fce, #0ea5e9)",
          border: isOpen ? "1px solid #1e3a5f" : "none",
          boxShadow: "0 8px 32px rgba(29,111,206,0.4)",
        }}
      >
        {isOpen ? (
          <X size={22} style={{ color: "#64748b" }} />
        ) : (
          <MessageSquare size={22} style={{ color: "#fff" }} />
        )}
      </button>

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-4px); }
        }
      `}</style>
    </>
  );
}
