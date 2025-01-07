import { CustomException, FieldErrorType } from "@/types/custom-exception";

export class UnprocessableEntityException extends CustomException {
  constructor(message: string, errors?: Array<FieldErrorType>) {
    super(422, message, errors || []);
    this.name = "UnprocessableEntityException";
  }
}

export default UnprocessableEntityException;
