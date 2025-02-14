"use client"

import { useState } from "react"
import { Card, Input, Button, Typography } from "@material-tailwind/react"
import { LockClosedIcon } from "@heroicons/react/24/outline"
import { Service } from "@/data/api"

export function ResetPassword() {
  const [formData, setFormData] = useState({
    code: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [notification, setNotification] = useState(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.newPassword !== formData.confirmPassword) {
      showNotification("red", "Las contraseñas no coinciden.")
      return
    }
    try {
      await Service.post("/auth/reset-password", {
        code: formData.code,
        newPassword: formData.newPassword,
      })
      showNotification("green", "Tu contraseña ha sido actualizada exitosamente.")
    } catch (error) {
      console.error("Error al restablecer la contraseña:", error)
      showNotification("red", "Error al restablecer la contraseña. Por favor, intenta de nuevo.")
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
            <LockClosedIcon className="h-12 w-12 mx-auto text-blue-500 mb-4" />
            <Typography variant="h3" className="font-bold text-2xl mb-2">
              Restablecer Contraseña
            </Typography>
            <Typography variant="paragraph" color="blue-gray" className="text-sm">
              Ingresa el código recibido y tu nueva contraseña.
            </Typography>
          </div>
          <div className="mb-4 space-y-4">
            <Input
              size="lg"
              label="Código de recuperación"
              name="code"
              value={formData.code}
              onChange={handleChange}
              required
            />
            <Input
              type="password"
              size="lg"
              label="Nueva contraseña"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              required
            />
            <Input
              type="password"
              size="lg"
              label="Confirmar nueva contraseña"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <Button type="submit" className="mt-6" fullWidth>
            Restablecer Contraseña
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

export default ResetPassword

