import Avatar from '@mui/material/Avatar';

const initial = (str) => str ? str.split(" ").map(x => x[0]).join("") : "?";

const stringToHslColor = (str = "", saturation = 30, lightness = 80) => {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    var hue = hash % 360;
    return `hsl(${hue},${saturation}%,${lightness}%)`;
}

const ColoredAvatar = (props) => {

    const name = props.name;

    return <Avatar sx={{ bgcolor: stringToHslColor(name) }}>{initial(name)}</Avatar>;
}

export default ColoredAvatar;