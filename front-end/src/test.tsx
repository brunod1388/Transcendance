import React, { useState } from 'react';

function MyComponent(props: any) {
	const [counter,setCounter] = useState(props.counter || 0);

	const onClickHandler = (e: any) => {
		setCounter(counter+1);
	  }
	  
	  return (
		<div>
		  <p>Hello, {counter}</p>
		  <button onClick={onClickHandler}>Click me!</button>
		</div>
	  );
}
export default MyComponent;