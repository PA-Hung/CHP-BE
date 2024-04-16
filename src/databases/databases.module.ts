import { Module } from '@nestjs/common';
import { DatabasesService } from './databases.service';
import { DatabasesController } from './databases.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { Permission, PermissionSchema } from 'src/permissions/schemas/permission.schema';
import { Role, RoleSchema } from 'src/roles/schemas/role.schema';
import { UsersService } from 'src/users/users.service';
import { Apartment, ApartmentSchema } from 'src/apartment/schemas/apartment.schema';


@Module({
  controllers: [DatabasesController],
  providers: [DatabasesService, UsersService],
  imports: [MongooseModule.forFeature([
    { name: User.name, schema: UserSchema },
    { name: Permission.name, schema: PermissionSchema },
    { name: Role.name, schema: RoleSchema },
    { name: Apartment.name, schema: ApartmentSchema },
  ])],
})
export class DatabasesModule { }
