import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await fetch(
      'https://hydra-api-us-east-1.losbroxas.org/catalogue/hot?take=12&skip=0'
    );
    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: 'Failed to fetch Hydra data' });
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error('Error fetching Hydra data:', err);
    res.status(500).json({ error: 'Internal error' });
  }
}
