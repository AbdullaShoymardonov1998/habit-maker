import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { IUser } from '@/modules/users/dto/user.interface'

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): IUser => {
    const request = ctx.switchToHttp().getRequest()
    return request.user
  },
)
