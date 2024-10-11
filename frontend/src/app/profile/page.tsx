'use client';
import React, { useState, useEffect } from "react";
import { supabase } from "../../../../shared/clientSupabase";
import { Session } from "@supabase/supabase-js"; 


export default function Profile() {
    const [session, setSession] = useState<Session | null>(null); 

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };

    getSession();
   })

    return (
        <>
            {session ? (
            <>
                <p>User profile page</p>
            </>
          ) : (
            <>
             <p>You must be logged in to see this page&apos;s content.</p> 
            </>
          )}
        </>
    )
}