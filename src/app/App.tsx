import { Calendar, Clock, Users } from "lucide-react";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";

const PURPLE = "#6D28D9";
const TEAL = "#0D9488";
const AMBER = "#F59E0B";
const DEEP = "#1E1B4B";
const MUTED_PURPLE = "#5B21B6";
const LIGHT_BG = "#F7F6FF";
const MUTED_SURFACE = "#EDE9FE";

export default function App() {
  const rooms = [
    {
      id: 1,
      name: "Sala de Informática",
      description: "30 computadores disponíveis",
      image: "https://images.unsplash.com/photo-1643199121319-b3b5695e4acb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2hvb2wlMjBjbGFzc3Jvb20lMjBjb21wdXRlcnN8ZW58MXx8fHwxNzgxMDUwMTk4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      capacity: 30,
      available: true,
    },
    {
      id: 2,
      name: "Laboratório de Ciências",
      description: "Equipamento completo para experimentos",
      image: "https://images.unsplash.com/photo-1758685734030-a31d96462eec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwbGFib3JhdG9yeSUyMHNjaG9vbHxlbnwxfHx8fDE3ODA5OTcyMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      capacity: 25,
      available: true,
    },
    {
      id: 3,
      name: "Biblioteca",
      description: "Espaço silencioso para leitura e estudo",
      image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWJyYXJ5JTIwYm9va3MlMjBzaGVsdmVzfGVufDF8fHx8MTc4MTAxNTY4N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      capacity: 40,
      available: false,
    },
    {
      id: 4,
      name: "Auditório",
      description: "Apresentações e eventos escolares",
      image: "https://images.unsplash.com/photo-1643199032520-99230e970fb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2hvb2wlMjBhdWRpdG9yaXVtfGVufDF8fHx8MTc4MTA1MDE5NXww&ixlib=rb-4.1.0&q=80&w=1080",
      capacity: 150,
      available: true,
    },
  ];

  const stats = [
    { title: "Salas Disponíveis", value: "12", icon: Calendar, description: "Prontas para reserva" },
    { title: "Agendamentos Hoje", value: "8", icon: Clock, description: "Em andamento" },
    { title: "Usuários Ativos", value: "45", icon: Users, description: "Professores cadastrados" },
  ];

  return (
    <div className="min-h-screen" style={{ background: LIGHT_BG }}>
      {/* Header */}
      <header style={{ background: DEEP, borderBottom: `3px solid ${AMBER}` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-semibold text-lg" style={{ color: "#C4B5FD" }}>
                Sistema de Agendamento
              </h1>
              <p className="text-sm" style={{ color: "#A78BFA" }}>
                Gestão de Salas Escolares
              </p>
            </div>
            <Button
              style={{ background: PURPLE, color: "#fff", border: "none" }}
              className="hover:opacity-90 transition-opacity"
            >
              Fazer Login
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section
        className="py-16"
        style={{
          background: `linear-gradient(135deg, ${DEEP} 0%, #312E81 60%, #1E3A5F 100%)`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-6"
            style={{ background: `${AMBER}22`, color: AMBER, border: `1px solid ${AMBER}55` }}
          >
            Plataforma Escolar
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-5 leading-tight" style={{ color: "#fff" }}>
            Agende Salas Escolares{" "}
            <span style={{ color: "#C4B5FD" }}>com Facilidade</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto mb-10" style={{ color: "#A5B4FC" }}>
            Gerencie reservas de salas de informática, laboratórios, biblioteca e outros espaços da sua escola de forma simples e eficiente.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              size="lg"
              className="px-8 hover:opacity-90 transition-opacity"
              style={{ background: PURPLE, color: "#fff", border: "none" }}
            >
              <Calendar className="mr-2 h-5 w-5" />
              Agendar Sala
            </Button>
            <Button
              size="lg"
              className="px-8 hover:opacity-90 transition-opacity"
              style={{ background: "transparent", color: "#C4B5FD", border: `1px solid #7C3AED` }}
            >
              Ver Calendário
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const accentColors = [PURPLE, TEAL, AMBER];
            const color = accentColors[index];
            return (
              <Card
                key={index}
                className="shadow-md"
                style={{ borderTop: `4px solid ${color}`, background: "#fff" }}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium" style={{ color: DEEP }}>
                    {stat.title}
                  </CardTitle>
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: `${color}18` }}
                  >
                    <Icon className="h-4 w-4" style={{ color }} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold" style={{ color }}>
                    {stat.value}
                  </div>
                  <p className="text-xs mt-1" style={{ color: MUTED_PURPLE }}>
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Rooms Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-3 mb-7">
          <h3 className="text-2xl font-semibold" style={{ color: DEEP }}>
            Salas Disponíveis
          </h3>
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{ background: MUTED_SURFACE, color: PURPLE }}
          >
            4 espaços
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {rooms.map((room) => (
            <Card
              key={room.id}
              className="overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
              style={{ border: `1px solid rgba(109,40,217,0.12)` }}
            >
              <div className="relative h-44 w-full overflow-hidden bg-purple-100">
                <ImageWithFallback
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover"
                />
                {!room.available && (
                  <div className="absolute inset-0 bg-black/55 flex items-center justify-center">
                    <span
                      className="px-3 py-1 rounded-full text-sm font-semibold text-white"
                      style={{ background: "#DC2626" }}
                    >
                      Ocupada
                    </span>
                  </div>
                )}
                {room.available && (
                  <span
                    className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs font-semibold"
                    style={{ background: `${TEAL}EE`, color: "#fff" }}
                  >
                    Disponível
                  </span>
                )}
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-base" style={{ color: DEEP }}>
                  {room.name}
                </CardTitle>
                <CardDescription style={{ color: MUTED_PURPLE }}>
                  {room.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm mb-4" style={{ color: MUTED_PURPLE }}>
                  <Users className="h-4 w-4 mr-1.5" style={{ color: AMBER }} />
                  <span>Até {room.capacity} pessoas</span>
                </div>
                <Button
                  className="w-full transition-opacity hover:opacity-90"
                  disabled={!room.available}
                  style={
                    room.available
                      ? { background: TEAL, color: "#fff", border: "none" }
                      : { background: "#F3F4F6", color: "#9CA3AF", border: "none", cursor: "not-allowed" }
                  }
                >
                  {room.available ? "Agendar" : "Indisponível"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: DEEP, borderTop: `3px solid ${PURPLE}` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7">
          <div className="text-center text-sm" style={{ color: "#7C6FA6" }}>
            <p>&copy; 2026 Sistema de Agendamento de Salas Escolares</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
