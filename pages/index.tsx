import Head from 'next/head'
import { useSetRecoilState } from 'recoil'
import { IClient } from '../src/interfaces/client'
import Main from '../src/screens/Index'
import { clients } from '../src/state/clients'

export default function Home() {

  return (
    <>
      <Head>
        <title>Georeferenciamento</title>
        <meta name="description" content="Mapa de georeferenciamento de pacientes" />
      </Head>
      <Main/>
    </>
  )
}
