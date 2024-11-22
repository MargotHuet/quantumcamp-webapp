'use client'
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "../../../clientSupabase";

interface FormData {
  name: string, 
  email: string,
  password: string, 
  confirmPassword: string,
}

export default function Signup() {

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  console.log(formData)

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((prevFormData: any) => ({
        ...prevFormData,
        [name]:value,
    }));
  }

  async function handleSubmit(e: any) {
    e.preventDefault()

    try {
      const { data, error } = await supabase.auth.signUp(
        {
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              name: formData.name
            }
        }
      }
      )
    alert("Votre compte a été créer. Connectez-vous.")
  } catch (error) {
  console.log('Erreur')
  alert('check your mail box')
    }
  }

  return (
    <>
    <form onSubmit={handleSubmit}>
      <div className="flex h-screen">
        <div className="relative bg-blue-200 w-2/5">
          <div className="absolute flex justify-start top-24">
            <Link href={"/"}>
              <Image
                src="/assets/QuantumCamp.png"
                alt="QuantumCamp logo"
                width={1000}
                height={1000}
              />
            </Link>
          </div>
        </div>
        <div className="relative w-3/5">
          <div className="absolute flex flex-col gap-6 justify-end top-24 left-44">
            <h1 className="flex text-lg font-firaSans">Welcome!</h1>
            <p className="flex text-4xl font-firaSans">Create your account</p>
          </div>
          <div className="absolute flex flex-col justify-end top-48 left-44">
            <p className="text-sm text-gray-600 font-anekDeva">
              Already have an account?
              <Link href={"/login"} className="font-anekDeva text-blue-500 font-bold"> Login</Link>
            </p>
          </div>
          <div className="absolute flex flex-col gap-4 justify-end top-64 left-44">
            <label className="text-md font-firaSans">Your name</label>
            <input
              className="bg-blue-200 w-80 h-10"
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              value={formData.name}
              required
            />
            <label className="text-md font-firaSans">Email</label>
            <input
              className="bg-blue-200 w-80 h-10"
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              value={formData.email}
              required
            />
            <label className="text-md font-firaSans">Password</label>
            <input
              className="bg-blue-200 w-80 h-10"
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={formData.password}
              required
            />
            <label className="text-md font-firaSans">Confirm your password</label>
            <input
              className="bg-blue-200 w-80 h-10"
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleChange}
              value={formData.confirmPassword}
              required
            />
            <button
              className="text-md w-1/2 font-firaSans border border-orange-500 bg-orange-100 rounded-md"
              type="submit"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
      </form>
    </>
  )
}