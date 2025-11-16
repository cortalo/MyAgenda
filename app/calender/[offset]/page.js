import Agendas from "@/app/_components/Agendas";

function page({ params }) {
  return <Agendas params={params} />;
}

export default page;
export const dynamic = "force-dynamic";
export const revalidate = 0;
