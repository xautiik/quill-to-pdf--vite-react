import { useEffect, useRef, useState } from 'react';
import { pdfExporter } from 'quill-to-pdf';
import { saveAs } from 'file-saver';

function App() {
  const editorRef = useRef(null);
  const [quill, setQuill] = useState(null);

  // Load Quill from CDN once the component mounts
  useEffect(() => {
    const loadQuill = async () => {
      if (!window.Quill) {
        console.error('Quill is not loaded. Make sure you included the CDN.');
        return;
      }
      const quillInstance = new window.Quill('#editor', {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ size: ['small', 'normal', 'large', 'huge'] }],
            ['image', 'link'],
            [{ list: 'ordered' }, { list: 'bullet' }],
          ],
        },
      });
      setQuill(quillInstance);
    };

    setTimeout(loadQuill, 1500);
  }, []);

  // Export to PDF
  const exportPdf = async () => {
    if (!quill) return;
    const delta = quill.getContents();
    const blob = await pdfExporter.generatePdf(delta);
    saveAs(blob, 'quill-export.pdf');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2> Quill to PDF Export (React + Vite)</h2>
      <div id="editor" ref={editorRef} style={{ height: '300px' }}></div>
      <button
        onClick={exportPdf}
        style={{ marginTop: '15px', padding: '10px' }}
      >
        Export as PDF
      </button>
    </div>
  );
}

export default App;
