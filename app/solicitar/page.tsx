import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import SolicitarForm from "./solicitar-form"

export default function SolicitarPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white text-green-900">
      <div className="container max-w-5xl px-4 py-8 mx-auto flex flex-col items-center gap-8">
        {/* Logo */}
        <div className="w-24 h-24 relative mb-4">
          <Image
            src="/logo.png"
            alt="Amazonico Express Logo"
            width={120}
            height={120}
            priority
            className="object-contain"
          />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-center text-green-900">Solicitar un domicilio</h1>

        <p className="text-lg text-center max-w-2xl text-green-800 mb-4">
          Completa el formulario a continuación para solicitar nuestro servicio de domicilios.
        </p>

        {/* Formulario de solicitud */}
        <SolicitarForm />

        <Button variant="outline" className="cursor-pointer mt-8 border-green-800 text-green-800 hover:bg-green-50" asChild>
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft size={16} />
            Volver al inicio
          </Link>
        </Button>
      </div>
    </main>
  )
}

