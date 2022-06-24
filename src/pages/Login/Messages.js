import { ServiceResponses } from "./ServiceResponses";

export const ServiceResponse = {
  getMessage: (page, service) => {
    return ServiceResponses[page][service];
  },
};
