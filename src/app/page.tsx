"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, MapPin, Clock, Gift, Camera, Music, PartyPopper, CalendarCheck2 } from "lucide-react"

export default function WeddingPage() {
  const [scrollY, setScrollY] = useState(0)

  // 👇 ADD: estados para countdown
  const [timeLeft, setTimeLeft] = useState<{
    days: number; hours: number; minutes: number; seconds: number;
  } | null>(null);

  // fecha objetivo (zona horaria -03:00)
  const targetISO = "2025-09-20T21:00:00-03:00"; // 20/09 21:00 hs Santa Fe
  const computeLeft = () => {
    const diff = new Date(targetISO).getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return { days, hours, minutes, seconds };
  };

  // iniciar/actualizar countdown solo en cliente
  useEffect(() => {
    setTimeLeft(computeLeft());             // primer cálculo
    const id = setInterval(() => setTimeLeft(computeLeft()), 1000);
    return () => clearInterval(id);
  }, []);


  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  const bgMarron = "bg-[#d1b36f]/50";
  const bgVerde = "bg-[#5A7326]/50";

  return (
    <div className={`min-h-screen ${bgMarron}`}>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/casPortada.jpg')`,
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        />
        <div className="absolute inset-0 bg-white/20" />

        <div
          className="relative z-10 text-center text-white"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        >
          <h1 className="text-2xl font-light tracking-[0.2em] mb-8">NOS CASAMOS</h1>
          <div className="w-1/2 mx-auto">
            <h2 className="text-6xl md:text-8xl font-bold tracking-wider mb-6 opacity-90">ANA Y AGUS</h2>
          </div>
          <p className="text-xl font-light tracking-[0.3em]">20 DE SEPTIEMBRE</p>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* 👇 ADD: sección de cuenta regresiva */}
      {timeLeft && (
        <section className="py-5 px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
              <CardContent className="p-6 md:p-8 text-center">
                <h3 className="text-2xl font-light tracking-wide text-[#5A7326] mb-4">
                  Falta cada vez menos
                </h3>
                <div className="grid grid-cols-4 gap-4 text-[#5A7326]">
                  <div>
                    <div className="text-4xl font-bold">{timeLeft.days}</div>
                    <div className="uppercase text-xs tracking-widest opacity-80">Días</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold">{timeLeft.hours.toString().padStart(2, "0")}</div>
                    <div className="uppercase text-xs tracking-widest opacity-80">Hs</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold">{timeLeft.minutes.toString().padStart(2, "0")}</div>
                    <div className="uppercase text-xs tracking-widest opacity-80">Min</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold">{timeLeft.seconds.toString().padStart(2, "0")}</div>
                    <div className="uppercase text-xs tracking-widest opacity-80">Seg</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Wedding Details Section */}
      <section className="py-15 px-4">
        <div className="max-w-6xl mx-auto">
          <div
            className="text-center mb-16"
            style={{
              transform: `translateY(${Math.max(0, (scrollY - 400) * -0.1)}px)`,
              opacity: Math.min(1, Math.max(0, (scrollY - 200) / 300)),
            }}
          >
            <h3 className="text-4xl font-bold tracking-wide text-white mb-4">Nuestra Celebración</h3>
            <div className={`w-24 h-px ${bgMarron} mx-auto`} />
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-5">
            <Card className={`bg-white/80 backdrop-blur-sm ${bgVerde} shadow-lg`}>
              <CardContent className="p-8 text-center">
                <div className={`w-16 h-16 ${bgVerde} rounded-full flex items-center justify-center mx-auto mb-6`}>
                  <Heart className="w-8 h-8 text-[#d1b36f]/50" />
                </div>
                <h4 className="text-2xl font-bold text-white mb-4">Ceremonia</h4>
                <div className="space-y-2 text-white">
                  <div className="flex items-center justify-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>21:00 hs</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">Parroquia Santo Domingo de Guzmán</span>
                  </div>
                  <p className="text-sm mt-4">Bombal, Santa fe</p>
                </div>
              </CardContent>
            </Card>

            <Card className={`bg-white/80 backdrop-blur-sm ${bgVerde} shadow-lg`}>
              <CardContent className="p-8 text-center">
                <div className={`w-16 h-16 ${bgVerde} rounded-full flex items-center justify-center mx-auto mb-6`}>
                  <Music className="w-8 h-8 text-[#d1b36f]/50" />
                </div>
                <h4 className="text-2xl font-bold text-white mb-4">Fiesta</h4>
                <div className="space-y-2 text-white">
                  <div className="flex items-center justify-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>22:00 hs</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>Salón: Club Sportivo Bombal</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <PartyPopper className="w-4 h-4" />
                    <p className="text-sm">Moreno 601</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Gift Section */}
      <section className={`py-20 ${bgVerde}`}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div
            className="mb-12"
            style={{
              transform: `translateY(${Math.max(0, (scrollY - 800) * -0.1)}px)`,
              opacity: Math.min(1, Math.max(0, (scrollY - 600) / 300)),
            }}
          >
            <Gift className="w-16 h-16 text-[#d1b36f] mx-auto mb-6" />
            <h3 className="text-4xl font-bold tracking-wide text-white mb-6">Regalo de Bodas</h3>
            <p className="text-lg text-white mb-8 max-w-2xl mx-auto">
              Tu presencia es nuestro mejor regalo, pero si deseas obsequiarnos algo, puedes hacerlo a través de una
              transferencia bancaria.
            </p>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  className={`${bgMarron} hover:${bgMarron}/50 text-white px-8 py-3 rounded-full font-light tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer`}
                >
                  Ver Datos Bancarios
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-center text-2xl font-light text-gray-800">Datos Bancarios</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 p-4">
                  <div className={`${bgMarron} p-4 rounded-lg`}>
                    <h4 className="font-medium text-gray-800 mb-2">Mercado Pago</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>
                        <span className="font-medium">Titular:</span> Agustín Alberto Riesco
                      </p>
                      <p>
                        <span className="font-medium">CVU:</span> 0000003100030385960107
                      </p>
                      <p>
                        <span className="font-medium">Alias:</span> lunademiel.ana.agus
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 text-center mt-4">
                    ¡Muchas gracias por acompañarnos en este día tan especial!
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      {/* Photo Gallery Preview */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div
            className="text-center mb-16"
            style={{
              transform: `translateY(${Math.max(0, (scrollY - 1200) * -0.1)}px)`,
              opacity: Math.min(1, Math.max(0, (scrollY - 1000) / 300)),
            }}
          >
            <Camera className={`w-16 h-16 text-[#5A7326] mx-auto mb-6`} />
            <h3 className="text-4xl font-light tracking-wide text-white mb-4">Nuestros Momentos</h3>
            <div className={`w-24 h-px ${bgVerde} mx-auto mb-8`} />
            <p className="text-lg text-white max-w-2xl mx-auto">
              Algunos de nuestros momentos más especiales juntos
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="aspect-square bg-cover bg-center rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                style={{
                  backgroundImage: `url('/cas${i}.jpg')`,
                }}
              />
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 text-center flex flex-col items-center text-white">
        <CalendarCheck2 className="w-4 h-4" />
        <p className="font-bold">Confirmar asistencia </p>
        <p className="font-light">hasta el 5 de Septiembre</p>
      </div>

      {/* Footer */}
      <footer className="py-16 bg-gradient-to-t from-[#5A7326]-100 to-transparent">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="mb-8">
            <Heart className="w-12 h-12 text-[#5A7326] mx-auto mb-4" />
            <h4 className="text-2xl font-light text-white mb-4">¡Nos vemos el gran día!</h4>
            <p className="text-white">Con amor, Ana y Agus</p>
          </div>
          <div className="w-32 h-px bg-[#5A7326] mx-auto" />
        </div>
      </footer>
    </div>
  )
}