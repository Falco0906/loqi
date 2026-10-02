import Image from "next/image";

/** Original product symbol and serif wordmark, as used in the Loqi sidebar. */
export default function LoqiBrand({ compact = false }: { compact?: boolean }) {
  return <span className="brand">
    <Image className="brand-dark" src="/loqi-symbol-dark.png" width={28} height={28} alt="" unoptimized />
    {!compact && <span className="wordmark">Loqi</span>}
  </span>;
}
