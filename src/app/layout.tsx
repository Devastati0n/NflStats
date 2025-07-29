import type { Metadata } from "next";
import NavBar from './components/navbar' 
import "./globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body>
      
       <NavBar/> 
       
        {children}
      
      </body>
    </html>

  );
}
