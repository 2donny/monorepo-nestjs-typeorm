import { UserName } from './UserName';
import { User } from './User.entity';
import { createQueryBuilder, EntityRepository, Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';

@EntityRepository(User)
export class UserQueryRepository extends Repository<User> {
  async findUserName(userId: number): Promise<UserName> {
    const queryBuilder = createQueryBuilder()
      .select(['user.firstName', 'user.lastName'])
      .from(User, 'user')
      .where(`user.id =:id`, { id: userId });

    const row = await queryBuilder.getOne();
    console.log(row);
    return plainToClass(UserName, row);
  }
}
