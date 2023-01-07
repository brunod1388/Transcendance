import React, { useState } from "react";

interface Icounter {
    counter: number;
}

function MyComponent(props: Icounter) {
    const [counter, setCounter] = useState(props.counter || 0);

    const onClickHandler = () => {
        setCounter(counter + 1);
    };

    return (
        <div>
            <p>Hello, {counter}</p>
            <button onClick={onClickHandler}>Click me!</button>
        </div>
    );
}
export default MyComponent;
