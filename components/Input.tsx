import { JSXInternal } from "https://esm.sh/v95/preact@10.11.0/src/jsx.d.ts";

interface InputProps {
  type?: string;
  value?: string;
  placeholder?: string;
  maxLength?: number;
  onChange: JSXInternal.GenericEventHandler<HTMLInputElement>;
}

export default function Input({ onChange, ...props }: InputProps) {
  return (
    <input
      class="ml-2 border w-full p-1"
      onInput={onChange}
      {...props}
    />
  )
}