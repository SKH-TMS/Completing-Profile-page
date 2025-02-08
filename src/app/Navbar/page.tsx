"use client";
 
 import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if there's a token in cookies
    const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token='));
    setIsAuthenticated(!!token); // Set authentication state based on token presence
  }, []);

  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/Login">Login</Link>
      <Link href="/Register">Register</Link>
      <Link href="/Profile">Profile</Link> 
      {isAuthenticated ? (
        <Link href="/api/auth/logout">Logout</Link>
      ) : null}
    </nav>
  );
}
