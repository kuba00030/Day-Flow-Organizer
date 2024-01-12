type THeader = {
  className: string;
  txt: string;
  keyProp?: string;
};
export default function Header(props: THeader) {
  return (
    <span className={props.className} key={props.keyProp}>
      {props.txt[0].toUpperCase() + props.txt.slice(1)}
    </span>
  );
}
