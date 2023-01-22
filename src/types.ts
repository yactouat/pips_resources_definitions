export type APIResponseType = {
  msg: string;
  data: {}[] | {} | null;
};

export type BuildStateType = "ERROR" | "READY" | "MASKED";
