import Head from 'next/head'

export default function Disclaimer() {
  return (
    <>
      <Head>
        <title>Isenção de responsabilidade - Hydra Theme Editor</title>
      </Head>
      <div className="max-w-2xl mx-auto p-8 space-y-4 bg-white text-gray-800">
        <h1 className="text-2xl font-bold">Isenção de responsabilidade</h1>
        <p>
          O Hydra Theme Editor é fornecido &quot;no estado em que se encontra&quot; como
          uma ferramenta experimental para personalização de temas do
          aplicativo Hydra. Nenhuma garantia é oferecida quanto ao
          funcionamento da ferramenta ou à adequação dos temas gerados.
        </p>
        <p>
          Ao utilizar o editor você reconhece que todo e qualquer impacto no
          funcionamento do Hydra ou de softwares associados é de sua
          exclusiva responsabilidade. Os mantenedores do projeto não se
          responsabilizam por perdas, danos ou prejuízos decorrentes da
          utilização do editor ou dos temas criados.
        </p>
        <p>
          Caso não esteja de acordo com estes termos, não utilize o Hydra Theme
          Editor.
        </p>
      </div>
    </>
  )
}
