import React, { useState, useMemo } from "react";
import { 
  Calendar, 
  Clock, 
  Users, 
  Search, 
  PlusCircle, 
  LogOut, 
  User, 
  Sun, 
  Moon, 
  CheckCircle2, 
  XCircle, 
  Laptop, 
  FlaskConical, 
  BookOpen, 
  Mic, 
  Tv, 
  Bot,
  CalendarDays,
  Filter,
  Info,
  Trash2
} from "lucide-react";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./components/ui/dialog";
import { Badge } from "./components/ui/badge";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";

interface Room {
  id: number;
  name: string;
  category: string;
  description: string;
  image: string;
  capacity: number;
  available: boolean;
  resources: string[];
}

interface Booking {
  id: string;
  roomId: number;
  roomName: string;
  teacherName: string;
  subject: string;
  date: string;
  timeSlot: string;
  notes?: string;
}

const INITIAL_ROOMS: Room[] = [
  {
    id: 1,
    name: "Laboratório de Informática 01",
    category: "Informática",
    description: "32 computadores de alta performance, projetor e ar-condicionado.",
    image: "https://images.unsplash.com/photo-1643199121319-b3b5695e4acb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2hvb2wlMjBjbGFzc3Jvb20lMjBjb21wdXRlcnN8ZW58MXx8fHwxNzgxMDUwMTk4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    capacity: 32,
    available: true,
    resources: ["32 PCs", "Projetor HD", "Ar-condicionado", "Internet 1Gbps"]
  },
  {
    id: 2,
    name: "Laboratório de Ciências & Biologia",
    category: "Ciências",
    description: "Equipamento completo para experimentos, microscópios e bancadas de química.",
    image: "https://images.unsplash.com/photo-1758685734030-a31d96462eec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwbGFib3JhdG9yeSUyMHNjaG9vbHxlbnwxfHx8fDE3ODA5OTcyMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    capacity: 25,
    available: true,
    resources: ["Microscópios", "Bancadas", "Capela de Exaustão", "Kits de Química"]
  },
  {
    id: 3,
    name: "Biblioteca Central & Sala de Leitura",
    category: "Estudo",
    description: "Espaço silencioso com acervo diversificado, mesas para trabalho em grupo e Wi-Fi.",
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWJyYXJ5JTIwYm9va3MlMjBzaGVsdmVzfGVufDF8fHx8MTc4MTAxNTY4N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    capacity: 45,
    available: false,
    resources: ["Mesas de Grupo", "Wi-Fi dedicado", "Acervo 5k livros", "Pufes de Leitura"]
  },
  {
    id: 4,
    name: "Auditório Principal",
    category: "Eventos",
    description: "Palco com sistema de som profissional, iluminação cênica e projetor 4K.",
    image: "https://images.unsplash.com/photo-1643199032520-99230e970fb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2hvb2wlMjBhdWRpdG9yaXVtfGVufDF8fHx8MTc4MTA1MDE5NXww&ixlib=rb-4.1.0&q=80&w=1080",
    capacity: 150,
    available: true,
    resources: ["Som Surround", "Projetor 4K", "Camarim", "150 Poltronas"]
  },
  {
    id: 5,
    name: "Sala Multimídia & Vídeo",
    category: "Multimídia",
    description: "Equipada com Smart TV 85'', isolamento acústico e poltronas reclináveis.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    capacity: 35,
    available: true,
    resources: ["Smart TV 85''", "Home Theater", "Isolamento Acústico", "Ar-condicionado"]
  },
  {
    id: 6,
    name: "Espaço Maker & Robótica",
    category: "Tecnologia",
    description: "Impressoras 3D, kits Arduino, ferramentas de prototipagem e mesas de trabalho.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    capacity: 20,
    available: true,
    resources: ["Impressora 3D", "Kits Robótica", "Ferramentas", "Notebooks"]
  }
];

const INITIAL_BOOKINGS: Booking[] = [
  {
    id: "B-101",
    roomId: 3,
    roomName: "Biblioteca Central & Sala de Leitura",
    teacherName: "Profª. Maria Fernandes",
    subject: "Feira do Livro - Preparação",
    date: new Date().toISOString().split("T")[0],
    timeSlot: "09:30 - 11:10",
    notes: "Alunos do 9º ano selecionando obras para o projeto."
  },
  {
    id: "B-102",
    roomId: 1,
    roomName: "Laboratório de Informática 01",
    teacherName: "Prof. Carlos Eduardo",
    subject: "Aula Prática de Programação",
    date: new Date().toISOString().split("T")[0],
    timeSlot: "13:10 - 14:50",
    notes: "Instalação do ambiente VS Code prévia."
  }
];

const TIME_SLOTS = [
  "07:30 - 09:10",
  "09:30 - 11:10",
  "11:20 - 12:50",
  "13:10 - 14:50",
  "15:10 - 16:50",
  "19:00 - 20:40"
];

export default function App() {
  // State
  const [rooms] = useState<Room[]>(INITIAL_ROOMS);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<"all" | "available" | "busy" | "large">("all");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // User Auth State
  const [currentUser, setCurrentUser] = useState<{ name: string; role: string } | null>({
    name: "Prof. Roberto Silva",
    role: "Professor"
  });

  // Modal States
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isBookingsListOpen, setIsBookingsListOpen] = useState(false);
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState<Room | null>(null);

  // Booking Form Fields
  const [formRoomId, setFormRoomId] = useState<number>(1);
  const [formTeacher, setFormTeacher] = useState(currentUser?.name || "");
  const [formSubject, setFormSubject] = useState("");
  const [formDate, setFormDate] = useState(new Date().toISOString().split("T")[0]);
  const [formTimeSlot, setFormTimeSlot] = useState(TIME_SLOTS[0]);
  const [formNotes, setFormNotes] = useState("");

  // Login Form Fields
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Toggle Theme
  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return next;
    });
  };

  // Open booking modal pre-selecting a room
  const handleOpenBookingModal = (room?: Room) => {
    const targetRoom = room || rooms.find((r) => r.available) || rooms[0];
    setSelectedRoomForBooking(targetRoom);
    setFormRoomId(targetRoom.id);
    setFormTeacher(currentUser ? currentUser.name : "Prof. Roberto Silva");
    setFormSubject("");
    setFormNotes("");
    setIsBookingOpen(true);
  };

  // Submit Booking Form
  const handleCreateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formSubject.trim()) {
      toast.error("Por favor, informe a disciplina ou motivo do agendamento.");
      return;
    }
    if (!formTeacher.trim()) {
      toast.error("Por favor, informe o nome do professor responsável.");
      return;
    }

    const room = rooms.find((r) => r.id === formRoomId);
    if (!room) return;

    const newBooking: Booking = {
      id: `B-${Math.floor(100 + Math.random() * 900)}`,
      roomId: room.id,
      roomName: room.name,
      teacherName: formTeacher,
      subject: formSubject,
      date: formDate,
      timeSlot: formTimeSlot,
      notes: formNotes
    };

    setBookings((prev) => [newBooking, ...prev]);
    setIsBookingOpen(false);

    toast.success(`Agendamento realizado com sucesso!`, {
      description: `${room.name} agendada para ${formDate} às ${formTimeSlot}.`
    });
  };

  // Cancel Booking
  const handleCancelBooking = (bookingId: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== bookingId));
    toast.info("Agendamento cancelado.", {
      description: `O agendamento ${bookingId} foi removido.`
    });
  };

  // Submit Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail) {
      toast.error("Por favor, preencha o e-mail.");
      return;
    }
    const nameFromEmail = loginEmail.split("@")[0];
    const formattedName = "Prof. " + nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);
    
    setCurrentUser({
      name: formattedName,
      role: "Professor"
    });
    setIsLoginOpen(false);
    toast.success(`Bem-vindo(a), ${formattedName}!`);
  };

  // Logout
  const handleLogout = () => {
    setCurrentUser(null);
    toast.info("Você encerrou a sessão.");
  };

  // Filtered Rooms
  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      const matchesSearch =
        room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.category.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (selectedFilter === "available") return room.available;
      if (selectedFilter === "busy") return !room.available;
      if (selectedFilter === "large") return room.capacity >= 30;

      return true;
    });
  }, [rooms, searchQuery, selectedFilter]);

  // Statistics
  const totalAvailable = rooms.filter((r) => r.available).length;
  const todayBookingsCount = bookings.length;

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Toast Notifications */}
      <Toaster position="top-right" richColors />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-md border-b border-border shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
              <CalendarDays className="h-6 w-6" />
            </div>
            <div>
              <h1 className="font-bold text-xl tracking-tight text-foreground flex items-center gap-2">
                SalaFácil
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                  v2.0
                </span>
              </h1>
              <p className="text-xs text-muted-foreground">Gestão Inteligente de Espaços Escolares</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full text-muted-foreground hover:text-foreground"
              title={isDarkMode ? "Modo Claro" : "Modo Escuro"}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsBookingsListOpen(true)}
              className="hidden sm:flex items-center gap-2"
            >
              <Clock className="h-4 w-4 text-primary" />
              <span>Ver Agendamentos ({todayBookingsCount})</span>
            </Button>

            {currentUser ? (
              <div className="flex items-center gap-2">
                <div className="hidden md:flex flex-col text-right">
                  <span className="text-xs font-semibold text-foreground">{currentUser.name}</span>
                  <span className="text-[10px] text-muted-foreground">{currentUser.role}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-destructive hover:bg-destructive/10"
                  title="Sair da conta"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button
                variant="default"
                size="sm"
                onClick={() => setIsLoginOpen(true)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
              >
                <User className="mr-1.5 h-4 w-4" />
                Entrar
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 md:py-16 bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-500/20 via-transparent to-transparent opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-4 bg-amber-500/20 text-amber-300 border-amber-500/40 text-xs tracking-wider uppercase px-3 py-1">
            Plataforma Escolar Integrada
          </Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
            Agende Salas e Laboratórios <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-indigo-200 to-amber-200">
              em Poucos Cliques
            </span>
          </h2>
          <p className="text-base md:text-lg text-purple-200/90 max-w-2xl mx-auto mb-8 font-normal">
            Reserve o laboratório de informática, ciências, biblioteca ou auditório para suas aulas práticas com facilidade e organização.
          </p>

          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Button
              size="lg"
              onClick={() => handleOpenBookingModal()}
              className="bg-purple-600 hover:bg-purple-500 text-white font-semibold px-6 shadow-lg shadow-purple-900/40 transition-all hover:scale-105"
            >
              <PlusCircle className="mr-2 h-5 w-5" />
              Novo Agendamento
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setIsBookingsListOpen(true)}
              className="border-purple-400/40 text-purple-100 hover:bg-purple-500/20 hover:text-white px-6 backdrop-blur-xs"
            >
              <Calendar className="mr-2 h-5 w-5 text-amber-400" />
              Consultar Horários
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Counter Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="bg-card border-border shadow-md hover:shadow-lg transition-all border-l-4 border-l-purple-600">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Salas Disponíveis</p>
                <p className="text-2xl font-bold text-foreground mt-0.5">{totalAvailable} / {rooms.length}</p>
                <p className="text-[11px] text-emerald-600 font-medium mt-0.5 flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> Prontas para agendamento
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-500/10 text-purple-600 flex items-center justify-center">
                <Calendar className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border shadow-md hover:shadow-lg transition-all border-l-4 border-l-teal-600">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Agendamentos</p>
                <p className="text-2xl font-bold text-foreground mt-0.5">{todayBookingsCount}</p>
                <p className="text-[11px] text-teal-600 font-medium mt-0.5 flex items-center gap-1">
                  <Clock className="h-3 w-3" /> Reservas ativas registradas
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-teal-500/10 text-teal-600 flex items-center justify-center">
                <Clock className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border shadow-md hover:shadow-lg transition-all border-l-4 border-l-amber-500">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Capacidade Total</p>
                <p className="text-2xl font-bold text-foreground mt-0.5">326 Lugares</p>
                <p className="text-[11px] text-amber-600 font-medium mt-0.5 flex items-center gap-1">
                  <Users className="h-3 w-3" /> Distribuídos em 6 espaços
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center">
                <Users className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Main Content & Search Filters */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Search & Filter Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h3 className="text-2xl font-bold text-foreground tracking-tight">Espaços Escolares</h3>
            <p className="text-sm text-muted-foreground">Selecione uma sala para verificar equipamentos e agendar horário</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 items-center">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar por nome ou recurso..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground transition-all"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center p-1 bg-muted rounded-lg border border-border w-full sm:w-auto overflow-x-auto">
              <button
                onClick={() => setSelectedFilter("all")}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                  selectedFilter === "all" ? "bg-card text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Todas
              </button>
              <button
                onClick={() => setSelectedFilter("available")}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                  selectedFilter === "available" ? "bg-card text-emerald-600 font-semibold shadow-xs" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Disponíveis
              </button>
              <button
                onClick={() => setSelectedFilter("busy")}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                  selectedFilter === "busy" ? "bg-card text-destructive font-semibold shadow-xs" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Ocupadas
              </button>
              <button
                onClick={() => setSelectedFilter("large")}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                  selectedFilter === "large" ? "bg-card text-primary font-semibold shadow-xs" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                30+ Pessoas
              </button>
            </div>
          </div>
        </div>

        {/* Room Grid */}
        {filteredRooms.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-2xl border border-dashed border-border p-8">
            <Info className="mx-auto h-12 w-12 text-muted-foreground/60 mb-3" />
            <h4 className="text-lg font-semibold text-foreground">Nenhuma sala encontrada</h4>
            <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
              Nenhum espaço corresponde aos critérios da sua busca. Tente buscar por outros termos ou limpar os filtros.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery("");
                setSelectedFilter("all");
              }}
              className="mt-4"
            >
              Limpar Filtros
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRooms.map((room) => (
              <Card
                key={room.id}
                className="group overflow-hidden bg-card border-border hover:border-primary/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden bg-purple-950/10">
                    <ImageWithFallback
                      src={room.image}
                      alt={room.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <div className="absolute top-3 left-3">
                      <Badge className="bg-slate-900/80 backdrop-blur-md text-white border-none text-[11px]">
                        {room.category}
                      </Badge>
                    </div>

                    <div className="absolute top-3 right-3">
                      {room.available ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/90 text-white backdrop-blur-xs shadow-xs">
                          <CheckCircle2 className="h-3.5 w-3.5" /> Disponível
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-600/90 text-white backdrop-blur-xs shadow-xs">
                          <XCircle className="h-3.5 w-3.5" /> Ocupada
                        </span>
                      )}
                    </div>
                  </div>

                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                        {room.name}
                      </CardTitle>
                    </div>
                    <CardDescription className="line-clamp-2 text-xs leading-relaxed">
                      {room.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="flex items-center text-xs text-muted-foreground font-medium mb-3">
                      <Users className="h-4 w-4 mr-1.5 text-amber-500 shrink-0" />
                      <span>Capacidade: <strong className="text-foreground">{room.capacity} pessoas</strong></span>
                    </div>

                    {/* Resources badges */}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {room.resources.map((res, i) => (
                        <span
                          key={i}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-muted text-muted-foreground font-medium"
                        >
                          {res}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </div>

                <div className="p-6 pt-0 mt-4">
                  <Button
                    onClick={() => handleOpenBookingModal(room)}
                    disabled={!room.available}
                    className={`w-full font-medium transition-all ${
                      room.available
                        ? "bg-purple-600 hover:bg-purple-500 text-white shadow-xs"
                        : "bg-muted text-muted-foreground cursor-not-allowed border-none"
                    }`}
                  >
                    {room.available ? "Solicitar Agendamento" : "Indisponível no Momento"}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* MODAL 1: FORMULÁRIO DE AGENDAMENTO */}
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="sm:max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2 text-foreground">
              <Calendar className="h-5 w-5 text-primary" />
              Agendar Espaço Escolar
            </DialogTitle>
            <DialogDescription>
              Preencha os dados abaixo para confirmar a reserva do espaço selecionado.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateBooking} className="space-y-4 py-2">
            {/* Room Select */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Sala / Laboratório</label>
              <select
                value={formRoomId}
                onChange={(e) => setFormRoomId(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 text-foreground"
              >
                {rooms.map((r) => (
                  <option key={r.id} value={r.id} disabled={!r.available}>
                    {r.name} ({r.capacity} pessoas) {!r.available ? "- Ocupada" : ""}
                  </option>
                ))}
              </select>
            </div>

            {/* Professor Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Professor Responsável</label>
              <input
                type="text"
                required
                placeholder="Ex: Profª. Ana Maria"
                value={formTeacher}
                onChange={(e) => setFormTeacher(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 text-foreground"
              />
            </div>

            {/* Subject / Discipline */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Disciplina ou Motivo do Agendamento</label>
              <input
                type="text"
                required
                placeholder="Ex: Aula prática de Física - Óptica"
                value={formSubject}
                onChange={(e) => setFormSubject(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 text-foreground"
              />
            </div>

            {/* Date & Time Slot Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Data da Reserva</label>
                <input
                  type="date"
                  required
                  value={formDate}
                  onChange={(e) => setFormDate(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 text-foreground"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Horário / Aula</label>
                <select
                  value={formTimeSlot}
                  onChange={(e) => setFormTimeSlot(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 text-foreground"
                >
                  {TIME_SLOTS.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Observações / Equipamentos Adicionais</label>
              <textarea
                rows={2}
                placeholder="Ex: Necessário caixa de som e microfone sem fio."
                value={formNotes}
                onChange={(e) => setFormNotes(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 text-foreground resize-none"
              />
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={() => setIsBookingOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-purple-600 hover:bg-purple-500 text-white font-semibold">
                Confirmar Agendamento
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* MODAL 2: CONSULTA DE AGENDAMENTOS ATIVOS */}
      <Dialog open={isBookingsListOpen} onOpenChange={setIsBookingsListOpen}>
        <DialogContent className="sm:max-w-xl bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2 text-foreground">
              <Clock className="h-5 w-5 text-primary" />
              Agendamentos Confirmados
            </DialogTitle>
            <DialogDescription>
              Lista completa de reservas de salas ativas no sistema.
            </DialogDescription>
          </DialogHeader>

          <div className="max-h-[60vh] overflow-y-auto space-y-3 pr-1 my-2">
            {bookings.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Nenhum agendamento registrado até o momento.
              </div>
            ) : (
              bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="p-4 rounded-xl bg-muted/40 border border-border hover:border-primary/30 transition-all flex justify-between items-start gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-primary px-2 py-0.5 rounded-full bg-primary/10">
                        {booking.id}
                      </span>
                      <h4 className="font-semibold text-foreground text-sm">{booking.roomName}</h4>
                    </div>

                    <p className="text-xs font-medium text-foreground mt-1">{booking.subject}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Responsável: <strong>{booking.teacherName}</strong>
                    </p>

                    <div className="flex items-center gap-3 mt-2 text-[11px] text-muted-foreground font-medium">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-amber-500" /> {booking.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-teal-500" /> {booking.timeSlot}
                      </span>
                    </div>

                    {booking.notes && (
                      <p className="text-[11px] text-muted-foreground/80 italic mt-1 bg-card/50 p-1.5 rounded-md border border-border/50">
                        "{booking.notes}"
                      </p>
                    )}
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCancelBooking(booking.id)}
                    className="text-destructive hover:bg-destructive/10 shrink-0"
                    title="Cancelar agendamento"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBookingsListOpen(false)}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* MODAL 3: LOGIN / AUTENTICAÇÃO */}
      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <DialogContent className="sm:max-w-sm bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2 text-foreground">
              <User className="h-5 w-5 text-primary" />
              Acesso ao SalaFácil
            </DialogTitle>
            <DialogDescription>
              Entre com suas credenciais institucionais para gerenciar reservas.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleLoginSubmit} className="space-y-4 py-2">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">E-mail Institucional</label>
              <input
                type="email"
                required
                placeholder="professor@escola.edu.br"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 text-foreground"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Senha</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 text-foreground"
              />
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={() => setIsLoginOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-purple-600 hover:bg-purple-500 text-white font-semibold">
                Entrar no Sistema
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-muted-foreground font-medium">
            &copy; 2026 SalaFácil - Sistema de Agendamento e Gestão Escolar. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
