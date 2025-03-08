// AuthContext.jsx
"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

const AuthContext = createContext(undefined);

export const AuthContextProvider = ({ children }) => {
  const [session, setSession] = useState(undefined);
  const [role, setRole] = useState(undefined);
  const [username, setUsername] = useState(undefined);
  const [loading, setLoading] = useState(true);

  const signUpNewUser = async (email, password, username) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      console.error("There was a problem signing up: ", error);
      return { success: false, error: error.message };
    }
    return { success: true, data };
  };

  const signIn = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Signin error occured: ", error);
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      console.error("An error occured: ", error);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user?.user_metadata) {
        setRole(session.user.user_metadata.role);
        setUsername(session.user.user_metadata.username);
      }
      setLoading(false);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user?.user_metadata) {
        setRole(session.user.user_metadata.role);
        setUsername(session.user.user_metadata.username);
      }
      setLoading(false);
    });

    let timer1 = setTimeout(() => setLoading(false), 3000);
    return () => {
      clearTimeout(timer1);
    };
  }, []);

  const signOut = () => {
    const { error } = supabase.auth.signOut();
    if (error) {
      console.error("There was an error", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        signUpNewUser,
        signOut,
        signIn,
        role,
        username,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("UserAuth must be used within an AuthContextProvider");
  }
  return context;
};
