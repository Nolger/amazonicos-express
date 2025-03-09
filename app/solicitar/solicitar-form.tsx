"use client"

// Importaciones necesarias
import Link from "next/link"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ArrowRight, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

// Importaciones de componentes UI
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"

// Esquema de validación del formulario usando Zod
const formSchema = z.object({
  // Sección de datos del remitente
  nombreRemitente: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  telefonoRemitente: z.string().min(10, {
    message: "Ingresa un número de teléfono válido.",
  }),
  direccionRecogida: z.string().min(5, {
    message: "La dirección debe tener al menos 5 caracteres.",
  }),

  // Sección de datos del destinatario
  nombreDestinatario: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  telefonoDestinatario: z.string().min(10, {
    message: "Ingresa un número de teléfono válido.",
  }),
  direccionEntrega: z.string().min(5, {
    message: "La dirección debe tener al menos 5 caracteres.",
  }),

  // Campo opcional para instrucciones adicionales
  instrucciones: z.string().optional(),
})

export default function SolicitarForm() {
  const router = useRouter()
  // Estado para manejar el estado de envío del formulario
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Inicialización del formulario con React Hook Form y Zod
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombreRemitente: "",
      telefonoRemitente: "",
      direccionRecogida: "",
      nombreDestinatario: "",
      telefonoDestinatario: "",
      direccionEntrega: "",
      instrucciones: "",
    },
  })

  // Manejador de envío del formulario
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    
    try {
      const pedidoId = Math.floor(Math.random() * 1000000)
      // Formatear el mensaje para WhatsApp con los datos del formulario
      const mensajeFormateado = `
*NUEVA SOLICITUD DE DOMICILIO*
ID: ${pedidoId}

*DATOS DE RECOGIDA:*
Nombre: ${values.nombreRemitente}
Teléfono: ${values.telefonoRemitente}
Dirección: ${values.direccionRecogida}

*DATOS DE ENTREGA:*
Nombre: ${values.nombreDestinatario}
Teléfono: ${values.telefonoDestinatario}
Dirección: ${values.direccionEntrega}
${values.instrucciones ? `*INSTRUCCIONES ADICIONALES:*\n${values.instrucciones}` : ''}`.trim();

      // Enviar datos a la API de WhatsApp
      const response = await fetch('/api/send-whatsapp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: process.env.NEXT_PUBLIC_WHATSAPP_RECIPIENT || "573214859572",
          message: mensajeFormateado,
          formData: values
        }),
      });

      // Manejar la respuesta
      if (!response.ok) {
        throw new Error('Error al enviar el mensaje a WhatsApp');
      }

      // Mostrar mensaje de éxito y resetear el formulario
      toast({
        title: "Solicitud enviada",
        description: "Redirigiendo a los detalles de tu pedido...",
      });
      
      // Redirigir a la página de detalles del pedido
      router.push(`/pedido/${pedidoId}`);
    } catch (error) {
      // Manejar errores
      console.error("Error al enviar la solicitud:", error);
      toast({
        title: "Error al enviar",
        description: "No pudimos procesar tu solicitud. Por favor intenta de nuevo o contacta directamente con un agente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  // Renderizado del formulario
  return (
    <Card className="w-full max-w-2xl border-green-100">
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Sección de datos de recogida */}
            <div>
              <h2 className="text-xl font-semibold text-green-800 mb-4">Datos de recogida</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Campo nombre remitente */}
                <FormField
                  control={form.control}
                  name="nombreRemitente"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre de quien envía</FormLabel>
                      <FormControl>
                        <Input placeholder="Nombre completo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Campo teléfono remitente */}
                <FormField
                  control={form.control}
                  name="telefonoRemitente"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teléfono de contacto</FormLabel>
                      <FormControl>
                        <Input placeholder="Número de teléfono" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Campo dirección de recogida */}
              <FormField
                control={form.control}
                name="direccionRecogida"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel>Dirección de recogida</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Dirección completa donde se recogerá el paquete"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator className="bg-green-100" />

            {/* Sección de datos de entrega */}
            <div>
              <h2 className="text-xl font-semibold text-green-800 mb-4">Datos de entrega</h2>

              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="nombreDestinatario"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre de quien recibe</FormLabel>
                      <FormControl>
                        <Input placeholder="Nombre completo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="telefonoDestinatario"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teléfono de contacto</FormLabel>
                      <FormControl>
                        <Input placeholder="Número de teléfono" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="direccionEntrega"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel>Dirección de entrega</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Dirección completa donde se entregará el paquete"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Sección de instrucciones adicionales */}
            <FormField
              control={form.control}
              name="instrucciones"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instrucciones adicionales (opcional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Información adicional que debamos saber"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Puedes incluir detalles sobre el paquete o instrucciones especiales.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Botones de acción */}
            <div className="space-y-4">
              {/* Botón de envío */}
              <Button
                type="submit"
                className="w-full bg-green-800 hover:bg-green-700 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    Solicitar domicilio
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>

              {/* Enlace alternativo a WhatsApp */}
              <Link href="https://wa.me/573214859572" className="cursor-pointer">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-green-800 text-green-800 hover:bg-green-50"
                >
                  Prefiero hablar con un agente
                </Button>
              </Link> 
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}