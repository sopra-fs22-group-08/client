import "styles/ui/ButtonRedGreen.scss";

export const ButtonRedGreen = props => (
  <buttonredgreen
    {...props}
    style={{width: props.width, ...props.style}}
    className={`primary-button ${props.className}`}>
    {props.children}
  </buttonredgreen>
);
