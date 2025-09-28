import React, { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {
  useMaterialTailwindController,
  setUserRole,
} from "@/context";
// 1. Kendi oluşturduğunuz apiClient'ı import edin
import apiClient from "../../api/axiosConfig.js"

export function SignIn() {
  const [, dispatch] = useMaterialTailwindController();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async () => {
    const loginData = {
      username: username,
      password: password,
    };

    try {

      const response = await apiClient.post("/Auth/Login", loginData);


      const token = response.data;
      console.log(token);

      if (token) {
        // 3. Token'ı localStorage'a kaydet. Bu, interceptor'ın çalışması için kritik.
        localStorage.setItem("authToken", token);


        // İYİ BİR PRATİK: Token'ı aldıktan sonra, interceptor'ın bir sonraki
        // sayfa yenilemesini beklemeden çalışması için anında ayarlayın.
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        console.log("Giriş Başarılı!");
        const decodedToken = jwtDecode(token);
        const userRoleClaim = decodedToken.role || decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        const userRole = userRoleClaim ? userRoleClaim.toLowerCase() : null;
        console.log("Kullanıcı Rolü:", userRole);

        if (userRole) {
          setUserRole(dispatch, userRole);
          localStorage.setItem("userRole", userRole);
        }

        navigate("/dashboard/home");
      } else {
        alert("Giriş başarılı ancak sunucudan geçerli bir token alınamadı.");
      }
    } catch (error) {
      // 4. Geliştirilmiş hata yönetimi.
      // axios, 4xx veya 5xx gibi başarısız statü kodlarında otomatik olarak hata fırlatır ve bu blok çalışır.
      console.error("Giriş sırasında hata:", error);

      if (error.response) {
        // Sunucu bir hata koduyla (401, 404, 500 vb.) yanıt verdi.
        alert("Kullanıcı adı veya şifre hatalı!");
      } else if (error.request) {
        // İstek yapıldı ancak sunucudan yanıt alınamadı (network hatası).
        alert("Sunucuya bağlanılamadı. Ağ bağlantınızı kontrol edin.");
      } else {
        // İsteği hazırlarken bir hata oluştu.
        alert("Beklenmedik bir hata oluştu.");
      }
    }
  };

  return (
      <section
          className="min-h-screen flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: `url(/img/background.jpg)` }}
      >
        <Card className="w-full max-w-md p-8 bg-white/90 backdrop-blur-sm shadow-2xl rounded-2xl">
          <div className="text-center">
            <Typography variant="h2" className="font-bold mb-6 text-gray-800">
              LOGO
            </Typography>
          </div>
          <div className="flex flex-col gap-6">
            <div>
              <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                Kullanıcı Adı
              </Typography>
              <Input
                  size="lg"
                  placeholder="Kullanıcı Adı"
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{ className: "before:content-none after:content-none" }}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                Şifre
              </Typography>
              <Input
                  type="password"
                  size="lg"
                  placeholder="********"
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{ className: "before:content-none after:content-none" }}
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