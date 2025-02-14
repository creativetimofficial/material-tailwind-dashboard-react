"use client"

import { useState } from "react"
import { Card, Input, Checkbox, Button, Typography, Alert } from "@material-tailwind/react"
import { Link } from "react-router-dom"
import { Service } from "@/data/api"

export function SignIn() {
  const [correo, setEmail] = useState("")
  const [contrasena, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [notification, setNotification] = useState(null)

  const handleSignIn = async (e) => {
    e.preventDefault()
    try {
      const response = await Service.post("/login/", { correo, contrasena })
      console.log("Inicio de sesión exitoso:", response)
      setNotification({
        type: "green",
        message: "Inicio de sesión exitoso. Redirigiendo...",
      })
      setTimeout(() => {
        window.location.href = "/dashboard/home"
      }, 1000)
    } catch (error) {
      console.error("Error al iniciar sesión:", error)
      setNotification({
        type: "red",
        message: "Error al iniciar sesión. Por favor, verifica tus credenciales.",
      })
    }
  }

  return (
    <Card className="w-96 mx-auto mt-20">
      <form onSubmit={handleSignIn} className="p-8">
        <div className="text-center mb-8">
          <Typography variant="h3" className="font-bold">
            Iniciar Sesión
          </Typography>
          <Typography variant="paragraph" color="blue-gray" className="mt-2">
            Ingresa tu correo y contraseña para acceder.
          </Typography>
        </div>
        {notification && (
          <Alert
            color={notification.type}
            dismissible={{
              onClose: () => setNotification(null),
            }}
            className="mb-4"
          >
            {notification.message}
          </Alert>
        )}
        <div className="mb-4">
          <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
            Correo electrónico
          </Typography>
          <Input
            type="correo"
            value={correo}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tucorreo@ejemplo.com"
            required
            fullWidth
          />
        </div>
        <div className="mb-4">
          <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
            Contraseña
          </Typography>
          <Input
            type="contrasena"
            value={contrasena}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            fullWidth
          />
        </div>
        <div className="flex items-center justify-between mb-4">
          <Checkbox label="Recordarme" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
          <Typography variant="small" className="font-medium text-blue-500">
            <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
          </Typography>
        </div>
        <Button type="submit" color="blue" fullWidth>
          Iniciar Sesión
        </Button>
        <div className="mt-6 text-center">
          <Typography variant="small" className="text-blue-gray-500">
            ¿No tienes una cuenta?{" "}
            <Link to="/auth/sign-up" className="text-blue-500 font-medium">
              Regístrate
            </Link>
          </Typography>
        </div>
      </form>
    </Card>
  )
}

export default SignIn

