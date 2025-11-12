import supabase from "./supabase";

export async function getAgenda(date) {
  const { data, error } = await supabase
    .from("agenda")
    .select("*")
    .eq("date", date);

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}
