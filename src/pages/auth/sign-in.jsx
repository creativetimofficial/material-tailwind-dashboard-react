import React, { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {
  useMaterialTailwindController,
  setUserRole,
} from "@/context";
import apiClient from "../../api/axiosConfig.js"

export function SignIn() {
  const [, dispatch] = useMaterialTailwindController();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const getStartPage = (role) => {
    if (role === "muhasebeci") return "/anasayfa/cari-hesaplar";
    if (role === "user") return "/anasayfa/cari-bilgilerim";
    return "/anasayfa/arac-siralari";
  };

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
        localStorage.setItem("authToken", token);
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        console.log("Giriş Başarılı!");
        const decodedToken = jwtDecode(token);
        const userRoleClaim = decodedToken.role || decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        const firstRole = Array.isArray(userRoleClaim) ? userRoleClaim[0] : userRoleClaim;
        const userRole = firstRole ? firstRole.toLowerCase() : null;
        console.log("Kullanıcı Rolü:", userRole);

        if (userRole) {
          setUserRole(dispatch, userRole);
          localStorage.setItem("userRole", userRole);
        }

        navigate(getStartPage(userRole));
      } else {
        alert("Giriş başarılı ancak sunucudan geçerli bir token alınamadı.");
      }
    } catch (error) {
      console.error("Giriş sırasında hata:", error);

      if (error.response) {
        alert("Kullanıcı adı veya şifre hatalı!");
      } else if (error.request) {
        alert("Sunucuya bağlanılamadı. Ağ bağlantınızı kontrol edin.");
      } else {
        alert("Beklenmedik bir hata oluştu.");
      }
    }
  };

  return (
      <section
          className="min-h-screen flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: `url(/img/background.webp)` }}
      >
        <Card className="w-full max-w-md p-8 bg-white/90 backdrop-blur-sm shadow-2xl rounded-2xl">
          <div className="text-center">
            <img src="/img/klogo.webp" alt="Logo" className="mx-auto h-32 w-auto mb-4  select-none drag-none pointer-events-none" />
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