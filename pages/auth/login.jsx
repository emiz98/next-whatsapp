import React from "react";
import Head from "next/head";
import { getProviders, signIn as SignIntoProvider } from "next-auth/react";
import { Button } from "@mui/material";

const login = ({ providers }) => {
  return (
    <div className="h-screen flex justify-center items-center bg-hero">
      <Head>
        <title>WhatsApp 1.0</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/whatsapp.ico" />
      </Head>
      <div className="flex flex-col justify-center">
        <img
          className="w-36 mx-auto mb-8 object-contain"
          src="/whatsapp.ico"
          alt=""
        />
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <Button
              className="text-white bg-green-500 hover:bg-green-600 px-5 py-2"
              onClick={() =>
                SignIntoProvider(provider.id, { callbackUrl: "/" })
              }
            >
              Sign in with {provider.name}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default login;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
