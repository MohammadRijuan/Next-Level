"use client"

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LoginAction } from "../_actions/authActions";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const LoginForm = () => {

  const [state,action,pending] = useActionState(LoginAction,false)
  useEffect(()=>{

    if(!state) return;

    // if(state.success){
    //   toast.success(state.message || "Login successful")
    // }

    if(!state.success){
      toast.error(state.message || "Login failed")
    }
    
  },[state])
  return (
    <form action={action} >
        <Card className="p-5">
            <label>Email</label>
            <input name="email" type="email" placeholder="Enter your email" className="p-2 border rounded"/>
            <label>Password</label>
            <input name="password" type="password" placeholder="Enter your password" className="p-2 border rounded"/>
            <Button type="submit">
              {
                pending ? "Submitting..." : "Login"
              }
            </Button>
        </Card>
    </form>
  );
};

export default LoginForm;