import React, {useEffect, useState} from 'react';

interface Book {
	id: number,
	title: string,
	author: string,
	genre: string
}

function App() {
  
  const [data, setData] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [error, setError] = useState<any>();
  
  const loadAsyncData = async () => {
  
    setIsLoading(true);
    setError(null);
    
    try {
      const resp = await fetch('http://localhost:3000/books').then(r=>r.json());
      setData(resp);
      setIsLoading(false);
    } catch(e: any) {
      setError(e);
      setIsLoading(false);
    }
    
  }
  
  useEffect(() => {
    
    loadAsyncData();
    
  }, []);
  
    
  if(isLoading) return (<p>Loading...</p>);
  if(error) return (<p>Something went wrong</p>);
  if(data) return (
	<><h1>Bookssuper awesome</h1>
		<ul>
			{ data.map((element, index) => <li key={index}>{element.title}</li> ) }
		</ul>
	</>);
  return (<p>No data yet</p>);
    
}

export default App;
