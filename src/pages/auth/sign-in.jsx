import React, { useState } from "react"; // YENİ: useState eklendi
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom"; // YENİ: useNavigate eklendi

export function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const handleSignIn = async () => {
    const loginData = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch("https://localhost:7093/api/Auth/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const token = await response.text();


        localStorage.setItem("authToken", token);
        console.log("Giriş Başarılı!");
        navigate("/dashboard/home");
      } else {
        alert("Kullanıcı adı veya şifre hatalı!");
      }
    } catch (error) {
      console.error("Sunucuya bağlanırken bir hata oluştu:", error);
      alert("Sunucuya bağlanılamadı.");
    }
  };

  return (
      <section
          className="min-h-screen flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: `url(/img/background.jpg)` }} // Arka plan resminizin yolu
      >
        <Card className="w-full max-w-md p-8 bg-white/90 backdrop-blur-sm shadow-2xl rounded-2xl">
          <div className="text-center">
            <Typography variant="h2" className="font-bold mb-6 text-gray-800">
              LOGO
            </Typography>
          </div>
          {/* YENİ: form etiketini div ile değiştirdik */}
          <div className="flex flex-col gap-6">
            <div>
              <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 font-medium"
              >
                Kullanıcı Adı
              </Typography>
              <Input
                  size="lg"
                  placeholder="Kullanıcı Adı"
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  // YENİ: State bağlantıları
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 font-medium"
              >
                Şifre
              </Typography>
              <Input
                  type="password"
                  size="lg"
                  placeholder="********"
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}

                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
              />
            </div>


            <Button className="mt-4" fullWidth onClick={handleSignIn}>
              Giriş Yap
            </Button>
          </div>
        </Card>
      </section>
  );
}

export default SignIn;