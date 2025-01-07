import { CustomException, FieldErrorType } from "@/types/custom-exception";

export class BadRequestException extends CustomException {
  constructor(message: string, errors?: Array<FieldErrorType>) {
    super(400, message, errors || []);
    this.name = "BadRequestException";
  }
}

export default BadRequestException;
