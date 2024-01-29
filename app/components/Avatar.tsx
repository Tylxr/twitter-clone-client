interface AvatarProps {
    size: "small" | "medium" | "large" | "huge";
    initial?: string;
    classOverride?: string;
}

export default function Avatar({ size, initial, classOverride }: AvatarProps) {
    classOverride ??= "";
    let sizePx: number, fontSize: number, colour: string;
    switch (size) {
        case "small":
            sizePx = 30;
            fontSize = 0;
            colour = "#d4d4d8";
            break;
        case "medium":
            sizePx = 45;
            fontSize = 16;
            colour = "#0369a1";
            break;
        case "large":
            sizePx = 80;
            fontSize = 26;
            colour = "#065f46";
            break;
        case "huge":
            sizePx = 160;
            fontSize = 50;
            colour = "#3f3f46";
            break;
    }

    return (
        <div
            className={"rounded-full xs:flex flex flex-row justify-center items-center " + classOverride}
            style={{
                minHeight: sizePx,
                height: sizePx,
                minWidth: sizePx,
                width: sizePx,
                backgroundColor: colour,
            }}
        >
            <span className="font-bold text-white" style={{ fontSize }}>
                {initial}
            </span>
        </div>
    );
}
