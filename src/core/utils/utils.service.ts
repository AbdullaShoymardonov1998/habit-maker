import * as bcrypt from 'bcrypt'
import { Injectable } from '@nestjs/common'
import { PASSWORD_SALT } from '@/consts/password-salt'
import { OTP_VALID_DURATION_MINUTES } from '@/consts/registration'

@Injectable()
export class UtilsService {
  generateBcrypt = async (password: string) => {
    return bcrypt.hash(password, PASSWORD_SALT)
  }

  compareHash = async (password: string, hash: string): Promise<boolean> => {
    return bcrypt.compareSync(password, hash)
  }

  generateOtp(): string {
    let otp = ''
    for (let i = 0; i < 6; i++) {
      otp += Math.floor(Math.random() * 100) % 10
    }
    return otp
  }

  isOtpExpired(createdAt: Date): boolean {
    return (
      (new Date().getTime() - createdAt.getTime()) / (60 * 1000) >
      OTP_VALID_DURATION_MINUTES
    )
  }
}
