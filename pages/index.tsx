import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { getGeolocation } from '../src/infra/gateways/getGeolocation'
import { IClient } from '../src/domain/entities/client'
import Home from '../src/ui/screens/Home'
import { clients } from '../src/ui/context'
import { getClients } from '../src/infra/gateways/getClients'
import useFormatNameCondition from '../src/ui/hooks/useFormatNameCondition'
import { ConditionName } from '../src/domain'

export default function Index({ propClients, data } : InferGetServerSidePropsType<typeof getServerSideProps>) {

  const [newClients, setClients] = useRecoilState(clients)

  if(newClients.length === 0){
    setClients(propClients)
  }

  console.log(data)

  return (
    <>
      <Head>
        <title>Georeferenciamento</title>
        <meta name="description" content="Mapa de georeferenciamento de pacientes" />
      </Head>
      <Home/>
    </>
  )
}

export const getServerSideProps : GetServerSideProps = async () => {

  const formatNameCondition = useFormatNameCondition()
  const data = await getClients()

  const propClients : IClient[] = [
    {
      id: "434324324",
      name: "Algum Nome",
      cpf: "434234324324",
      bornYear: 2005,
      age: 17,
      condition:[ {
        name: ConditionName.OVERWEIGHT,
      }],
      address: {
        street: "Rua Francisco Rodrigues Seckler",
        number: 111,
        city: "São Paulo"
      },
      geolocation: await getGeolocation("Rua Francisco Rodrigues Seckler", 111,  "São Paulo")
    },
    {
      id: "4347676724",
      name: "Outro Nome",
      cpf: "434234324324",
      bornYear: 2005,
      age: 17,
      condition:[ {
        name: ConditionName.DIABETES,
      }],
      address: {
        street: "Rua Victorio Santim",
        number: 86,
        city: "São Paulo"
      },
      geolocation: await getGeolocation("Rua Victorio Santim", 3086,  "São Paulo")
    },
    {
      id: "5654553112",
      name: "Julio Ruan",
      cpf: "788956321245",
      bornYear: 2000,
      age: 23,
      condition:[{
        name: ConditionName.OBESETY_LEVEL_THREE,
      }],
      address: {
        street: "Rua Virginia Ferni",
        number: 400,
        city: "São Paulo"
      },
      geolocation: await getGeolocation("Rua Virginia Ferni", 400,  "São Paulo")
    }
  ]

  return {
    props: {
      propClients,
      data
    }
  }
}
