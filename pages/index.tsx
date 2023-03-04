import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import { useSetRecoilState } from 'recoil'
import { Filters } from '../src/enums/filter'
import { getGeolocation } from '../src/gateways/getGeolocation'
import { IClient } from '../src/interfaces/client'
import Home from '../src/screens/Home'
import { clients } from '../src/state/clients'

export const getServerSideProps : GetServerSideProps = async () => {

  const propClients : IClient[] = [
    {
      id: "434324324",
      name: "Algum Nome",
      cpf: "434234324324",
      bornYear: 2005,
      age: 17,
      condition:[ {
        name: Filters.ADHD,
      }],
      address: {
        street: "Rua Francisco Rodrigues Seckler",
        number: 111,
        city: "São Paulo"
      },
      geolocation: await getGeolocation( "Rua Francisco Rodrigues Seckler", 111,  "São Paulo")
    },
    {
      id: "4347676724",
      name: "Outro Nome",
      cpf: "434234324324",
      bornYear: 2005,
      age: 17,
      condition:[ {
        name: Filters.DIABETES,
      }],
      address: {
        street: "Rua Victorio Santim",
        number: 86,
        city: "São Paulo"
      },
      geolocation: await getGeolocation("Rua Victorio Santim", 3086,  "São Paulo")
    }
  ]

  return {
    props: {
      propClients
    }
  }
}

export default function Index({ propClients } : InferGetServerSidePropsType<typeof getServerSideProps>) {

  //console.log(propClients)
  //const setClients = useSetRecoilState(clients)
 // setClients(propClients)

  return (
    <>
      <Head>
        <title>Georeferenciamento</title>
        <meta name="description" content="Mapa de georeferenciamento de pacientes" />
      </Head>
      <Home filteredClients={propClients}/>
    </>
  )
}
