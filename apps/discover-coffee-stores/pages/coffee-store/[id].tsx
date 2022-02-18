import Link from 'next/link';
import { useRouter } from 'next/router';
import './index.module.scss';

/* eslint-disable-next-line */
export interface CoffeeStoreProps {}

export function CoffeeStore(props: CoffeeStoreProps) {
  const router = useRouter();
  return (
    <div>
      Coffee Store
      <Link href="/">
        <a>Back to Home</a>
      </Link>
      <Link href="/">
        <a>Go to page dynamic</a>
      </Link>
    </div>
  );
}

export default CoffeeStore;
