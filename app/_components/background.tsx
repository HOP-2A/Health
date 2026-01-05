"use client";
export default function GradientBackground({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      <div
        className="fixed inset-0 -z-10"
        style={{
          background: "linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)",
        }}
      />

      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div
          className="absolute rounded-full"
          style={{
            width: "650px",
            height: "650px",
            top: "-18%",
            left: "-12%",
            background:
              "radial-gradient(circle, rgba(16, 185, 129, 0.6) 0%, rgba(5, 150, 105, 0.4) 50%, transparent 70%)",
            filter: "blur(70px)",
          }}
        />

        <div
          className="absolute rounded-full"
          style={{
            width: "750px",
            height: "750px",
            bottom: "-22%",
            right: "-18%",
            background:
              "radial-gradient(circle, rgba(6, 78, 59, 0.7) 0%, rgba(4, 120, 87, 0.4) 50%, transparent 70%)",
            filter: "blur(85px)",
          }}
        />

        <div
          className="absolute rounded-full"
          style={{
            width: "550px",
            height: "550px",
            top: "35%",
            left: "25%",
            background:
              "radial-gradient(circle, rgba(52, 211, 153, 0.45) 0%, rgba(16, 185, 129, 0.3) 50%, transparent 70%)",
            filter: "blur(75px)",
          }}
        />

        <div
          className="absolute rounded-full"
          style={{
            width: "450px",
            height: "450px",
            top: "8%",
            right: "12%",
            background:
              "radial-gradient(circle, rgba(134, 239, 172, 0.35) 0%, rgba(74, 222, 128, 0.2) 50%, transparent 65%)",
            filter: "blur(60px)",
          }}
        />

        <div
          className="absolute rounded-full"
          style={{
            width: "500px",
            height: "500px",
            bottom: "15%",
            left: "18%",
            background:
              "radial-gradient(circle, rgba(20, 83, 45, 0.5) 0%, rgba(22, 101, 52, 0.3) 50%, transparent 70%)",
            filter: "blur(65px)",
          }}
        />

        <div
          className="absolute rounded-full"
          style={{
            width: "420px",
            height: "420px",
            top: "55%",
            right: "8%",
            background:
              "radial-gradient(circle, rgba(34, 197, 94, 0.4) 0%, rgba(22, 163, 74, 0.25) 50%, transparent 65%)",
            filter: "blur(55px)",
          }}
        />

        <div
          className="absolute rounded-full"
          style={{
            width: "380px",
            height: "380px",
            top: "18%",
            left: "45%",
            background:
              "radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, rgba(5, 150, 105, 0.2) 50%, transparent 60%)",
            filter: "blur(50px)",
          }}
        />

        <div
          className="absolute rounded-full"
          style={{
            width: "480px",
            height: "480px",
            bottom: "8%",
            left: "50%",
            background:
              "radial-gradient(circle, rgba(6, 95, 70, 0.5) 0%, rgba(4, 120, 87, 0.3) 50%, transparent 70%)",
            filter: "blur(68px)",
          }}
        />
      </div>

      <div className="relative z-0">{children}</div>
    </div>
  );
}
