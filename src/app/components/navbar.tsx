"use client";

import Link from "next/link";
import '@/app/shared/navbar.css';

export default function Navbar() {
  return (
   
   <nav className="navbar">
      <ul className="nav-links">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/team">Teams</Link></li>
        <li><Link href="/about">About</Link></li>
      </ul>
    </nav>
    
  );
}