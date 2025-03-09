import Image from "next/image"
import Link from "next/link"
import { Facebook, Instagram, Twitter, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white text-green-900">
      <div className="container max-w-5xl px-4 py-8 mx-auto flex flex-col items-center gap-8">
        {/* Logo */}
        <div className="w-50 h-50 relative mb-4">
          <Image
            src="/logo.png"
            alt="Amazonico Express Logo"
            width={200}
            height={200}
            priority
            className="object-contain"
          />
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-5xl font-bold text-center text-green-900">
          Entregas rápidas y confiables en Riohacha
        </h1>

        {/* Brief description */}
        <p className="text-xl text-center max-w-2xl text-green-800">
          Amazonico Express es tu servicio de domicilios local en Riohacha, La Guajira. Entregamos lo que necesitas,
          cuando lo necesitas, con la velocidad y confiabilidad que mereces.
        </p>

        {/* CTA Button */}
        <Button
          className="bg-green-800 hover:bg-green-700 text-white px-8 py-6 text-lg rounded-full flex items-center gap-2 mt-4"
          asChild
        >
          <Link href="/solicitar">
            Solicitar un domicilio
            <ArrowRight className="ml-2" />
          </Link>
        </Button>

        {/* Social Media */}
        <div className="flex gap-6 mt-8">
          <Button variant="ghost" size="icon" className="rounded-full bg-green-50 hover:bg-green-100 text-green-800">
            <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <Facebook size={24} />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full bg-green-50 hover:bg-green-100 text-green-800">
            <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram size={24} />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full bg-green-50 hover:bg-green-100 text-green-800">
            <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <Twitter size={24} />
            </Link>
          </Button>
        </div>

        {/* Footer */}
        <footer className="mt-auto pt-8 text-sm text-green-700 text-center">
          &copy; {new Date().getFullYear()} Amazonico Express. Todos los derechos reservados.
        </footer>
      </div>
    </main>
  )
}
