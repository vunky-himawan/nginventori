export const getNameInitials = (name: string | null | undefined) => {
  if (!name) {
    return "";
  }

  const words = name.trim().split(" ");
  return (words[0][0] + (words[1]?.[0] || "")).toUpperCase();
};
