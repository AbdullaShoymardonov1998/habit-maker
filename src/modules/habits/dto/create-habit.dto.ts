import { ApiProperty } from '@nestjs/swagger'
import { Weekday } from '@prisma/client'
import { Type } from 'class-transformer'
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator'

export class WeekdaysDto {
  @IsEnum(Weekday)
  @ApiProperty({ description: 'Weekday', enum: Weekday })
  weekday: Weekday

  @IsBoolean()
  @ApiProperty({ description: 'Selected value', type: Boolean })
  isSelected: boolean
}

export class RepetitionDto {
  @IsArray()
  @ArrayMinSize(7)
  @ArrayMaxSize(7)
  @Type(() => WeekdaysDto)
  @ValidateNested({ each: true })
  @ApiProperty({
    description: 'Weekdays',
    type: [WeekdaysDto],
    example: [
      {
        weekday: Weekday.MONDAY,
        isSelected: false,
      },
      {
        weekday: Weekday.THURSDAY,
        isSelected: false,
      },
      {
        weekday: Weekday.WEDNESDAY,
        isSelected: false,
      },
      {
        weekday: Weekday.THURSDAY,
        isSelected: false,
      },
      {
        weekday: Weekday.FRIDAY,
        isSelected: false,
      },
      {
        weekday: Weekday.SATURDAY,
        isSelected: false,
      },
      {
        weekday: Weekday.SUNDAY,
        isSelected: false,
      },
    ],
  })
  weekdays: WeekdaysDto[]

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    description: 'Number of Days',
    example: 7,
    default: 0,
  })
  numberOfDays: number

  @IsString()
  @ApiProperty({
    description: 'Notification Time',
    example: '12:30',
  })
  notifyTime: string

  @IsBoolean()
  @ApiProperty({
    description: 'Show Notification',
    example: true,
  })
  showNotification: boolean
}

export class CreateHabitDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Name',
    required: true,
    example: 'No sugar',
  })
  title: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Color',
    required: true,
    example: '1',
  })
  color: string

  @Type(() => RepetitionDto)
  @ValidateNested({ each: true })
  @ApiProperty({
    description: 'Repetition',
    type: RepetitionDto,
  })
  repetition: RepetitionDto
}

export class UpdateHabitDto extends CreateHabitDto {}
