"use client"

import { useState } from "react"
import { Card, Input, Checkbox, Button, Typography, Alert } from "@material-tailwind/react"
import { Link } from "react-router-dom"
import { Service } from "@/data/api"

export function SignUp() {
  const [formData, setFormData] = useState({
    correo: "",
    nombres: "",
    apellidos: "",
    documento: "",
    contrasena: "",
  })
  const [aceptaTerminos, setAceptaTerminos] = useState(false)
  const [notification, setNotification] = useState(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!aceptaTerminos) {
      setNotification({
        type: "red",
        message: "Debes aceptar los términos y condiciones para registrarte.",
      })
      return
    }
    try {
      const response = await Service.post("/usuario/", {
        ...formData,
        estado: true,
      })
      console.log("Registro exitoso:", response)
      setNotification({
        type: "green",
        message: "Registro exitoso. Por favor, inicia sesión.",
      })
      // Aquí puedes redirigir al usuario a la página de inicio de sesión
    } catch (error) {
      console.error("Error al registrarse:", error)
      setNotification({
        type: "red",
        message: "Error al registrarse. Por favor, intenta de nuevo.",
      })
    }
  }

  return (
    <Card className="w-96 mx-auto mt-20">
      <form onSubmit={handleSubmit} className="p-8">
        <div className="text-center mb-8">
          <Typography variant="h3" className="font-bold">
            Regístrate
          </Typography>
          <Typography variant="paragraph" color="blue-gray" className="mt-2">
            Ingresa tus datos para crear una cuenta.
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
        <div className="mb-4 flex flex-col gap-6">
          <Input
            size="lg"
            label="Correo electrónico"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            required
          />
          <Input size="lg" label="Nombres" name="nombres" value={formData.nombres} onChange={handleChange} required />
          <Input
            size="lg"
            label="Apellidos"
            name="apellidos"
            value={formData.apellidos}
            onChange={handleChange}
            required
          />
          <Input
            size="lg"
            label="Documento"
            name="documento"
            value={formData.documento}
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            size="lg"
            label="Contraseña"
            name="contrasena"
            value={formData.contrasena}
            onChange={handleChange}
            required
          />
        </div>
        <Checkbox
          label={
            <Typography variant="small" color="gray" className="flex items-center font-normal">
              Acepto los{" "}
              <a href="#" className="font-medium transition-colors hover:text-gray-900">
                &nbsp;términos y condiciones
              </a>
            </Typography>
          }
          containerProps={{ className: "-ml-2.5" }}
          checked={aceptaTerminos}
          onChange={(e) => setAceptaTerminos(e.target.checked)}
        />
        <Button type="submit" className="mt-6" fullWidth>
          Registrarse
        </Button>
        <Typography variant="small" className="mt-6 flex justify-center">
          ¿Ya tienes una cuenta?
          <Link to="/auth/sign-in" className="ml-1 font-bold text-gray-900">
            Inicia sesión
          </Link>
        </Typography>
      </form>
    </Card>
  )
}

export default SignUp

