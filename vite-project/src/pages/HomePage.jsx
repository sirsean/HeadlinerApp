import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function getShuffledArray(n) {
  // Generate an array from 1 to n
  const array = Array.from({ length: n }, (_, i) => i + 1);

  // Shuffle the array using the Fisher-Yates algorithm
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }

  // Return the first 4 elements of the shuffled array
  return array.slice(0, 4);
}

export default function HomePage() {
  const [current, setCurrent] = useState(null);
  useEffect(() => {
    fetch('/api/current')
      .then(response => response.json())
      .then(setCurrent);
  }, []);
  
  return (
    <>
      <div className="HomePage">
        <h1>Headliner</h1>
        <p>Stay ahead of the curve with Headliner, the app that delivers the most important world news story every hour. Headliner analyzes breaking news from around the globe, choosing the top headline that matters most, right now. Whether it’s a global event, political shake-up, or cultural phenomenon, Headliner ensures you’re always informed.</p>
        <ul>
          <li><Link to="/recent">Recent</Link></li>
          <li><Link to="/gallery">Gallery</Link></li>
        </ul>
        <ul>
          <li><strong>Real-time Updates:</strong> Every hour, the most critical news story is selected and summarized just for you.</li>
          <li><strong>Dynamic Visuals:</strong> Each story is paired with a custom-generated image that captures its essence.</li>
          <li><strong>Stay Informed: Skip the noise and focus on the headline that truly impacts the world.</strong></li>
          <li><strong>AI Wackiness:</strong> This is AI doing the work, so sometimes it just makes some stuff up.</li>
        </ul>
        {current &&
          <div className="ViewPage">
            <img className="Token" src={`/image/${current.id}.png`} />
            <p className="Description">{current.summary}</p>
          </div>}
      </div>
    </>
  );
}
