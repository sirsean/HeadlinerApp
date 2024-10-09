import { useEffect, useState } from "react";
import Gallery from '../components/Gallery';
import sortBy from 'sort-by';

function FullGallery() {
  const [all, setAll] = useState([]);

  useEffect(() => {
    fetch('/api/all')
      .then(res => res.json())
      .then(data => {
        data.metadata = data.metadata.sort(sortBy('-at'));
        return data;
      })
      .then(setAll);
  }, []);

  return (
    <Gallery items={all.metadata} />
  );
}

export default function GalleryPage() {
  return (
    <div className="GalleryPage">
      <FullGallery />
    </div>
  );
}