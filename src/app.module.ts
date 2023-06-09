import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SimulationsModule } from './simulations/simulations.module';
import { NameEntity } from './teams/entities/name.entity';
import { TeamsModule } from './teams/teams.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: 'localhost',
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
        dropSchema: true,
      }),
    }),
    TeamsModule,
    SimulationsModule,
    TypeOrmModule.forFeature([NameEntity]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static port: string;
  constructor(configService: ConfigService) {
    AppModule.port = configService.get('PORT') || '5000';
  }
}
