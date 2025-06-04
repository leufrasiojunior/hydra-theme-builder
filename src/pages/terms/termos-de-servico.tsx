import Head from 'next/head'

export default function TermosDeServico() {
  return (
    <>
      <Head>
        <title>Termos de Serviço - Hydra Theme Editor</title>
      </Head>
      <div className="max-w-2xl mx-auto p-8 space-y-4 bg-white text-gray-800">
        <h1 className="text-2xl font-bold">Termos de Serviço</h1>
        <p>
          Os Termos de Serviço regulam o acesso e a prestação dos recursos
          oferecidos pelo Hydra Theme Editor. Ao continuar utilizando o editor,
          você concorda com estas condições.
        </p>
        <p>
          Os desenvolvedores poderão modificar ou descontinuar o editor a
          qualquer momento, sem notificação prévia. Não há garantia de
          disponibilidade ou de suporte técnico.
        </p>
        <p>
          Estes Termos de Serviço são complementares aos Termos de Uso e à
          Isenção de Responsabilidade.
        </p>
      </div>
    </>
  )
}
