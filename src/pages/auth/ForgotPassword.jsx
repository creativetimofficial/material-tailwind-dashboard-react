"use client"

import { useState } from "react"
import { Card, Input, Button, Typography } from "@material-tailwind/react"
import { EnvelopeIcon } from "@heroicons/react/24/outline"
import { Service } from "@/data/api"

export function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [notification, setNotification] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await Service.post("/auth/forgot-password", { email })
      showNotification("green", "Se ha enviado un código de recuperación a tu correo.")
    } catch (error) {
      console.error("Error al enviar el correo de recuperación:", error)
      showNotification("red", "Error al enviar el correo. Por favor, intenta de nuevo.")
    }
  }

  const showNotification = (type, message) => {
    setNotification({ type, message })
    setTimeout(() => setNotification(null), 5000)
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md mx-4 shadow-xl">
        <form onSubmit={handleSubmit} className="p-8">
          <div className="text-center mb-8">
            <EnvelopeIcon className="h-12 w-12 mx-auto text-blue-500 mb-4" />
            <Typography variant="h3" className="font-bold text-2xl mb-2">
              Recuperar Contraseña
            </Typography>
            <Typography variant="paragraph" color="blue-gray" className="text-sm">
              Ingresa tu correo electrónico para recibir un código de recuperación.
            </Typography>
          </div>
          <div className="mb-4">
            <Input
              size="lg"
              label="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="mt-6" fullWidth>
            Enviar Código
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            ¿Recordaste tu contraseña?{" "}
            <a href="/auth/sign-in" className="ml-1 font-medium text-blue-500 hover:text-blue-700">
              Iniciar sesión
            </a>
          </Typography>
        </form>
      </Card>
      {notification && (
        <div
          className={`fixed top-4 right-4 p-4 rounded-lg text-white ${
            notification.type === "green" ? "bg-green-500" : "bg-red-500"
          } transition-opacity duration-500 ${notification ? "opacity-100" : "opacity-0"}`}
        >
          {notification.message}
        </div>
      )}
    </div>
  )
}

export default ForgotPassword

