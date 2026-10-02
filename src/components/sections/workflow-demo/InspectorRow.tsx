/** Presentational row adapted from the product's DraftReviewWorkspace.
 * Kept local so the marketing demo has no authenticated product dependencies. */
export default function InspectorRow({ label, value }: { label: string; value: string }) {
  if (!value || value === "—") return null;
  return <div className="inspector-row"><dt>{label}</dt><dd>{value}</dd></div>;
}
