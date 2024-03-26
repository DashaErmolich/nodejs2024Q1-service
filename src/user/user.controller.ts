import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  ParseUUIDPipe,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user-password.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly dataService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.dataService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.dataService.findAll();
  }

  @Get(':id')
  @UsePipes(ParseUUIDPipe)
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.dataService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: UpdatePasswordDto,
  ) {
    return this.dataService.updateUserPassword(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @UsePipes(ParseUUIDPipe)
  remove(@Param('id') id: string) {
    return this.dataService.remove(id);
  }
}
