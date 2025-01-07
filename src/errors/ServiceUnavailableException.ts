import { CustomException, FieldErrorType } from "@/types/custom-exception";

export class ServiceUnavailableException extends CustomException {
  constructor(message: string, errors: Array<FieldErrorType>) {
    super(405, message, errors || []);
    this.name = "ServiceUnavailableException";
  }
}

export default ServiceUnavailableException;
