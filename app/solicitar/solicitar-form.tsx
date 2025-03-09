"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ArrowRight, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
  // Datos de recogida
  nombreRemitente: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  telefonoRemitente: z.string().min(10, {
    message: "Ingresa un número de teléfono válido.",
  }),
  direccionRecogida: z.string().min(5, {
    message: "La dirección debe tener al menos 5 caracteres.",
  }),

  // Datos de entrega
  nombreDestinatario: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  telefonoDestinatario: z.string().min(10, {
    message: "Ingresa un número de teléfono válido.",
  }),
  direccionEntrega: z.string().min(5, {
    message: "La dirección debe tener al menos 5 caracteres.",
  }),

  // Opcional: instrucciones adicionales
  instrucciones: z.string().optional(),
})

export default function SolicitarForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Simulación de envío
    setTimeout(() => {
      console.log(values)
      setIsSubmitting(false)
      toast({
        title: "Solicitud enviada",
        description: "Hemos recibido tu solicitud de domicilio. Te contactaremos pronto.",
      })
      form.reset()
    }, 1500)
  }

  return (
    <Card className="w-full max-w-2xl border-green-100">
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Sección de recogida */}
            <div>
              <h2 className="text-xl font-semibold text-green-800 mb-4">Datos de recogida</h2>

              <div className="grid gap-4 sm:grid-cols-2">
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

            {/* Sección de entrega */}
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

            {/* Instrucciones adicionales */}
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

            <div className="space-y-4">
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

              <Button
                type="button"
                variant="outline"
                className="w-full border-green-800 text-green-800 hover:bg-green-50"
                onClick={() => {
                  toast({
                    title: "Contacto con agente",
                    description: "Un agente se pondrá en contacto contigo pronto.",
                  })
                }}
              >
                Prefiero hablar con un agente
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

