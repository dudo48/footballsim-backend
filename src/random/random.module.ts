import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NameEntity } from './entities/name.entity';
import { RandomController } from './random.controller';
import { RandomService } from './random.service';

@Module({
  imports: [TypeOrmModule.forFeature([NameEntity])],
  controllers: [RandomController],
  providers: [RandomService],
})
export class RandomModule {}
