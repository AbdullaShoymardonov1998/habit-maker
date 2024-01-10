import { Body, Controller, HttpStatus, Post } from '@nestjs/common'
import { AuthService } from '@/modules/auth/auth.service'
import { LoginDto } from '@/modules/auth/dto/login.dto'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { LoginResponseDto } from '@/modules/auth/dto/login-response.dto'
import { LoginWrongPasswordDto } from '@/modules/auth/dto/login-wrong-password.dto'
import { UserNotFoundDto } from '@/modules/auth/dto/user-not-found.dto'
import {
  GenerateLinkDto,
  GenerateLinkResposeDto,
} from '@/modules/auth/dto/generate-link.dto'
import {
  RestoreAccountDto,
  RestoreAccountErrorResponseDto,
  RestoreAccountResponseDto,
} from '@/modules/auth/dto/restore-account.dto'
import {
  GenerateRegistrationOtp,
  VerifyRegistrationOtp,
} from '@/modules/auth/dto/registration.dto'
import { RefreshTokenDto } from '@/modules/auth/dto/refresh-token.dto'

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('login')
  @ApiTags('Sign in')
  @ApiOperation({ summary: 'Login into system' })
  @ApiResponse({ status: HttpStatus.CREATED, type: LoginResponseDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: LoginWrongPasswordDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, type: UserNotFoundDto })
  login(@Body() body: LoginDto): Promise<LoginResponseDto> {
    return this.service.login(body)
  }

  @Post('refresh-token')
  @ApiTags('Refresh token')
  @ApiOperation({ summary: 'Get new access token by sending refresh token' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: LoginWrongPasswordDto })
  refreshToken(@Body() body: RefreshTokenDto) {
    return this.service.refreshToken(body)
  }

  @Post('restore/generate-link')
  @ApiTags('Restore password')
  @ApiOperation({ summary: '1-step: Generate restore account link' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, type: UserNotFoundDto })
  @ApiResponse({ status: HttpStatus.CREATED, type: GenerateLinkResposeDto })
  generateRestoreLink(
    @Body() body: GenerateLinkDto,
  ): Promise<GenerateLinkResposeDto> {
    return this.service.generateRestoreLink(body)
  }

  @Post('restore/password')
  @ApiTags('Restore password')
  @ApiOperation({ summary: '2-step: Restore user account' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: RestoreAccountErrorResponseDto,
  })
  @ApiResponse({ status: HttpStatus.CREATED, type: RestoreAccountResponseDto })
  restoreAccount(@Body() body: RestoreAccountDto) {
    return this.service.restoreAccount(body)
  }

  @Post('registration/otp')
  @ApiTags('Registration')
  @ApiOperation({ summary: '1-step: Generate registration OTP' })
  generateRegistrationOtp(@Body() body: GenerateRegistrationOtp) {
    return this.service.generateRegistrationOtp(body)
  }

  @Post('registration/verify')
  @ApiTags('Registration')
  @ApiOperation({ summary: '2-step: Verify registration OTP' })
  verifyRegistrationOtp(@Body() body: VerifyRegistrationOtp) {
    return this.service.verifyRegistrationOtp(body)
  }
}
