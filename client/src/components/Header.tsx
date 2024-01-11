type THeader = {
  className: string;
  txt: string;
  key?: string;
};
export default function Header(props: THeader) {
  return (
    <span className={props.className} key={props.key}>
      {props.txt}
    </span>
  );
}
