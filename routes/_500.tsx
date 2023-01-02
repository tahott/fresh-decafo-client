import { ErrorPageProps } from "$fresh/server.ts";

export default function Error500Page({}: ErrorPageProps) {
  return (
    <div>500 Internal Error.</div>
  )
}