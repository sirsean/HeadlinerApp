import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

async function fetchMetadata({ id, setMetadata, setError, setLoading }) {
  setLoading(true);
  return fetch(`/metadata/${id}.json`)
    .then(async (res) => {
      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || res.statusText);
      }
      return res.json();
    })
    .then(setMetadata)
    .catch(setError)
    .finally(() => setLoading(false));
}

export default function ViewPage() {
  const { id } = useParams();
  const [metadata, setMetadata] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMetadata({ id, setMetadata, setError, setLoading });
  }, [id]);

  if (loading) {
    return <div className="Loading">Loading...</div>;
  }

  if (!metadata) {
    return;
  }

  return (
    <div className="ViewPage">
      <h1>{metadata.at}</h1>
      <img className="Token" src={`/image/${id}.png`} />
      <p className="Description">{metadata.summary}</p>
    </div>
  );
}