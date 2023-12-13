import {
  Controller,
  Get,
  // Post,
  Body,
  Patch,
  Param,
  UseGuards,
  // Delete,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
// import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
// import { apiExceptionResponse } from '@libs/common/src/exceptions/exception.decorator';
import { JwtGuard } from '@libs/common/src/auth/guard/jwt.guard';
// import { OldUser } from '@prisma/client';
// import { ProfileEntity } from './entity/profile.entity';

@Controller('profile')
@ApiTags('Profile')
@ApiBearerAuth()
@UseGuards(JwtGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  /**
   * Create profile for user.
   */
  // @Post()
  // @apiExceptionResponse()
  // @ApiCreatedResponse({
  //   description: 'The record has been successfully created.',
  //   type: ProfileEntity,
  // })
  // create(@getUser() user: OldUser, @Body() createProfileDto: CreateProfileDto) {
  //   return this.profileService.create(user, createProfileDto);
  // }

  // @Get()
  // findAll() {
  //   return this.profileService.findAll();
  // }

  /**
   * Get profile by id
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(+id);
  }

  /**
   * Update profile by id. Only Address, gender, mobile and date of birth can be updated.
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(+id, updateProfileDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.profileService.remove(+id);
  // }
}
