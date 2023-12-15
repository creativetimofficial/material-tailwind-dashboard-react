import logo from "@/assets/img/appLogo.png";

export default function LoadingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary">
      <div className="flex flex-col items-center justify-center">
        <img src={logo} alt="logo" className="w-32 h-32" />

        <div className="flex gap-4 items-center">
          <div className="w-4 h-4 rounded-full bg-white animate-ping"></div>
          <h2 className="text-xl font-semibold text-white">Loading...</h2>
        </div>
      </div>
    </div>
  );
}
