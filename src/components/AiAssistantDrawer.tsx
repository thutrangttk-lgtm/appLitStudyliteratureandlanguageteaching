import React, { useState } from 'react';
import { Send, Bot, User, Sparkles, BookOpen, ExternalLink, ShieldCheck, RefreshCw } from 'lucide-react';
import { Citation, LearningMode, RagResponse } from '../types';
import { AiService } from '../services/aiService';

interface AiAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  learningMode: LearningMode;
  onViewCitation: (citation: Citation) => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  passages?: Citation[];
  timestamp: string;
}

export const AiAssistantDrawer: React.FC<AiAssistantDrawerProps> = ({
  isOpen,
  onClose,
  learningMode,
  onViewCitation,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: `Hello! I am your AI Literature Pedagogy Assistant, connected to Gillian Lazar (1993) "Literature and Language Teaching". Ask me anything about Chapter 1 or literature teaching approaches!`,
      timestamp: 'Just now'
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async () => {
    if (!inputQuery.trim() || loading) return;

    const userText = inputQuery.trim();
    setInputQuery('');

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      // Trigger RAG endpoint
      const response: RagResponse = await AiService.retrieveAndAnswer(userText, learningMode, 'intro');
      
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: response.answer,
        passages: response.retrievedPassages,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'assistant',
          text: 'Error contacting private PDF retrieval endpoint. Please check authentication.',
          timestamp: 'Now'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 border-l border-pink-200">
        {/* Drawer Header */}
        <div className="bg-gradient-to-r from-pink-700 via-rose-700 to-pink-800 text-white p-4 flex items-center justify-between shadow-md">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-pink-200 border border-white/20">
              <Bot className="w-5 h-5 text-pink-200" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                RAG Literature Assistant
                <span className="text-[10px] bg-emerald-400 text-emerald-950 font-extrabold px-2 py-0.5 rounded-full uppercase">
                  PDF Active
                </span>
              </h3>
              <p className="text-xs text-pink-100 flex items-center">
                <ShieldCheck className="w-3 h-3 mr-1 text-emerald-300" />
                Mode: {learningMode === 'academic' ? 'Academic English' : 'Plain English'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-pink-100 hover:text-white px-2.5 py-1 rounded-lg bg-white/10 text-xs font-bold transition-colors"
          >
            Close
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="bg-pink-50 p-3 border-b border-pink-100 flex items-center space-x-2 overflow-x-auto text-xs">
          <span className="text-pink-700 font-bold shrink-0">Try:</span>
          <button
            onClick={() => setInputQuery('Why use literature in ELT?')}
            className="bg-white hover:bg-pink-100 text-pink-800 px-2.5 py-1 rounded-full border border-pink-200 shrink-0 font-medium transition-colors"
          >
            Why use literature?
          </button>
          <button
            onClick={() => setInputQuery('Explain Language-based approach')}
            className="bg-white hover:bg-pink-100 text-pink-800 px-2.5 py-1 rounded-full border border-pink-200 shrink-0 font-medium transition-colors"
          >
            Language-based approach
          </button>
          <button
            onClick={() => setInputQuery('What is Personal Growth approach?')}
            className="bg-white hover:bg-pink-100 text-pink-800 px-2.5 py-1 rounded-full border border-pink-200 shrink-0 font-medium transition-colors"
          >
            Personal Growth
          </button>
        </div>

        {/* Message History Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center space-x-2 mb-1 text-[11px] text-slate-500 font-medium">
                {msg.sender === 'user' ? (
                  <>
                    <span>You</span>
                    <User className="w-3.5 h-3.5 text-slate-400" />
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                    <span className="font-bold text-pink-700">RAG AI Bot (Lazar 1993)</span>
                  </>
                )}
                <span>• {msg.timestamp}</span>
              </div>

              <div
                className={`max-w-[90%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-pink-600 text-white rounded-tr-none font-medium'
                    : 'bg-white text-slate-800 border border-pink-200 rounded-tl-none font-sans'
                }`}
              >
                {msg.text}

                {/* Verified Citations List */}
                {msg.passages && msg.passages.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-pink-100 space-y-2">
                    <p className="text-[11px] font-bold text-pink-800 flex items-center">
                      <BookOpen className="w-3.5 h-3.5 mr-1 text-pink-600" />
                      Retrieved PDF Textbook Citations:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.passages.map((p, idx) => (
                        <button
                          key={idx}
                          onClick={() => onViewCitation(p)}
                          className="bg-pink-50 hover:bg-pink-100 text-pink-900 border border-pink-200 px-2.5 py-1 rounded-lg text-[11px] font-semibold flex items-center transition-colors"
                        >
                          Page {p.pageNumber}
                          <ExternalLink className="w-3 h-3 ml-1 text-pink-600" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center space-x-2 text-pink-600 bg-white p-3 rounded-2xl border border-pink-200 w-fit">
              <RefreshCw className="w-4 h-4 animate-spin text-pink-600" />
              <span className="text-xs font-bold">
                Retrieving verified PDF passages & generating response...
              </span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-pink-200">
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={e => setInputQuery(e.target.value)}
              placeholder="Ask a question about Gillian Lazar (1993)..."
              className="flex-1 px-4 py-2.5 rounded-xl border border-pink-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-pink-50/30"
            />
            <button
              type="submit"
              disabled={loading || !inputQuery.trim()}
              className="px-4 py-2.5 bg-pink-600 hover:bg-pink-700 disabled:opacity-50 text-white rounded-xl font-bold text-xs flex items-center space-x-1.5 shadow-sm transition-colors"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
