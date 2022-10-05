import { useEffect } from 'preact/hooks';

interface ReplaceProps {
  path: string,
}

export default function Replace(props: ReplaceProps) {
  useEffect(() => {
    location.replace(props.path)
  });

  return (
    <>
      <div></div>
    </>
  )
}