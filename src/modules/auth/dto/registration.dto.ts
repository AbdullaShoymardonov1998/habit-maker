import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class GenerateRegistrationOtp {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ description: 'Email', example: 'user@mail.com' })
  email: string

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @ApiProperty({
    description: 'Password, minimum length 6',
    example: 'password',
  })
  password: string
}

export class VerifyRegistrationOtp {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Token which taken from generate Otp request',
    example: 'uuid',
  })
  token: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'OTP', example: '123456' })
  otp: string
}
