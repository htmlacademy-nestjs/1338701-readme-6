import { BadRequestException } from '@nestjs/common'
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'

@ValidatorConstraint({ name: 'TagArray', async: false })
export class TagArrayValidator implements ValidatorConstraintInterface {
  validate(tags: string[], args: ValidationArguments) {
    if (!tags) {
      return true // Пустые теги разрешены
    }

    // Проверка на максимальное количество тегов
    if (tags.length > 8) {
      throw new BadRequestException('Maximum number of tags exceeded (8)')
    }

    return true
  }
}
