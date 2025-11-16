import Agendas from "../_components/Agendas";

function page() {
  return <Agendas />;
}

export default page;
export const dynamic = "force-dynamic";
export const revalidate = 0;
