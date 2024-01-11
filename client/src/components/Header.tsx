type THeader = {
  className: string;
  txt: string;
  key?: string;
};
export default function Header(props: THeader) {
  return (
    <span className={props.className} key={props.key}>
      {props.txt[0].toUpperCase() + props.txt.slice(1)}
    </span>
  );
}
