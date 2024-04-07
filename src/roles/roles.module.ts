import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from './schemas/role.schema';
import { User, UserSchema } from 'src/users/schemas/user.schema';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService],
  imports: [MongooseModule.forFeature([
    { name: Role.name, schema: RoleSchema },
    { name: User.name, schema: UserSchema },]
  )],
})
export class RolesModule { }
