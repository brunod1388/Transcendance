import style from "./SubmitButton.module.css";

interface SubmitProps {
    name: string;
    handleClick(): void;
    divStyle?: string;
    fill?: boolean;
}

function SubmitButton(props: SubmitProps) {
    const { name, handleClick, divStyle = "", fill = false } = props;

    return (
        <div className={divStyle + (fill ? " " + style.width100 : "")}>
            <button
                className={
                    style.shadow_btn + (fill ? " " + style.width100 : "")
                }
                onClick={handleClick}
            >
                {name}
            </button>
        </div>
    );
}

export default SubmitButton;
