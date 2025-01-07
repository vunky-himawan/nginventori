import { CustomException, FieldErrorType } from "@/types/custom-exception";

export class NotFoundException extends CustomException {
  constructor(message: string, errors?: Array<FieldErrorType>) {
    super(404, message, errors || []);
    this.name = "NotFoundException";
  }
}

export default NotFoundException;
