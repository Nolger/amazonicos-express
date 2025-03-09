"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle as WhatsappIcon } from "lucide-react"

export default function PedidoPage() {
  const params = useParams()
  const pedidoId = params.id

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white text-green-900 p-4">
      <Card className="w-full max-w-2xl border-green-100">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-green-800">
            Pedido #{pedidoId}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <p className="text-lg font-medium text-green-800">
              ¡Tu pedido ha sido recibido con éxito!
            </p>
            <p className="text-sm text-green-600 mt-2">
              Uno de nuestros agentes procesará tu solicitud en breve.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-green-800">Detalles del pedido:</h3>
            <div className="grid gap-2 text-sm">
              <p><span className="font-medium">Estado:</span> En proceso</p>
              <p><span className="font-medium">Fecha:</span> {new Date().toLocaleDateString()}</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Link 
              href={`https://wa.me/573214859572?text=Hola,%20quisiera%20consultar%20el%20estado%20de%20mi%20pedido%20%23${pedidoId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="w-full bg-green-600 hover:bg-green-700">
                <WhatsappIcon className="mr-2 h-4 w-4" />
                Consultar estado por WhatsApp
              </Button>
            </Link>
            
            <Link href="/">
              <Button variant="outline" className="w-full">
                Volver al inicio
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}