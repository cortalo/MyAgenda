import supabase from "./supabase";

export async function getAgenda(date, userId) {
  const { data, error } = await supabase
    .from("agenda")
    .select("*")
    .eq("date", date)
    .eq("userId", userId);

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function getAgendaById(id) {
  const { data, error } = await supabase
    .from("agenda")
    .select("*")
    .eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function getUser(email) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email);

  if (error) {
    console.log(error);
    throw new Error("Users could not be loaded");
  }

  return data;
}

export async function insertData(tableName, dataObject) {
  const { data, error } = await supabase.from(tableName).insert([dataObject]);

  if (error) {
    console.log("Error inserting data:", error);
    throw error;
  }

  return data;
}
