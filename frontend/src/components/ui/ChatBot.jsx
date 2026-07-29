import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Sparkles, Trash2, Leaf } from "lucide-react";
import { sendChatMessage } from "../../services/aiServices";

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hello! 🌿 I am your **WasteWise AI Assistant**. Ask me anything about waste management, recycling, composting, or how to dispose of specific items!",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef(null);

  const quickPrompts = [
    "Is bubble wrap recyclable?",
    "How to compost food waste?",
    "Where to throw e-waste?",
    "Can I recycle pizza boxes?",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isLoading, isOpen]);

  const handleSend = async (textToSend) => {
    const text = typeof textToSend === "string" ? textToSend : input;
    if (!text.trim() || isLoading) return;

    if (typeof textToSend !== "string") {
      setInput("");
    }

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await sendChatMessage(text);
      const botMessage = {
        id: Date.now() + 1,
        sender: "bot",
        text: response.reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage = {
        id: Date.now() + 1,
        sender: "bot",
        text: "Sorry, I'm having trouble connecting right now. Please try again later.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: Date.now(),
        sender: "bot",
        text: "Chat cleared! 🌿 How can I help you manage your waste today?",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const renderMessageText = (text) => {
    return text.split("\n").map((line, idx) => {
      let processed = line;
      // Simple regex for bold **text**
      const boldRegex = /\*\*(.*?)\*\*/g;
      processed = processed.replace(boldRegex, "<strong>$1</strong>");

      if (processed.trim().startsWith("- ") || processed.trim().startsWith("* ")) {
        return (
          <li
            key={idx}
            className="ml-4 list-disc text-sm"
            dangerouslySetInnerHTML={{ __html: processed.replace(/^[-*]\s+/, "") }}
          />
        );
      }

      return (
        <p
          key={idx}
          className="min-h-[1rem] text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: processed }}
        />
      );
    });
  };

  return (
    <>
      {/* Floating Action Button (FAB) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-green-600 text-white shadow-xl hover:bg-green-700 hover:scale-110 active:scale-95 transition-all duration-200 focus:outline-none"
      >
        {isOpen ? (
          <X size={24} />
        ) : (
          <div className="relative flex items-center justify-center">
            <MessageSquare size={24} />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
            </span>
          </div>
        )}
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-50 flex h-[500px] w-[380px] max-w-[calc(100vw-2rem)] flex-col rounded-3xl border border-gray-200/85 bg-white shadow-2xl backdrop-blur-md transition-colors duration-500 dark:border-slate-800/85 dark:bg-slate-900"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 bg-gradient-to-r from-green-600 to-emerald-600 p-4 text-white dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                  <Leaf size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-wide">WasteWise Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
                    <span className="text-[10px] text-green-100 font-medium">Online</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={clearChat}
                  title="Clear Conversation"
                  className="rounded-lg p-1.5 text-white/80 hover:bg-white/10 hover:text-white transition cursor-pointer"
                >
                  <Trash2 size={16} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg p-1.5 text-white/80 hover:bg-white/10 hover:text-white transition cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 shadow-sm ${
                      msg.sender === "user"
                        ? "bg-green-600 text-white rounded-tr-none"
                        : "bg-gray-100 text-gray-850 dark:bg-slate-800 dark:text-slate-200 rounded-tl-none border border-gray-200/50 dark:border-slate-700/50"
                    }`}
                  >
                    <div className="space-y-1">
                      {renderMessageText(msg.text)}
                    </div>
                  </div>
                  <span className="mt-1 text-[10px] text-gray-400 px-1">
                    {msg.time}
                  </span>
                </div>
              ))}

              {/* Typing/Loading Indicator */}
              {isLoading && (
                <div className="flex flex-col items-start">
                  <div className="flex items-center gap-1.5 rounded-2xl bg-gray-100 dark:bg-slate-800 border border-gray-200/50 dark:border-slate-700/50 px-4 py-3 text-gray-400">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]"></span>
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]"></span>
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions Chips (shown when no user message is sent yet) */}
            {messages.length === 1 && (
              <div className="px-4 pb-2">
                <p className="text-[11px] font-semibold text-gray-400 mb-2 flex items-center gap-1">
                  <Sparkles size={12} className="text-green-500" /> Suggestions
                </p>
                <div className="flex flex-wrap gap-2">
                  {quickPrompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => handleSend(prompt)}
                      className="cursor-pointer rounded-full border border-green-200 bg-green-50/50 px-3 py-1 text-xs text-green-700 hover:bg-green-100 hover:text-green-800 transition dark:border-green-900/50 dark:bg-green-950/20 dark:text-green-400 dark:hover:bg-green-900/30"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="border-t border-gray-100 p-3 flex gap-2 items-center dark:border-slate-855"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about recycling, composting..."
                disabled={isLoading}
                className="flex-1 rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-2 text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:border-green-500 focus:bg-white disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-green-600"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl bg-green-600 text-white shadow-md hover:bg-green-700 transition active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ChatBot;
