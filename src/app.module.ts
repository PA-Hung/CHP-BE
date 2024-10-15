import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';
import { FilesModule } from './files/files.module';
import { DatabasesModule } from './databases/databases.module';
import { AccommodationModule } from './accommodation/accommodation.module';
import { ExcelModule } from './excel/excel.module';
import { PermissionsModule } from './permissions/permissions.module';
import { RolesModule } from './roles/roles.module';
import { ApartmentModule } from './apartment/apartment.module';
import { MotorsModule } from './motors/motors.module';
import { GuestsModule } from './guests/guests.module';
import { BookingsModule } from './bookings/bookings.module';
import { PaymentsModule } from './payments/payments.module';
import { Schema } from 'mongoose';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URL'),
        connectionFactory: (connection: { plugin: (arg0: (schema: Schema) => void) => void; }) => {
          connection.plugin(softDeletePlugin);
          return connection;
        }
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    FilesModule,
    DatabasesModule,
    AccommodationModule,
    ExcelModule,
    PermissionsModule,
    RolesModule,
    ApartmentModule,
    MotorsModule,
    GuestsModule,
    BookingsModule,
    PaymentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule { }
