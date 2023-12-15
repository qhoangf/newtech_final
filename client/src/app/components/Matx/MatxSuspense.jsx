import { Suspense } from 'react';
import { MatxLoading } from 'app/components/common/others';

const MatxSuspense = ({ children }) => {
  return <Suspense fallback={<MatxLoading />}>{children}</Suspense>;
};

export default MatxSuspense;
