import { Header } from "@/client/components/header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
