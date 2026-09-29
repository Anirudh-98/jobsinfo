"use client";

import React, { useState } from "react";
import {
  Play,
  Users,
  Video,
  Send,
  Calendar,
  Clock,
  Download,
  Share2,
  CheckCircle2,
  Sparkles,
  Volume2,
  Maximize2
} from "lucide-react";
import { MASTERCLASSES_DATA, Masterclass } from "@/data/mockData";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { useApp } from "@/context/AppContext";

interface ChatMessage {
  id: string;
  sender: string;
  college: string;
  text: string;
  time: string;
  isHost?: boolean;
}

export default function MasterclassPage() {
  const { user, showToast } = useApp();
  const [activeSession, setActiveSession] = useState<Masterclass>(MASTERCLASSES_DATA[0]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [chatInput, setChatInput] = useState("");
  const [rsvpdSessions, setRsvpdSessions] = useState<string[]>([]);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-1",
      sender: "Srinivas Rao",
      college: "JobsInfo Moderator",
      text: "Welcome cohort students! Host Vikramaditya Goud will begin the live scorecard breakdown in 2 minutes. Drop your college name below!",
      time: "4:02 PM",
      isHost: true,
    },
    {
      id: "msg-2",
      sender: "Ananya Reddy",
      college: "Osmania University MBA",
      text: "Joining from OU Hyderabad! Excited to see the Darwinbox interview breakdown.",
      time: "4:04 PM",
    },
    {
      id: "msg-3",
      sender: "K. Karthik",
      college: "JNTUH B.Tech CSE",
      text: "Can someone ask about how to answer salary expectations as freshers?",
      time: "4:05 PM",
    },
    {
      id: "msg-4",
      sender: "Vikramaditya Goud",
      college: "Senior Director TA, ServiceNow",
      text: "Yes Karthik, we are dedicating the last 20 minutes specifically to campus negotiation traps. Stay tuned!",
      time: "4:06 PM",
      isHost: true,
    },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: user.name,
      college: user.collegeOrCompany.split(" ")[0] + " Cohort",
      text: chatInput.trim(),
      time: "Just now",
    };

    setMessages((prev) => [...prev, newMsg]);
    setChatInput("");
  };

  const handleRSVP = (sessionId: string) => {
    if (rsvpdSessions.includes(sessionId)) {
      showToast("You are already registered for this masterclass session.");
      return;
    }
    setRsvpdSessions((prev) => [...prev, sessionId]);
    showToast("RSVP Confirmed! Calendar invitation sent to your email.");
  };

  return (
    <div className="w-full min-h-screen bg-canvas pb-20">
      {/* Top Banner */}
      <div className="bg-canvas border-b border-hairline py-8">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-light text-primary text-xs font-semibold mb-2">
              <Sparkles className="h-3.5 w-3.5" /> Quietly Live Masterclasses
            </div>
            <h1 className="text-display-md sm:text-display-lg font-bold text-ink leading-tight">
              Live Career Masterclass &amp; Workshop Stage
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="live" isPulse className="py-1.5 px-3">
              LIVE STREAM ACTIVE
            </Badge>
            <span className="text-xs text-muted font-medium">842 Active Attendees</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Main 16:9 Video Player and Live Chat Dock (Desktop 70/30) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* 16:9 Video Broadcast Frame */}
          <div className="lg:col-span-2 space-y-4">
            <div className="relative aspect-video w-full bg-slate-950 rounded-xl overflow-hidden shadow-elevation-raised border border-slate-800 flex flex-col justify-between p-5 text-white">
              {/* Top Stream Status Bar */}
              <div className="flex items-center justify-between z-10">
                <div className="flex items-center gap-2">
                  <Badge variant="live" isPulse>
                    LIVE
                  </Badge>
                  <span className="text-xs font-medium text-slate-200 bg-slate-900/80 px-2.5 py-1 rounded">
                    1080p HD • Ultra Low Latency
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs bg-slate-900/80 px-2.5 py-1 rounded text-slate-300">
                  <Users className="h-3.5 w-3.5 text-blue-400" />
                  <span>842 Watching</span>
                </div>
              </div>

              {/* Simulated Broadcast Visual Center */}
              <div className="my-auto text-center space-y-3">
                <div className="inline-flex h-16 w-16 rounded-full bg-primary/90 text-white items-center justify-center shadow-lg shadow-primary/40 backdrop-blur-sm cursor-pointer hover:scale-105 transition-transform" onClick={() => setIsPlaying(!isPlaying)}>
                  <Play className={`h-8 w-8 ml-1 ${isPlaying ? "text-white" : "text-slate-200"}`} />
                </div>
                <div>
                  <p className="text-base sm:text-lg font-bold text-white tracking-wide">
                    {activeSession.title}
                  </p>
                  <p className="text-xs text-slate-300 mt-1">
                    Streaming live with {activeSession.host} ({activeSession.hostRole})
                  </p>
                </div>
              </div>

              {/* Bottom Stream Controls Bar */}
              <div className="flex items-center justify-between text-xs text-slate-300 bg-slate-900/80 p-2.5 rounded backdrop-blur-sm z-10">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="hover:text-white cursor-pointer font-bold"
                  >
                    {isPlaying ? "PAUSE" : "PLAY"}
                  </button>
                  <span className="flex items-center gap-1">
                    <Volume2 className="h-4 w-4" /> Live Audio 100%
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span>Telangana Campus Network</span>
                  <Maximize2 className="h-4 w-4 hover:text-white cursor-pointer" />
                </div>
              </div>
            </div>

            {/* Session Details Below Video */}
            <div className="p-6 rounded-xl bg-white border border-hairline shadow-elevation-resting space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-hairline">
                <div>
                  <h2 className="text-xl font-bold text-ink">{activeSession.title}</h2>
                  <p className="text-xs font-semibold text-primary mt-1">
                    Host: {activeSession.host} • <span className="text-muted font-normal">{activeSession.hostRole}</span>
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => showToast("Scorecard PDF guide downloaded.")}
                    className="text-xs gap-1.5"
                  >
                    <Download className="h-3.5 w-3.5" /> Handout PDF
                  </Button>
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => showToast("Share link copied.")}
                    className="text-xs gap-1.5"
                  >
                    <Share2 className="h-3.5 w-3.5" /> Share
                  </Button>
                </div>
              </div>

              <div className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                <p>{activeSession.description}</p>
              </div>

              {/* Agenda */}
              <div>
                <h4 className="text-xs font-bold text-ink uppercase tracking-wider mb-2">
                  Session Agenda:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeSession.agenda.map((ag, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded bg-slate-50 border border-hairline text-xs flex items-start gap-2 text-ink-secondary"
                    >
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>{ag}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Live Chat Sidebar */}
          <div className="h-[520px] lg:h-[620px] rounded-xl bg-white border border-hairline shadow-elevation-resting flex flex-col justify-between overflow-hidden">
            {/* Chat Header */}
            <div className="p-3.5 border-b border-hairline bg-slate-50 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-ink">Live Audience Chat</p>
                <p className="text-[10px] text-muted">Moderated by JobsInfo Placement Cell</p>
              </div>
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            </div>

            {/* Chat Messages List */}
            <div className="flex-1 p-3.5 overflow-y-auto space-y-3 text-xs">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`p-2.5 rounded-md ${
                    m.isHost
                      ? "bg-blue-50/80 border border-blue-200"
                      : "bg-slate-50 border border-hairline"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-ink">{m.sender}</span>
                      {m.isHost && (
                        <span className="px-1.5 py-0.2 rounded bg-primary text-white text-[9px] font-bold">
                          HOST
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-muted">{m.time}</span>
                  </div>
                  <p className="text-[10px] text-muted mb-1">{m.college}</p>
                  <p className="text-xs text-ink-secondary leading-snug">{m.text}</p>
                </div>
              ))}
            </div>

            {/* Chat Input Form */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-hairline bg-white flex items-center gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask a question to the host..."
                className="flex-1 px-3 py-2 text-xs rounded-sm border border-hairline text-ink focus:border-primary focus:outline-none"
              />
              <Button type="submit" size="sm" variant="primary" className="h-8 px-3">
                <Send className="h-3.5 w-3.5" />
              </Button>
            </form>
          </div>
        </div>

        {/* Upcoming Masterclasses Schedule */}
        <div className="pt-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-ink">Upcoming Live Broadcast Schedule</h2>
            <p className="text-xs text-muted">Reserve your virtual seat and get notifications</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {MASTERCLASSES_DATA.slice(1).map((mc) => {
              const isRsvpd = rsvpdSessions.includes(mc.id);

              return (
                <Card key={mc.id} className="p-6 bg-white flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3 text-xs text-muted">
                      <Badge variant="secondary">{mc.category}</Badge>
                      <span className="flex items-center gap-1 font-semibold text-ink">
                        <Calendar className="h-3.5 w-3.5 text-primary" /> {mc.date} • {mc.time}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-ink">{mc.title}</h3>
                    <p className="text-xs text-primary font-medium mt-1">
                      Host: {mc.host} ({mc.hostRole})
                    </p>
                    <p className="text-xs text-muted mt-2 leading-relaxed">{mc.description}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-hairline flex items-center justify-between">
                    <span className="text-xs text-muted flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-primary" /> {mc.duration}
                    </span>

                    <Button
                      size="sm"
                      variant={isRsvpd ? "secondary" : "cta"}
                      onClick={() => handleRSVP(mc.id)}
                      className="text-xs font-semibold"
                    >
                      {isRsvpd ? "RSVP Confirmed ✓" : "RSVP for Free"}
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
