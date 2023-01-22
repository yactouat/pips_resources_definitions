export type APIResponseType = {
  msg: string;
  data: {}[] | {} | null;
};

export type BuildResourceStateType = "ERROR" | "READY" | "MASKED";
