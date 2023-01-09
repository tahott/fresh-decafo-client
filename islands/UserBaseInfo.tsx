import { JSXInternal } from "https://esm.sh/v95/preact@10.11.0/src/jsx.d.ts";
import { useState } from "preact/hooks";
import { Channel, User } from "../utils/types.ts";
import Icon from "./Icon.tsx";

interface UserBaseProps {
  user: User;
  channel?: Channel[];
}

const CHANNELS = [
  {
    icon: 'mdi:github',
    name: 'github',
  },
  {
    icon: 'mdi:twitter',
    name: 'twitter',
  },
  {
    icon: 'mdi:instagram',
    name: 'instagram',
  },
  {
    icon: 'mdi:youtube',
    name: 'youtube',
  },
]

export default function UserBaseInfo({ user, channel: c }: UserBaseProps) {
  const [name, setName] = useState(user.name);

  const handleName = (e: Event) => {
    setName((e.currentTarget as HTMLInputElement).value);
  }

  const handleSetName = async (e: JSXInternal.TargetedMouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await fetch(`http://localhost:8082/user`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });
  }

  return (
    <div>
      <div class="grid grid-cols-4 grid-flow-col gap-4">
        <div class="row-span-3 flex justify-center">
          <div class="flex items-center"><img class="rounded-full max-w-[128px] w-[128px]" src={user.avatar_url} /></div>
        </div>
        <div class="col-span-3 flex items-center">
          <Icon icon="gridicons:nametag" />
          <input type="text" value={name} onInput={handleName} />
          <button onClick={handleSetName}>수정</button>
        </div>
        <div class="col-span-3">
          {
            CHANNELS.map((channel) => {
              return (
                <div class="grid grid-cols-7 items-center">
                  <div class="col-end-1"><Icon icon={channel.icon} /></div>
                  <div>{channel.name}</div>
                  <div class="col-start-2 col-end-7"><input class="w-full border p-1" value={c?.find(({ name }) => name === channel.name)?.url} /></div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}