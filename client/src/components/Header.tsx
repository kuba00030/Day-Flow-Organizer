type THeader = {
  className: string;
  txt: string;
};
export default function Header(props: THeader) {
  return <span className={props.className}>{props.txt}</span>;
}
