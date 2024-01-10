import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { GetUserResponseDto } from '@/modules/users/dto/get-user.dto'
import { UsersRepository } from '@/modules/users/users.repository'
import { HTTP_MESSAGES } from '@/consts/http-messages'
import { HabitsService } from '@/modules/habits/habits.service'

@Injectable()
export class UsersService {
  constructor(
    private readonly repository: UsersRepository,
    private readonly habitService: HabitsService,
  ) {}

  async getUser(userId: string): Promise<GetUserResponseDto> {
    const user = await this.repository.getUser(userId)

    if (!user) {
      throw new HttpException(
        HTTP_MESSAGES.RESTORE_LINK_TOKEN_NOT_FOUND,
        HttpStatus.BAD_REQUEST,
      )
    }
    delete user.password

    return user
  }

  async deleteUser(userId: string) {
    await this.getUser(userId)
    const { habits } = await this.habitService.getHabits(userId)

    for (const habit of habits) {
      await this.habitService.deleteHabit(habit.id, userId)
    }

    await this.repository.deleteUser(userId)
    return { message: HTTP_MESSAGES.USER_DELETED }
  }
}
