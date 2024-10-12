import { useEffect, useState } from "react";

function RecentView() {
  const [recent, setRecent] = useState([]);
  const [index, setIndex] = useState(0);
  const [metadata, setMetadata] = useState(null);

  useEffect(() => {
    const fetchRecentData = () => {
      fetch('/api/recent')
        .then(res => res.json())
        .then(setRecent);
    }

    fetchRecentData(); // Fetch initially

    const intervalId = setInterval(fetchRecentData, 600000); // Refresh every 10 minutes

    return () => clearInterval(intervalId); // Clean up on unmount
  }, []);

  useEffect(() => {
    if (recent.length > 0) {
      const intervalId = setInterval(() => {
        setIndex(prevIndex => (prevIndex + 1) % recent.length);
      }, 30000);

      return () => clearInterval(intervalId);
    }
  }, [recent]);

  useEffect(() => {
    if (recent.length > 0) {
      setMetadata(recent[index]);
    }
  }, [index, recent]);

  if (!metadata) {
    return;
  }

  return (
    <div className="ViewPage">
      <img className="Token" src={`/image/${metadata.id}.png`} />
      <p className="Description">{metadata.summary}</p>
    </div>
  );
}

export default function RecentPage() {
  return (
    <div className="RecentPage">
      <RecentView />
    </div>
  );
}