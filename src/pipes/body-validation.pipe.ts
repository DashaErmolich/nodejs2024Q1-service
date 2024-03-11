import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ValidationError, validate } from 'class-validator';
import { ValidationException } from 'src/exeptions/validation.exeption';

@Injectable()
export class BodyValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const obj = plainToClass(metadata.metatype, value);
    const errors: ValidationError[] = await validate(obj);

    if (errors.length) {
      const messages = errors
        .filter((err) => err.constraints.hasOwnProperty('isNotEmpty'))
        .map((err) => {
          return `${err.property}`;
        })
        .join(', ');
      throw new ValidationException(
        'Bad request. body does not contain required fields: ' + messages,
      );
    }
    return value;
  }
}
