import React, { useState } from 'react';
import { Send, Sparkles, ShieldCheck, BookOpen, ExternalLink, Bot, User, RefreshCw } from 'lucide-react';
import { Citation, LearningMode, RagResponse } from '../types';
import { AiService } from '../services/aiService';

interface AiChatViewProps {
  learningMode: LearningMode;
  onViewCitation: (citation: Citation) => void;
}

export const AiChatView: React.FC<AiChatViewProps> = ({ learningMode, onViewCitation }) => {
  const [messages, setMessages] = useState<{
    id: string;
    sender: 'user' | 'assistant';
    text: string;
    passages?: Citation[];
  }[]>([
    {
      id: 'm1',
      sender: 'assistant',
      text: `Welcome to the Master's Literature Pedagogy RAG Assistant! I am connected to the authenticated Gillian Lazar (1993) PDF vector database. Ask any theoretical or practical question, and I will retrieve exact passages with page citations.`,
      passages: []
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!inputQuery.trim() || loading) return;
    const queryText = inputQuery.trim();
    setInputQuery('');

    setMessages(prev => [...prev, { id: `u-${Date.now()}`, sender: 'user', text: queryText }]);
    setLoading(true);

    try {
      const res: RagResponse = await AiService.retrieveAndAnswer(queryText, learningMode, 'intro');
      setMessages(prev => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          sender: 'assistant',
          text: res.answer,
          passages: res.retrievedPassages
        }
      ]);
    } catch {
      setMessages(prev => [
        ...prev,
        { id: `e-${Date.now()}`, sender: 'assistant', text: 'Error querying authenticated PDF service endpoint.' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-pink-200 shadow-sm flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center">
              <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-600" /> RAG PDF Service Authenticated
            </span>
            <span className="text-xs font-mono text-slate-500">
              Lazar (1993) Cambridge Edition
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif mt-1">
            Backend AI Q&A Assistant with Verified Page Citations
          </h1>
        </div>

        <span className="text-xs font-bold text-pink-700 bg-pink-50 px-3 py-1.5 rounded-xl border border-pink-200 uppercase">
          Mode: {learningMode}
        </span>
      </div>

      {/* Main Chat Box */}
      <div className="bg-white rounded-3xl border border-pink-200 shadow-sm overflow-hidden flex flex-col h-[580px]">
        {/* Messages Scroll Area */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/40">
          {messages.map(m => (
            <div
              key={m.id}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center space-x-2 mb-1 text-[11px] text-slate-400 font-medium">
                {m.sender === 'user' ? (
                  <><span>You</span><User className="w-3.5 h-3.5" /></>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-pink-600" />
                    <span className="font-bold text-pink-700">RAG AI Engine</span>
                  </>
                )}
              </div>

              <div
                className={`max-w-[85%] p-5 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                  m.sender === 'user'
                    ? 'bg-pink-600 text-white font-medium rounded-tr-none shadow-sm'
                    : 'bg-white text-slate-800 border border-pink-200 rounded-tl-none font-sans shadow-sm'
                }`}
              >
                {m.text}

                {m.passages && m.passages.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-pink-100 space-y-2">
                    <p className="text-[11px] font-bold text-pink-800 flex items-center">
                      <BookOpen className="w-3.5 h-3.5 mr-1" /> Verified Page Citations:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {m.passages.map((p, i) => (
                        <button
                          key={i}
                          onClick={() => onViewCitation(p)}
                          className="bg-pink-50 hover:bg-pink-100 text-pink-900 border border-pink-200 px-3 py-1 rounded-xl text-xs font-bold flex items-center transition-colors"
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
            <div className="flex items-center space-x-2 text-pink-600 bg-white p-4 rounded-2xl border border-pink-200 w-fit">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span className="text-xs font-bold">Querying private PDF vector engine...</span>
            </div>
          )}
        </div>

        {/* Input Form */}
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
              className="flex-1 px-4 py-3 rounded-xl border border-pink-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 bg-pink-50/20"
            />
            <button
              type="submit"
              disabled={loading || !inputQuery.trim()}
              className="px-6 py-3 bg-pink-600 hover:bg-pink-700 disabled:opacity-50 text-white rounded-xl font-extrabold text-xs flex items-center space-x-2 shadow-sm transition-colors"
            >
              <span>Query AI</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
