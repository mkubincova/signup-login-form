import React from 'react';


function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div className="App">
      <p>{!data ? "Loading..." : data.name}</p>
    </div>
  );
}

export default App;
