import { useState } from 'react';

export default function Upload() {
  const [key, setKey] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    if (f && f.size > 32 * 1024 * 1024) {
      setError('O tamanho máximo é 32MB.');
      setFile(null);
    } else {
      setError('');
      setFile(f);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !key || !agreed) return;
    setLoading(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const base64 = (reader.result as string).split(',')[1];
        const formData = new FormData();
        formData.append('image', base64);
        const res = await fetch(
          `https://api.imgbb.com/1/upload?key=${encodeURIComponent(key)}`,
          {
            method: 'POST',
            body: formData,
          }
        );
        const data = await res.json();
        if (data?.data?.display_url) {
          setUrl(data.data.display_url);
          setError('');
        } else {
          setError('Falha ao enviar a imagem.');
          setUrl('');
        }
      } catch {
        setError('Erro ao enviar a imagem.');
        setUrl('');
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-xl mx-auto p-8 space-y-4">
      <h1 className="text-2xl font-bold">Upload de Imagem</h1>
      <p>
        Gere uma chave de API em{' '}
        <a
          href="https://api.imgbb.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          https://api.imgbb.com/
        </a>{' '}
        e insira no campo abaixo. Ao enviar a imagem você declara que leu e
        concorda com os termos de uso do imgbb.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Sua API key"
          className="w-full p-2 border rounded"
          required
        />
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <span>Li e concordo com os termos do imgbb</span>
        </label>
        <button
          type="submit"
          disabled={!file || loading || !agreed}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          {loading ? 'Enviando…' : 'Enviar'}
        </button>
      </form>
      {error && <p className="text-red-600">{error}</p>}
      {url && (
        <p className="break-all">
          URL da imagem: <a href={url}>{url}</a>
        </p>
      )}
    </div>
  );
}
