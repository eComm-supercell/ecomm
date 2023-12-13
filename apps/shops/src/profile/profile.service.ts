import { Injectable } from '@nestjs/common';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { SystemUser } from '@libs/common/src/users/decorators/getuser.decorator';
import { PrismaService } from '@libs/common/src/prisma/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}
  async findOne(user: SystemUser) {
    return await this.prisma.profile.findUnique({
      where: { id: user.profileId },
    });
  }

  async update(user: SystemUser, updateProfileDto: UpdateProfileDto) {
    console.log('updateProfileDto', updateProfileDto);

    await this.prisma.profile.update({
      where: { id: user.profileId },
      data: {
        ...updateProfileDto,
      },
    });
    return { sucess: true };
  }
}
