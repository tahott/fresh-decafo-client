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
  return (
    <div>
      <div class="grid grid-cols-4 grid-flow-col gap-4">
        <div class="row-span-3 flex justify-center">
          <div class="flex items-center"><img class="rounded-full max-w-[128px] w-[128px]" src={user.avatar_url} /></div>
        </div>
        <div class="col-span-3 flex items-center">
          <Icon icon="gridicons:nametag" />
          <input class="border p-1" value={name} />
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