import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Compass, Lightbulb, Minimize2 } from 'lucide-react';

const OPENROUTER_CHAT_URL = 'https://openrouter.ai/api/v1/chat/completions';
const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

if (!API_KEY) {
  console.error('[OpenRouter Chat] Missing VITE_OPENROUTER_API_KEY in .env');
}

const SYSTEM_PROMPT = `You are a professional AI Interior Design Assistant. Only answer questions about interior design, room styling, furniture, color palettes, lighting, flooring, wall treatments, and spatial planning. If a question is out of scope, politely say: "I can only help you with interior design and room styling queries." Provide clear, actionable advice with specific recommendations. Keep answers concise but complete.`;

async function getAIResponse(userMessage) {
  if (!API_KEY) {
    throw new Error('OpenRouter API key is not configured.');
  }

  const response = await fetch(OPENROUTER_CHAT_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'google/gemma-3-27b-it:free',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userMessage }
      ],
      max_tokens: 512,
      temperature: 0.7
    })
  });

  console.log('[OpenRouter Chat] status:', response.status);

  if (!response.ok) {
    const errorText = await response.text();
    console.error('[OpenRouter Chat] response error:', response.status, errorText);
    throw new Error(`OpenRouter request failed: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  console.log('[OpenRouter Chat] response data:', data);
  return data.choices?.[0]?.message?.content?.trim() || 'I did not quite catch that design parameter. Please choose from our interior design guidelines or ask a styling question below:';
}

export default function AIChatbotWidget({ onApplyPalette = () => {}, onRecommendStyle = () => {} }) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 'msg-0',
      sender: 'bot',
      text: 'Hello! I am your AI Virtual Interior Design Assistant. How can I help you style, furnish, or color-coordinate your living space today?',
      suggestions: [
        'What color matches a gray couch?',
        'Which layout is best for small living rooms?',
        'How do I achieve a Scandinavian style?',
        'What lighting should I use with dark floors?'
      ]
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend = null) => {
    const query = (textToSend || inputMessage).trim();
    if (!query) return;

    const userMsg = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const lower = query.toLowerCase();
      const outOfScopeKeywords = ['weather', 'president', 'politics', 'bitcoin', 'crypto', 'football', 'cricket', 'recipe', 'cooking', 'song', 'sing', 'dance', 'movie', 'news'];
      const isOutOfScope = outOfScopeKeywords.some(k => lower.includes(k));

      let botResponse = '';
      let suggestions = [];

      if (isOutOfScope) {
        botResponse = 'I can only help you with interior design and room styling queries.';
        suggestions = [
          'What color matches a gray couch?',
          'Suggest wall paint for modern style',
          'How to optimize floor space?'
        ];
      } else {
        botResponse = await getAIResponse(query);

        if (lower.includes('gray couch') || lower.includes('grey couch') || lower.includes('couch color')) {
          suggestions = ['Apply Warm Alabaster Wall Color', 'View Modern Elegance Style', 'Browse Mustard & Brass Lighting'];
        } else if (lower.includes('small') || lower.includes('layout') || lower.includes('dimension')) {
          suggestions = ['Switch to Minimal Style', 'View Modular Sectional', 'Adjust Room Dimensions'];
        } else if (lower.includes('scandi') || lower.includes('scandinavian') || lower.includes('hygge')) {
          suggestions = ['Apply Scandinavian Preset', 'Browse Wooden Dining Tables'];
        } else if (lower.includes('light') || lower.includes('dark floor')) {
          suggestions = ['View Floor Lamps in Catalog', 'Set Warm White Lighting'];
        } else if (query.length < 3 || /^[0-9\W]+$/.test(query)) {
          suggestions = [
            'What color matches a gray couch?',
            'Suggest furniture for Modern Elegance',
            'Calculate paint & flooring cost'
          ];
        } else {
          suggestions = ['Explore Design Results', 'Open 3D Room Studio', 'Check Cost Estimate'];
        }
      }

      setMessages(prev => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: botResponse,
          suggestions
        }
      ]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: 'Sorry, I encountered an issue connecting to the AI service. Please try again later.',
          suggestions: [
            'What color matches a gray couch?',
            'Suggest wall paint for modern style',
            'How to optimize floor space?'
          ]
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '28px',
            zIndex: 50,
            background: 'var(--primary-gradient)',
            color: '#ffffff',
            padding: '12px 18px',
            borderRadius: 'var(--radius-full)',
            boxShadow: '0 8px 24px rgba(99, 102, 241, 0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontWeight: 700,
            fontSize: '14px'
          }}
          className="pulse-glow"
        >
          <Sparkles size={18} />
          <span className="chat-toggle-text">AI Interior Assistant</span>
        </button>
      )}

      {/* Chat Drawer / Window */}
      {isOpen && (
        <div className="chat-drawer" style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: 'min(380px, calc(100vw - 40px))',
          maxHeight: 'min(560px, 80vh)',
          height: 'min(560px, 80vh)',
          zIndex: 50,
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-xl)',
          border: '1px solid var(--border)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          {/* Chat Header */}
          <div style={{
            background: 'var(--primary-gradient)',
            color: '#ffffff',
            padding: '14px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Sparkles size={16} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '14px' }}>AI Interior Designer</div>
                <div style={{ fontSize: '11px', opacity: 0.85 }}>Online | Room Styler NLU</div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'transparent',
                color: '#ffffff',
                padding: '4px',
                borderRadius: '6px'
              }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Body */}
          <div style={{
            flex: 1,
            padding: '16px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            background: 'var(--bg-main)'
          }}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%'
                }}
              >
                <div style={{
                  padding: '10px 14px',
                  borderRadius: msg.sender === 'user' ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                  background: msg.sender === 'user' ? 'var(--primary)' : 'var(--bg-card)',
                  color: msg.sender === 'user' ? '#ffffff' : 'var(--text-main)',
                  fontSize: '13px',
                  lineHeight: '1.45',
                  boxShadow: 'var(--shadow-sm)',
                  border: msg.sender === 'user' ? 'none' : '1px solid var(--border)',
                  whiteSpace: 'pre-line'
                }}>
                  {msg.text}
                </div>

                {/* Suggestion buttons if provided */}
                {msg.suggestions && msg.suggestions.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }}>
                    {msg.suggestions.map((sug, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(sug)}
                        style={{
                          fontSize: '11px',
                          padding: '4px 10px',
                          borderRadius: 'var(--radius-full)',
                          background: 'var(--bg-card)',
                          color: 'var(--primary)',
                          border: '1px solid var(--border)',
                          fontWeight: 500
                        }}
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div style={{ alignSelf: 'flex-start', fontSize: '12px', color: 'var(--text-muted)' }}>
                AI is thinking...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <div style={{
            padding: '12px 16px',
            background: 'var(--bg-card)',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <input
              type="text"
              placeholder="Ask styling or color advice..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
              disabled={isLoading}
              style={{
                flex: 1,
                padding: '8px 12px',
                fontSize: '13px',
                borderRadius: 'var(--radius-full)',
                opacity: isLoading ? 0.6 : 1
              }}
            />
            <button
              onClick={() => !isLoading && handleSendMessage()}
              disabled={isLoading}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'var(--primary)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                opacity: isLoading ? 0.6 : 1
              }}
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
