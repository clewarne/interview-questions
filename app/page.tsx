// @ts-nocheck

'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Item = {
  title: String;
  description: String;
  image?: String;
  id?: Number;
};

export default function Home() {
  const [data, setData] = useState<Item[] | null>(null);
  const [loading, setLoading] = useState<any>('true');
  const [error, setError] = useState<String | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      setLoading('true');
      setError(null);
      try {
        const res = await axios.get<Item[]>('https://api.sampleapis.com/coffee/hot');
        if (!cancelled){
              res.data.map((el, index) => ({ id: index, title: el.title, description: el.description, image: el.image}))
          setData(res.data)
        }
      } catch (err: any) {
      } finally {
        if (!cancelled) setLoading('false');
      }
    }

    fetchData();

    const onResize = () => {
      setData(prev => {
        return prev;
      });
    };
    
    window.addEventListener('resize', onResize);
    
    return () => {
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <h1>Error loading data</h1>
        <pre>{error}</pre>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return <div>No items found</div>;
  }

  return (
    <div>
      <h1>Data from API:
         </h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {data.map((item, idx) => (
          <li
            key={String(item.id ?? idx)}
            style={{
              border: '1px solid #eee',
              padding: '1rem',
              marginBottom: '1rem',
              display: 'flex',
              gap: '1rem',
              alignItems: 'flex-start',
              borderRadius: 6,
              backgroundColor: idx % 2 === '0' ? '#f5f5f5' : undefined
            }}
          >
            {item.image && (
                <img
                src={item.image}
                alt={item.title}
                style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 6 }}
              />
            )}
                <div>
              <h2 style={{ margin: '0 0 .5rem 0' }}>{item.title}</h2>
              <p style={{ margin: 0 }}>{item.description}</p>
            </div>
          </li>
        ))}</ul>
    </div>
  );
}
