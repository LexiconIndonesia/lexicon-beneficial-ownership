import { type Return } from '@/types/returns'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default async function Await<T> ({
  promise,
  children
}: {
  promise: Promise<Return<T>>
  children: (value: Return<T>) => JSX.Element
}) {
  const data = await promise
  if (data != null) {
    return children(data)
  }
}
