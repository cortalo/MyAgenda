import supabase from "./supabase";

export async function getAgenda(date, userId) {
  // Get regular agenda items for the specific date
  const { data, error } = await supabase
    .from("agenda")
    .select("*")
    .eq("date", date)
    .eq("userId", userId)
    .eq("isRepeat", false);

  if (error) {
    console.log(error);
    throw new Error("Agenda could not be loaded");
  }

  // Get repeating agenda items - FIX: correct destructuring
  const { data: repeatData, error: repeatError } = await supabase
    .from("agenda")
    .select("*")
    .eq("userId", userId)
    .eq("isRepeat", true);

  if (repeatError) {
    console.log(repeatError);
    throw new Error("Repeat agenda could not be loaded");
  }

  // Filter repeat data based on date difference and actualRepeat
  const filteredRepeatData = repeatData.filter((item) => {
    const itemDate = new Date(item.date);
    const targetDate = new Date(date);

    // Calculate difference in days
    const diffTime = targetDate - itemDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // Check if difference is non-negative and divisible by actualRepeat
    return diffDays >= 0 && diffDays % item.actualRepeat === 0;
  });

  // Merge and return both datasets
  return [...data, ...filteredRepeatData];
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

export async function updateUserName(tableName, id, value) {
  const { data, error } = await supabase
    .from(tableName)
    .update({ name: value })
    .eq("id", id)
    .select();

  if (error) {
    console.log("Error updating data:", error);
    throw error;
  }

  return data;
}

export async function updateUserImage(tableName, id, value) {
  const { data, error } = await supabase
    .from(tableName)
    .update({ image: value })
    .eq("id", id)
    .select();

  if (error) {
    console.log("Error updating data:", error);
    throw error;
  }

  return data;
}
