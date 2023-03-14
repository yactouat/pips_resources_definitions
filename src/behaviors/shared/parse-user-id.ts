const parseUserId = (userId: string | number | null): number | null => {
  if (/^\d+$/.test(userId as string)) {
    return parseInt(userId as string);
  }
  return null;
};

export default parseUserId;
