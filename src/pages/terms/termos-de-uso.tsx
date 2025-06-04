import Head from 'next/head'

export default function TermosDeUso() {
  return (
    <>
      <Head>
        <title>Termos de Uso - Hydra Theme Editor</title>
      </Head>
      <div className="max-w-2xl mx-auto p-8 space-y-4 bg-white text-gray-800">
        <h1 className="text-2xl font-bold">Termos de Uso</h1>
        <p>
          Este documento descreve as condições para utilização do Hydra Theme
          Editor. Ao utilizar a ferramenta, você concorda em respeitar todos os
          termos aqui estabelecidos.
        </p>
        <p>
          O editor destina-se apenas à criação e experimentação de temas do
          aplicativo Hydra. É proibida a utilização da ferramenta para fins
          ilegais ou que violem direitos de terceiros.
        </p>
        <p>
          O código e os temas produzidos através do Hydra Theme Editor podem ser
          utilizados livremente, desde que mantidos os devidos créditos aos
          autores originais e ao projeto.
        </p>
      </div>
    </>
  )
}
