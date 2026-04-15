"use client";

import { useEffect, useState, useMemo } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  LogOut, Mail, Phone, Calendar, Clock, MessageSquare, Trash2, 
  CheckCircle, Loader2, Search, RefreshCw, User, Users, Activity,
  ChevronLeft
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface Inquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  service: string;
  slot1: { date: string; time: string };
  slot2: { date: string; time: string };
  status: string;
  createdAt: string;
}

interface UserData {
  _id: string;
  name: string;
  email: string;
  lastLogin: string;
  loginHistory: string[];
  createdAt: string;
}

export default function AdminDashboard() {
  const { status } = useSession();
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState<"inquiries" | "users">("inquiries");

  // Inquiries State
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Users State
  const [users, setUsers] = useState<UserData[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    } else if (status === "authenticated") {
      fetchInquiries();
      fetchUsers();
    }
  }, [status, router]);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/inquiries");
      if (res.ok) {
        const data = await res.json();
        setInquiries(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const res = await fetch("/api/admin/users");
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingUsers(false);
    }
  };

  const deleteInquiry = async (id: string) => {
    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setInquiries(inquiries.filter((inq) => inq._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setInquiries(
          inquiries.map((inq) =>
            inq._id === id ? { ...inq, status: newStatus } : inq
          )
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Derived State
  const filteredInquiries = inquiries.filter((inq) => {
    const matchesFilter = filter === "all" || inq.status === filter;
    const matchesSearch = 
      inq.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      inq.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.message.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const graphData = useMemo(() => {
    if (!users.length) return [];
    
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    
    const dailyCounts: Record<string, number> = {};
    
    // Init all days of current month up to today
    for (let d = new Date(startOfMonth); d <= now; d.setDate(d.getDate() + 1)) {
      const displayStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      dailyCounts[displayStr] = 0;
    }

    // New signups count as logins if loginHistory is empty (for retro-compatibility)
    users.forEach(user => {
      const history = user.loginHistory?.length > 0 
        ? user.loginHistory 
        : (user.lastLogin || user.createdAt ? [user.lastLogin || user.createdAt] : []);
        
      if (!history || history.length === 0) return;

      const loginsThisMonth = history
        .map((ds: string) => new Date(ds))
        .filter((d: Date) => d >= startOfMonth && d <= now);
      
      const uniqueDays = new Set(loginsThisMonth.map((d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })));
      
      uniqueDays.forEach(day => {
        if (dailyCounts[day] !== undefined) {
          dailyCounts[day] += 1;
        }
      });
    });

    return Object.entries(dailyCounts).map(([date, count]) => ({ date, Users: count }));
  }, [users]);

  if (status === "loading" || (status === "authenticated" && loading && loadingUsers)) {
    return (
      <div className="min-h-screen bg-[#07030a] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-[#8b5cf6] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07030a] text-white p-6 md:p-10">
      <header className="max-w-7xl mx-auto mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <Link 
              href="/" 
              className="p-2.5 rounded-xl bg-[#1a1525] border border-[rgba(124,58,237,0.12)] text-[#bdb7c8] hover:text-white hover:bg-[rgba(124,58,237,0.1)] transition-all flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
                Admin Dashboard
                <span className="text-xs font-semibold px-3 py-1 bg-[rgba(124,58,237,0.1)] border border-[rgba(124,58,237,0.2)] text-[#8b5cf6] rounded-full uppercase tracking-widest">
                  {activeTab}
                </span>
              </h1>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => {
                fetchInquiries();
                fetchUsers();
              }}
              className="p-2.5 rounded-xl bg-[#1a1525] border border-[rgba(124,58,237,0.12)] text-[#bdb7c8] hover:text-white hover:bg-[rgba(124,58,237,0.1)] transition-all"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all font-medium text-sm"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 border-b border-white/5 pb-1">
          <button
            onClick={() => setActiveTab("inquiries")}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-bold uppercase tracking-wider rounded-t-xl transition-all ${
              activeTab === "inquiries"
                ? "bg-[rgba(124,58,237,0.1)] text-[#8b5cf6] border-b-2 border-[#8b5cf6]"
                : "text-[#bdb7c8] hover:text-white hover:bg-white/5 border-b-2 border-transparent"
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            Inquiries
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-bold uppercase tracking-wider rounded-t-xl transition-all ${
              activeTab === "users"
                ? "bg-[rgba(124,58,237,0.1)] text-[#8b5cf6] border-b-2 border-[#8b5cf6]"
                : "text-[#bdb7c8] hover:text-white hover:bg-white/5 border-b-2 border-transparent"
            }`}
          >
            <Users className="w-4 h-4" />
            Users
          </button>
        </div>
      </header>

      {/* Tab Contents */}
      <main className="max-w-7xl mx-auto">
        {activeTab === "inquiries" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            {/* Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#bdb7c8]/40" />
                <input
                  type="text"
                  placeholder="Search by name, email, or content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#0f0b12] border border-[rgba(124,58,237,0.12)] rounded-2xl py-3 pl-11 pr-4 text-white placeholder:text-[#bdb7c8]/20 focus:outline-none focus:border-[#7c3aed] transition-all text-sm"
                />
              </div>
              <div className="flex gap-2">
                {["all", "unread", "read", "resolved"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setFilter(s)}
                    className={`flex-1 px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest border transition-all ${
                      filter === s
                        ? "bg-linear-to-r from-[#8b5cf6] to-[#5b21b6] text-white border-transparent shadow-[0_0_15px_rgba(124,58,237,0.2)]"
                        : "bg-[#0f0b12] border-[rgba(124,58,237,0.12)] text-[#bdb7c8] hover:border-[rgba(124,58,237,0.3)]"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* List */}
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {filteredInquiries.length > 0 ? (
                  filteredInquiries.map((inq) => (
                    <motion.div
                      key={inq._id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className={`relative group bg-[#0f0b12] border rounded-[22px] p-6 transition-all duration-300 ${
                        inq.status === 'unread' 
                          ? 'border-[#7c3aed]/40 bg-[#0f0b12]' 
                          : 'border-[rgba(124,58,237,0.12)] hover:border-[rgba(124,58,237,0.2)]'
                      }`}
                    >
                      {inq.status === 'unread' && (
                        <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-[#8b5cf6] animate-pulse shadow-[0_0_10px_rgba(124,58,237,0.8)]" />
                      )}

                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* Basic Info */}
                        <div className="lg:col-span-3">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-[rgba(124,58,237,0.1)] flex items-center justify-center border border-[rgba(124,58,237,0.2)]">
                              <User className="w-5 h-5 text-[#8b5cf6]" />
                            </div>
                            <div>
                              <h3 className="font-bold text-white text-lg">{inq.name}</h3>
                              <p className="text-xs text-[#bdb7c8]/60">{new Date(inq.createdAt).toLocaleDateString()} at {new Date(inq.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <a href={`mailto:${inq.email}`} className="flex items-center gap-2 text-sm text-[#bdb7c8] hover:text-[#8b5cf6] transition-colors">
                              <Mail className="w-4 h-4" />
                              {inq.email}
                            </a>
                            {inq.phone && (
                              <a href={`tel:${inq.phone}`} className="flex items-center gap-2 text-sm text-[#bdb7c8] hover:text-[#8b5cf6] transition-colors">
                                <Phone className="w-4 h-4" />
                                {inq.phone}
                              </a>
                            )}
                          </div>
                        </div>

                        {/* Message & Service */}
                        <div className="lg:col-span-4 border-l border-[rgba(124,58,237,0.1)] pl-0 lg:pl-6">
                          <div className="mb-3">
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8b5cf6]/60">Service Requested</span>
                            <p className="text-sm font-semibold text-white mt-1 uppercase tracking-wide">{inq.service || 'Not specified'}</p>
                          </div>
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8b5cf6]/60">Message</span>
                            <p className="text-sm text-[#bdb7c8] mt-2 leading-relaxed bg-[#1a1525]/50 p-3 rounded-xl border border-[rgba(124,58,237,0.05)]">
                              {inq.message}
                            </p>
                          </div>
                        </div>

                        {/* Slots */}
                        <div className="lg:col-span-3 border-l border-[rgba(124,58,237,0.1)] pl-0 lg:pl-6">
                          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8b5cf6]/60 mb-3 block">Preferred Slots</span>
                          <div className="space-y-3">
                            {inq.slot1 && (
                              <div className="bg-[rgba(124,58,237,0.06)] border border-[rgba(124,58,237,0.1)] p-2.5 rounded-xl">
                                <div className="flex items-center gap-2 text-xs font-bold text-white mb-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6]" /> Slot 1
                                </div>
                                <div className="flex items-center gap-4 text-[10px] text-[#bdb7c8]">
                                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(inq.slot1.date).toLocaleDateString()}</span>
                                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {inq.slot1.time}</span>
                                </div>
                              </div>
                            )}
                            {inq.slot2 && (
                              <div className="bg-[rgba(124,58,237,0.06)] border border-[rgba(124,58,237,0.1)] p-2.5 rounded-xl">
                                <div className="flex items-center gap-2 text-xs font-bold text-white mb-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#5b21b6]" /> Slot 2
                                </div>
                                <div className="flex items-center gap-4 text-[10px] text-[#bdb7c8]">
                                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(inq.slot2.date).toLocaleDateString()}</span>
                                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {inq.slot2.time}</span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="lg:col-span-2 flex lg:flex-col items-center justify-center gap-2">
                          {inq.status !== 'resolved' && (
                            <button 
                              onClick={() => updateStatus(inq._id, 'resolved')}
                              className="flex-1 w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20 transition-all text-xs font-bold uppercase tracking-widest"
                            >
                              <CheckCircle className="w-4 h-4" /> Resolve
                            </button>
                          )}
                          {inq.status === 'unread' && (
                            <button 
                              onClick={() => updateStatus(inq._id, 'read')}
                              className="flex-1 w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 transition-all text-xs font-bold uppercase tracking-widest"
                            >
                              Mark Read
                            </button>
                          )}
                          <button 
                            onClick={() => deleteInquiry(inq._id)}
                            className="flex-1 w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-all text-xs font-bold uppercase tracking-widest"
                          >
                            <Trash2 className="w-4 h-4" /> Delete
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="py-20 text-center bg-[#0f0b12] border border-dashed border-[rgba(124,58,237,0.12)] rounded-[32px]">
                    <MessageSquare className="w-12 h-12 text-[#bdb7c8]/20 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">No inquiries found</h3>
                    <p className="text-[#bdb7c8]/60">Everything is up to date!</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* USERS TAB */}
        {activeTab === "users" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            
            {/* Graph Metrics Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3 bg-[#0f0b12] border border-[rgba(124,58,237,0.12)] rounded-3xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-white">Active Users Activity</h3>
                    <p className="text-sm text-[#bdb7c8]/60 mt-1">Number of unique active users logging in each day this month.</p>
                  </div>
                </div>
                
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={graphData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis 
                        dataKey="date" 
                        tick={{ fill: '#bdb7c8', fontSize: 12 }} 
                        axisLine={false} 
                        tickLine={false} 
                        minTickGap={30}
                      />
                      <YAxis 
                        tick={{ fill: '#bdb7c8', fontSize: 12 }} 
                        axisLine={false} 
                        tickLine={false} 
                        allowDecimals={false}
                      />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1a1525', border: '1px solid rgba(124,58,237,0.2)', borderRadius: '12px', color: '#fff' }}
                        itemStyle={{ color: '#8b5cf6' }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="Users" 
                        stroke="#8b5cf6" 
                        strokeWidth={3}
                        fillOpacity={1} 
                        fill="url(#colorUsers)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Data Summary Boxes */}
              <div className="flex flex-col gap-4">
                <div className="bg-[#0f0b12] border border-[rgba(124,58,237,0.12)] rounded-3xl p-6 flex-1 flex flex-col justify-center relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#8b5cf6]/10 rounded-full blur-2xl" />
                  <Users className="w-8 h-8 text-[#8b5cf6] mb-4" />
                  <h4 className="text-sm text-[#bdb7c8] font-medium">Total Registered</h4>
                  <p className="text-4xl font-black text-white mt-1">{users.length}</p>
                </div>
                <div className="bg-[#0f0b12] border border-[rgba(124,58,237,0.12)] rounded-3xl p-6 flex-1 flex flex-col justify-center relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-green-500/10 rounded-full blur-2xl" />
                  <Activity className="w-8 h-8 text-green-400 mb-4" />
                  <h4 className="text-sm text-[#bdb7c8] font-medium">Active Today</h4>
                  <p className="text-4xl font-black text-white mt-1">
                    {graphData.length > 0 ? graphData[graphData.length - 1]?.Users || 0 : 0}
                  </p>
                </div>
              </div>
            </div>

            {/* Users Table */}
            <div className="bg-[#0f0b12] border border-[rgba(124,58,237,0.12)] rounded-3xl overflow-hidden">
              <div className="p-6 border-b border-[rgba(124,58,237,0.12)] bg-[rgba(124,58,237,0.02)] flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">Registered Users Directory</h3>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/5 text-xs font-bold text-[#bdb7c8] uppercase tracking-wider bg-white/5">
                      <th className="px-6 py-4">User Details</th>
                      <th className="px-6 py-4">User ID</th>
                      <th className="px-6 py-4 text-right">Time of Last Login</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loadingUsers ? (
                      <tr>
                        <td colSpan={3} className="px-6 py-10 text-center">
                          <Loader2 className="w-6 h-6 text-[#8b5cf6] animate-spin mx-auto" />
                        </td>
                      </tr>
                    ) : users.length > 0 ? (
                      users.map((user) => (
                        <tr key={user._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold">
                                {user.name?.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <p className="font-bold text-white">{user.name}</p>
                                <p className="text-xs text-[#bdb7c8]">{user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-mono text-xs text-[#bdb7c8]/80 bg-[#1a1525] px-2 py-1 rounded-md border border-white/5">
                              {user._id}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex flex-col items-end">
                              {user.lastLogin ? (
                                <>
                                  <span className="text-sm font-bold text-white tracking-wide">
                                    {new Date(user.lastLogin).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </span>
                                  <span className="text-[10px] uppercase font-bold text-[#bdb7c8]/60 mt-0.5 tracking-wider">
                                    {new Date(user.lastLogin).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                                  </span>
                                </>
                              ) : (
                                <span className="text-sm text-[#bdb7c8]/50 italic">Never logged in</span>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3} className="px-6 py-10 text-center text-[#bdb7c8]/60">
                          No users found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            
          </motion.div>
        )}
      </main>
    </div>
  );
}
