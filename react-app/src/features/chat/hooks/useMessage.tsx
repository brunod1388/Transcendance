import { useState, ChangeEvent } from "react";

export function useInput(
    initialValue: string,
    placeHolder: string,
    name: string,
    type: string,
    req: boolean
) {
    const [value, setValue] = useState<string>(initialValue);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };
    return {
        value,
        name,
        placeholder: placeHolder,
        type: type,
        required: req,
        onChange: handleChange,
    };
}

export default useInput;
