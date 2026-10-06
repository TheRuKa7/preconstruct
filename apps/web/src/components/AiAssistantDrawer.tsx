import React, { useState } from 'react';
import { 
  X, 
  Send, 
  Bot 
} from 'lucide-react';

interface AiAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: any) => void;
}

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  actionCta?: { label: string; tab: string };
}

export const AiAssistantDrawer: React.FC<AiAssistantDrawerProps> = ({
  isOpen,
  onClose,
  onNavigateTab
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: "Hello! I am your Preconstruct Construction Co-Pilot. I've analyzed Manipal Hospital Block 2 (₹84.5 Cr) across 5 tender volumes. I detected 2 critical showstoppers (10% LD ceiling and 36-month DLP) and an 11 kV vs 33 kV switchgear contradiction.",
      timestamp: '19:14',
      actionCta: { label: 'Inspect Contradictions', tab: 'contracts' }
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  if (!isOpen) return null;

  const quickPrompts = [
    { label: "Check 11kV vs 33kV Contradiction", tab: "contracts" },
    { label: "Simulate 60-Day Delay LD Exposure", tab: "contracts" },
    { label: "Auto-Fill Annexure Form B", tab: "submission" },
    { label: "Open 2D Duct Takeoff Canvas", tab: "workspace" }
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev: Message[]) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');

    // Generate response based on query
    setTimeout(() => {
      let replyText = "I have cross-referenced the specifications with the IS 655 / SMACNA standards and your corporate knowledge base.";
      let actionCta: { label: string; tab: string } | undefined;

      if (text.toLowerCase().includes('ld') || text.toLowerCase().includes('liquidated') || text.toLowerCase().includes('delay')) {
        replyText = "Tender GCC Clause 24.3 levies 0.5% per week of delay up to a 10% ceiling (₹8.45 Cr). A 60-day delay results in an estimated ₹3.62 Cr liability deduction. Pre-Bid Query RFI-03 is ready to submit requesting a 5% cap.";
        actionCta = { label: "Open LD Scenario Modeler", tab: "contracts" };
      } else if (text.toLowerCase().includes('contradiction') || text.toLowerCase().includes('voltage') || text.toLowerCase().includes('11kv')) {
        replyText = "Found discrepancy: Volume 3 Tech Specs Section 4.2 specifies 11 kV switchgear, but Volume 4 BOQ Item 14.02 specifies 33 kV VCB. A 33 kV panel costs ~₹1.40 Cr more. I have drafted RFI-ELEC-01 for the pre-bid conference.";
        actionCta = { label: "Review Contradiction Diffs", tab: "contracts" };
      } else if (text.toLowerCase().includes('form') || text.toLowerCase().includes('autofill') || text.toLowerCase().includes('submission')) {
        replyText = "Form A, Form B, and Form E have been 100% auto-filled from your corporate master repository with verified CA UDIN turnover certificates.";
        actionCta = { label: "Inspect Auto-Filled Forms", tab: "submission" };
      } else if (text.toLowerCase().includes('duct') || text.toLowerCase().includes('takeoff')) {
        replyText = "Opening the 2D high-DPI canvas. Scale 1:100 is verified with 900mm door parametric locks. Duct runs have auto-assigned 20G/22G sheet metal gauges based on SMACNA rules.";
        actionCta = { label: "Go to Takeoff Canvas", tab: "workspace" };
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionCta
      };
      setMessages((prev: Message[]) => [...prev, aiMsg]);
    }, 600);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      width: '380px',
      background: 'var(--color-sheet-elevated)',
      borderLeft: '1px solid var(--color-rule)',
      boxShadow: 'var(--shadow-float)',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 1000,
      animation: 'slideIn 0.2s cubic-bezier(0.2, 0.7, 0.2, 1)'
    }}>
      {/* Header */}
      <div style={{
        padding: '14px 16px',
        borderBottom: '1px solid var(--color-rule)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'var(--color-sheet)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '6px',
            background: 'linear-gradient(135deg, #0D9488, #115E59)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF'
          }}>
            <Bot size={16} />
          </div>
          <div>
            <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-ink)', margin: 0 }}>
              Preconstruct AI Assistant
            </h3>
            <span style={{ fontSize: '10.5px', color: '#0D9488', fontWeight: 600 }}>
              Autonomous Construction Agent v2.4
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          style={{
            padding: '4px',
            borderRadius: '4px',
            border: 'none',
            background: 'transparent',
            color: 'var(--color-graphite)',
            cursor: 'pointer'
          }}
        >
          <X size={16} />
        </button>
      </div>

      {/* Quick Prompts Bar */}
      <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--color-rule)', background: 'var(--color-paper)', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
        {quickPrompts.map((p, i) => (
          <button
            key={i}
            onClick={() => handleSend(p.label)}
            style={{
              fontSize: '10.5px',
              padding: '3px 8px',
              borderRadius: '4px',
              background: 'var(--color-sheet-elevated)',
              border: '1px solid var(--color-rule)',
              color: 'var(--color-ink)',
              cursor: 'pointer'
            }}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {messages.map((m: Message) => {
          const isAi = m.sender === 'ai';
          return (
            <div
              key={m.id}
              style={{
                alignSelf: isAi ? 'flex-start' : 'flex-end',
                maxWidth: '85%',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }}
            >
              <div style={{
                padding: '10px 12px',
                borderRadius: '8px',
                background: isAi ? 'var(--color-paper)' : '#0D9488',
                color: isAi ? 'var(--color-ink)' : '#FFFFFF',
                fontSize: '12px',
                lineHeight: 1.5,
                border: isAi ? '1px solid var(--color-rule)' : 'none'
              }}>
                {m.text}

                {m.actionCta && (
                  <button
                    onClick={() => {
                      onNavigateTab(m.actionCta?.tab);
                      onClose();
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      marginTop: '8px',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      background: '#0D9488',
                      color: '#FFFFFF',
                      fontSize: '11px',
                      fontWeight: 600,
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <span>{m.actionCta.label} ➔</span>
                  </button>
                )}
              </div>
              <span style={{ fontSize: '9.5px', color: 'var(--color-graphite)', alignSelf: isAi ? 'flex-start' : 'flex-end' }}>
                {m.timestamp}
              </span>
            </div>
          );
        })}
      </div>

      {/* Input Footer */}
      <div style={{ padding: '12px 14px', borderTop: '1px solid var(--color-rule)', background: 'var(--color-sheet)', display: 'flex', gap: '8px' }}>
        <input
          type="text"
          placeholder="Ask a technical or legal question..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          style={{
            flex: 1,
            padding: '8px 10px',
            borderRadius: '6px',
            border: '1px solid var(--color-rule)',
            background: 'var(--color-paper)',
            fontSize: '12px',
            color: 'var(--color-ink)',
            outline: 'none'
          }}
        />
        <button
          onClick={() => handleSend()}
          style={{
            padding: '8px 12px',
            borderRadius: '6px',
            background: '#0D9488',
            color: '#FFFFFF',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <Send size={14} />
        </button>
      </div>
    </div>
  );
};
