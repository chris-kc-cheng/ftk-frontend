import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css'

const Markdown = () => {
  const [data, setData] = useState([]);
  const getContents = () => {
    fetch("http://127.0.0.1:5000/notes/all")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
  }
  useEffect(() => {
    getContents()
  }, []);
  return (
    <>
      <Button variant="contained" onClick={() => {
        fetch("http://127.0.0.1:5000/notes/new", {
          method: "POST",
          headers: {            
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({content: "Some text 😋"})
        })
      }}>Click to add
      </Button>
      {data.map(note =>
        <div>
          <Markdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>{note.content}</Markdown>
        </div>
      )}
    </>
  );
}

export default Markdown;
