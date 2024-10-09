import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import './Gallery.css';

export default function Gallery({ items }) {
  const observer = useRef(null);

  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          observer.current.unobserve(img);
        }
      });
    });

    const imgs = document.querySelectorAll("img[data-src]");
    imgs.forEach(img => {
      observer.current.observe(img);
    });

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [items]);

  if (!items) {
    return;
  }
  
  return (
    <div className="gallery">
      {items.map(({ id, at }) => (
        <div key={id} className="thumbnail-container">
          <Link to={`/view/${id}`}>
            <img
              data-src={`/thumb/${id}.png`}
              className="thumbnail"
              />
            <div className="overlay">{new Date(at).toISOString().split('T')[0]}</div>
          </Link>
        </div>
      ))}
    </div>
  );
}