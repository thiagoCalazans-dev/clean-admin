
export default async function Contract({
  params,
}: {
  params: { contractId: string, amendmentId: string };
}) {
    return (
      <>
        <div>{params.contractId}</div>
        <div>{params.amendmentId}</div>;
      </>
    );}